'use client';

import { useEffect, useRef } from 'react';
import styles from './SpaceSection.module.css';

const MODEL_URL = `/${encodeURIComponent('3D files')}/Walking.fbx`;

// One shared scroll progress drives the pose, travel, camera, and starfield.
const SCENE = {
  cycles: 4,
  fill: 0.86,
  fillCompact: 0.72,
  lookBias: 0.58,
  exitStart: 0.8,
  cameraDepth: 14,
};

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function readProgress(track) {
  const rect = track.getBoundingClientRect();
  const distance = rect.height - window.innerHeight;
  if (distance <= 1) return 0;
  return clamp01(-rect.top / distance);
}

function boneBounds(root, target, point) {
  target.makeEmpty();
  root.traverse((node) => {
    if (!node.isBone) return;
    node.getWorldPosition(point);
    target.expandByPoint(point);
  });
  return target;
}

function namedBones(model, names) {
  return names.map((name) => model.getObjectByName(name)).filter(Boolean);
}

// Scale the posed figure so the knees sit on the bottom of the current
// camera frame. Framing constants stay put, so travel speed does not change.
function fitWalkerCrop(model, mixer, duration, frame) {
  const { bodyHeight, lookY, fill, point, bounds } = frame;
  const viewHeight = bodyHeight / fill;
  const cameraBottom = lookY - viewHeight / 2;
  const cameraTop = lookY + viewHeight / 2;
  const knees = namedBones(model, ['mixamorigLeftLeg', 'mixamorigRightLeg']);
  const feet = namedBones(model, [
    'mixamorigLeftFoot',
    'mixamorigRightFoot',
    'mixamorigLeftToeBase',
    'mixamorigRightToeBase',
    'mixamorigLeftToe_End',
    'mixamorigRightToe_End',
  ]);

  const sampleSpan = () => {
    const supportingKnees = [];
    let highestFoot = -Infinity;
    let highestHead = -Infinity;
    const samples = 12;
    for (let index = 0; index < samples; index += 1) {
      mixer.setTime((index / samples) * duration);
      model.updateMatrixWorld(true);
      boneBounds(model, bounds, point);
      highestHead = Math.max(highestHead, bounds.max.y);
      let supportingKnee = Infinity;
      knees.forEach((bone) => {
        bone.getWorldPosition(point);
        supportingKnee = Math.min(supportingKnee, point.y);
      });
      if (Number.isFinite(supportingKnee)) supportingKnees.push(supportingKnee);
      feet.forEach((bone) => {
        bone.getWorldPosition(point);
        highestFoot = Math.max(highestFoot, point.y);
      });
    }
    mixer.setTime(0);
    model.updateMatrixWorld(true);
    supportingKnees.sort((a, b) => a - b);
    // The straighter supporting knee, so the shin stays below the frame
    // instead of only the deepest bend in the cycle.
    const kneeIndex = Math.min(
      supportingKnees.length - 1,
      Math.floor(supportingKnees.length * 0.75),
    );
    return {
      knee: supportingKnees.length
        ? supportingKnees[kneeIndex]
        : bounds.min.y + bodyHeight * 0.32,
      highestFoot,
      highestHead,
    };
  };

  const before = sampleSpan();
  const kneeToHead = Math.max(0.01, before.highestHead - before.knee);
  const headroom = bodyHeight * 0.14;
  const scale = Math.max(1, (viewHeight - headroom) / kneeToHead);
  model.scale.multiplyScalar(scale);
  model.updateMatrixWorld(true);

  const after = sampleSpan();
  let shift = cameraBottom - after.knee;
  const liftedFoot = after.highestFoot + shift;
  const footLimit = cameraBottom - bodyHeight * 0.04;
  if (liftedFoot > footLimit) shift -= liftedFoot - footLimit;
  const liftedHead = after.highestHead + shift;
  if (liftedHead > cameraTop - headroom * 0.35) {
    shift -= liftedHead - (cameraTop - headroom * 0.35);
  }
  model.position.y += shift;
  mixer.setTime(0);
  model.updateMatrixWorld(true);
}

function stripRootMotion(clip) {
  const track = clip.tracks.find((item) => item.name === 'mixamorigHips.position');
  if (!track) return 0;
  const values = track.values;
  const originX = values[0];
  const originZ = values[2];
  let maxZ = originZ;
  for (let index = 0; index < values.length; index += 3) {
    maxZ = Math.max(maxZ, values[index + 2]);
    values[index] = originX;
    values[index + 2] = originZ;
  }
  return Math.max(0.01, maxZ - originZ);
}

