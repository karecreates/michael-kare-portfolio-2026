'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SiteLoader.module.css';

const MODEL_URL = `/${encodeURIComponent('3D files')}/Walking.fbx`;
const LINES = [
  { until: 60, text: 'LOADING WEBSITE' },
  { until: 86, text: 'SORRY, ALMOST DONE' },
  { until: 100, text: 'PREPARE TO BE AMAZED' },
];

function lineFor(progress) {
  return LINES.find((line) => progress < line.until)?.text ?? LINES[2].text;
}

function SiteLoader() {
  const canvasRef = useRef(null);
  const countRef = useRef(null);
  const fillRef = useRef(null);
  const readyRef = useRef(false);
  const progressRef = useRef(0);
  const releaseRef = useRef(() => {});
  const sceneCleanupRef = useRef(() => {});
  const [phrase, setPhrase] = useState(LINES[0].text);
  const [modelReady, setModelReady] = useState(false);
  const [phase, setPhase] = useState('run');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setPhase('done');
      return undefined;
    }

    const root = document.documentElement;
    root.dataset.loading = '1';
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const stopLenis = () => window.__lenis?.stop?.();
    stopLenis();
    const lenisTimer = window.setInterval(stopLenis, 200);
    const release = () => {
      window.clearInterval(lenisTimer);
      delete root.dataset.loading;
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start?.();
    };
    releaseRef.current = release;

    const canvas = canvasRef.current;
    let disposed = false;
    let cleanupScene = () => {};

    (async () => {
      try {
        const THREE = await import('three');
        const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');
        if (disposed || !canvas) return;

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
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 50);
        const model = await new FBXLoader().loadAsync(MODEL_URL);
        if (disposed) {
          renderer.dispose();
          renderer.forceContextLoss();
          return;
        }

        const black = new THREE.MeshBasicMaterial({
          color: 0x000000,
          toneMapped: false,
        });
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
        const hips = clip.tracks.find((track) => track.name === 'mixamorigHips.position');
        if (hips) {
          const values = hips.values;
          const originX = values[0];
          const originZ = values[2];
          for (let index = 0; index < values.length; index += 3) {
            values[index] = originX;
            values[index + 2] = originZ;
          }
        }

        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.play();

        const duration = clip.duration || 1;
        mixer.setTime(duration * 0.2);
        model.updateMatrixWorld(true);
        const hipsBone = model.getObjectByName('mixamorigHips');
        const headBone = model.getObjectByName('mixamorigHead');
        const hipsPos = new THREE.Vector3();
        const headPos = new THREE.Vector3();
        hipsBone?.getWorldPosition(hipsPos);
        headBone?.getWorldPosition(headPos);
        const figureHeight = Math.max(0.01, Math.abs(headPos.y - hipsPos.y) * 2.2);
        model.position.set(-hipsPos.x, -hipsPos.y, -hipsPos.z);
        model.updateMatrixWorld(true);
        const sample = new THREE.Vector3();
        let halfSpan = 0.01;
        for (let step = 0; step < 12; step += 1) {
          mixer.setTime((duration * step) / 12);
          model.updateMatrixWorld(true);
          model.traverse((node) => {
            if (!node.isBone) return;
            node.getWorldPosition(sample);
            halfSpan = Math.max(halfSpan, Math.abs(sample.z));
          });
        }
        mixer.setTime(duration * 0.2);
        model.updateMatrixWorld(true);
        scene.add(model);
        const lookY = figureHeight * 0.12;
        const spanZ = halfSpan * 2;

        const frameCamera = () => {
          const width = canvas.clientWidth || window.innerWidth || 1;
          const height = canvas.clientHeight || window.innerHeight || 1;
          const aspect = width / height;
          let viewHeight = figureHeight / 0.92;
          let viewWidth = viewHeight * aspect;
          if (viewWidth < spanZ * 1.2) {
            viewWidth = spanZ * 1.2;
            viewHeight = viewWidth / aspect;
          }
          camera.left = -viewWidth / 2;
          camera.right = viewWidth / 2;
          camera.top = viewHeight / 2;
          camera.bottom = -viewHeight / 2;
          camera.position.set(-16, lookY, 0);
          camera.lookAt(0, lookY, 0);
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        };

        frameCamera();
        let last = performance.now();
        let raf = 0;
        const draw = (now) => {
          if (disposed) return;
          const delta = Math.min(0.05, (now - last) / 1000);
          last = now;
          mixer.update(delta);
          renderer.render(scene, camera);
          raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        readyRef.current = true;
        setModelReady(true);

        const onResize = () => frameCamera();
        window.addEventListener('resize', onResize);
        let stopped = false;
        const stopScene = () => {
          if (stopped) return;
          stopped = true;
          cancelAnimationFrame(raf);
          window.removeEventListener('resize', onResize);
          black.dispose();
          scene.traverse((node) => {
            if (node.geometry) node.geometry.dispose();
          });
          renderer.dispose();
          renderer.forceContextLoss();
        };
        sceneCleanupRef.current = stopScene;
        cleanupScene = stopScene;
      } catch (error) {
        console.error('Site loader walker failed', error);
        readyRef.current = true;
        setModelReady(true);
      }
    })();

    const started = performance.now();
    let tick = 0;
    const advance = (now) => {
      const elapsed = (now - started) / 1000;
      const timeCap = elapsed < 1.15 ? 42 : elapsed < 2.45 ? 78 : elapsed < 3.7 ? 93 : 100;
      const cap = Math.min(timeCap, readyRef.current ? 100 : 93);
      const current = progressRef.current;
      let next = current + (cap - current) * 0.07;
      if (cap >= 100 && next > 99.2) next = 100;
      progressRef.current = next;
      if (countRef.current) countRef.current.textContent = `${Math.round(next)}%`;
      if (fillRef.current) fillRef.current.style.width = `${next}%`;
      const nextLine = lineFor(next);
      setPhrase((previous) => (previous === nextLine ? previous : nextLine));
      if (next >= 100) {
        setPhase('wipe');
        return;
      }
      tick = requestAnimationFrame(advance);
    };
    tick = requestAnimationFrame(advance);

    return () => {
      disposed = true;
      cancelAnimationFrame(tick);
      cleanupScene();
      release();
    };
  }, []);

  useEffect(() => {
    if (phase !== 'done') return undefined;
    sceneCleanupRef.current();
    sceneCleanupRef.current = () => {};
    releaseRef.current();
    releaseRef.current = () => {};
    return undefined;
  }, [phase]);

  useEffect(() => {
    if (phase !== 'wipe') return undefined;
    const fadeTimer = window.setTimeout(() => setPhase('fade'), 1180);
    return () => window.clearTimeout(fadeTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'fade') return undefined;
    const doneTimer = window.setTimeout(() => setPhase('done'), 820);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={`${styles.root} ${phase === 'wipe' || phase === 'fade' ? styles.wiping : ''} ${
        phase === 'fade' ? styles.fading : ''
      }`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progressRef.current)}
      aria-label="Loading website"
    >
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} ${modelReady ? styles.canvasReady : ''}`}
      />
      <div className={styles.status}>
        <p key={phrase} className={styles.line} aria-hidden="true">
          {phrase.split('').map((char, index) => (
            <span key={`${phrase}-${index}`} className={styles.char} style={{ '--i': index }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>
      <div className={styles.meter}>
        <span ref={countRef} className={styles.percent}>
          0%
        </span>
        <span className={styles.bar} aria-hidden="true">
          <span ref={fillRef} className={styles.fill} />
        </span>
      </div>
      <div className={styles.veil} aria-hidden="true" />
    </div>
  );
}

export default SiteLoader;