export default function SpaceWalker({ trackRef, stageRef, onReady }) {
  const canvasRef = useRef(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!canvas || !track || !stage) return undefined;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 40);
      const mover = new THREE.Group();
      scene.add(mover);

      const black = new THREE.MeshBasicMaterial({
        color: 0x000000,
        toneMapped: false,
      });

      let mixer;
      let duration = 1;
      let travel = 1;
      let lookY = 1;
      let bodyHeight = 1;
      let leftExtent = 0;
      let ready = false;

      const point = new THREE.Vector3();
      const bounds = new THREE.Box3();

      const frameCamera = () => {
        const width = stage.clientWidth || 1;
        const height = stage.clientHeight || 1;
        const compact = width < 760;
        const fill = compact ? SCENE.fillCompact : SCENE.fill;
        const viewHeight = bodyHeight / fill;
        const viewWidth = viewHeight * (width / height);
        camera.left = -viewWidth / 2;
        camera.right = viewWidth / 2;
        camera.top = viewHeight / 2;
        camera.bottom = -viewHeight / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const apply = () => {
        const progress = readProgress(track);
        stage.style.setProperty('--space-p', progress.toFixed(4));
        if (!mixer) return;

        const poseTime = progress * SCENE.cycles * duration;
        mixer.setTime(poseTime);

        const modelZ = progress * travel;
        const exit =
          progress <= SCENE.exitStart
            ? 0
            : smoothstep((progress - SCENE.exitStart) / (1 - SCENE.exitStart));
        const lockedZ = SCENE.exitStart * travel;
        const cameraZ = lockedZ + (modelZ - lockedZ) * (1 - exit);
        const offscreenZ = lockedZ + camera.right - leftExtent + bodyHeight * 0.32;
        const extra = Math.max(0, offscreenZ - travel);

        mover.position.z = modelZ + extra * exit;
        camera.position.set(-SCENE.cameraDepth, lookY, cameraZ);
        camera.lookAt(0, lookY, cameraZ);
        renderer.render(scene, camera);

        if (!ready) {
          ready = true;
          onReadyRef.current?.();
        }
      };

      const onResize = () => {
        frameCamera();
        apply();
      };

      try {
        const loader = new FBXLoader();
        const model = await loader.loadAsync(MODEL_URL);
        if (disposed) {
          renderer.dispose();
          black.dispose();
          return;
        }

        model.traverse((node) => {
          if (!node.isMesh) return;
          node.material = black;
          node.frustumCulled = false;
          node.castShadow = false;
          node.receiveShadow = false;
        });

        const source = model.animations[0];
        if (!source) throw new Error('Walking.fbx has no animation clip');
        const clip = source.clone();
        const stride = stripRootMotion(clip);
        duration = clip.duration || 1;
        travel = stride * SCENE.cycles;

        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.play();
        mixer.setTime(0);
        model.updateMatrixWorld(true);

        boneBounds(model, bounds, point);
        model.position.set(
          -((bounds.min.x + bounds.max.x) / 2),
          -bounds.min.y,
          -((bounds.min.z + bounds.max.z) / 2),
        );
        model.updateMatrixWorld(true);
        boneBounds(model, bounds, point);
        bodyHeight = Math.max(0.01, bounds.max.y - bounds.min.y);
        lookY = bounds.min.y + bodyHeight * SCENE.lookBias;
        // Enlarge within the existing frame so the section crops the legs
        // around the knees. The camera path and timing stay as they are.
        fitWalkerCrop(model, mixer, duration, {
          bodyHeight,
          lookY,
          fill: SCENE.fill,
          point,
          bounds,
        });

        mover.add(model);
        leftExtent = Infinity;
        for (let index = 0; index < 12; index += 1) {
          mixer.setTime((index / 12) * duration);
          model.updateMatrixWorld(true);
          model.traverse((node) => {
            if (!node.isBone) return;
            node.getWorldPosition(point);
            leftExtent = Math.min(leftExtent, point.z);
          });
        }
        if (!Number.isFinite(leftExtent)) leftExtent = 0;
        mixer.setTime(0);
        model.updateMatrixWorld(true);
        frameCamera();
        apply();
      } catch (error) {
        console.error('Space walker failed to load', error);
        renderer.dispose();
        black.dispose();
        return;
      }

      window.addEventListener('scroll', apply, { passive: true });
      window.addEventListener('resize', onResize);
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(stage);

      let lenis = null;
      const attachLenis = () => {
        const next = window.__lenis;
        if (!next || next === lenis) return;
        lenis?.off?.('scroll', apply);
        lenis = next;
        lenis.on?.('scroll', apply);
      };
      attachLenis();
      const lenisTimer = window.setInterval(attachLenis, 250);

      cleanup = () => {
        window.clearInterval(lenisTimer);
        window.removeEventListener('scroll', apply);
        window.removeEventListener('resize', onResize);
        resizeObserver.disconnect();
        lenis?.off?.('scroll', apply);
        black.dispose();
        renderer.dispose();
        scene.traverse((node) => {
          if (node.geometry) node.geometry.dispose();
        });
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [stageRef, trackRef]);

  return (
    <div className={styles.walker} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
