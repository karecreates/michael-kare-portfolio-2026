'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { playInline, releaseInline } from '@/lib/inlineVideo';
import styles from './infinite-gallery.module.css';

const UNIT = 4.6;
const PERSPECTIVE = 820;
const Z_STRIDE = 150;
const PASS_Z = 150;
const HERO_NEAR = 55;
const EXIT = [
  { x: -1.18, y: -0.16 },
  { x: 1.14, y: 0.1 },
  { x: -0.76, y: 0.26 },
  { x: 0.82, y: -0.22 },
  { x: -1.32, y: 0.04 },
  { x: 0.48, y: 0.28 },
  { x: 1.36, y: -0.08 },
  { x: -0.4, y: -0.24 },
];

function isVideoUrl(url) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

function hexColor(value, fallback) {
  return /^#([0-9a-f]{6})$/i.test(value || '') ? value : fallback;
}

function keepOffCenter(x, y, min = 28) {
  const radius = Math.hypot(x, y);
  if (radius >= min) return { x, y };
  const angle = Math.atan2(y || 0.12, x || 0.18);
  return { x: Math.cos(angle) * min, y: Math.sin(angle) * min };
}

const DEPTH_SLOTS = 8;
const COMPANIONS = [
  { x: 0.58, y: 0.44 },
  { x: -0.64, y: 0.36 },
  { x: 0.24, y: -0.48 },
  { x: -0.3, y: 0.52 },
  { x: 0.74, y: -0.16 },
  { x: -0.8, y: -0.14 },
  { x: 0.4, y: 0.18 },
  { x: -0.46, y: -0.36 },
];

function buildTiles(images, cellSize, layers) {
  const cycles = Math.min(3, Math.max(1, Math.round(layers)));
  const tiles = [];
  for (let cycle = 0; cycle < cycles; cycle += 1) {
    images.forEach((image, index) => {
      if (cycle > 0 && isVideoUrl(image.url)) return;
      const band = Math.floor(index / DEPTH_SLOTS);
      const slotIndex = index % DEPTH_SLOTS;
      const slot = band === 0 ? EXIT[slotIndex % EXIT.length] : COMPANIONS[slotIndex % COMPANIONS.length];
      const point = keepOffCenter(
        slot.x * cellSize * (0.78 + cycle * 0.05) * (band === 0 ? 1 : 0.9),
        slot.y * cellSize * (band === 0 ? 0.26 + cycle * 0.02 : 0.44),
        32,
      );
      const zIndex = slotIndex + cycle * DEPTH_SLOTS;
      tiles.push({
        ...image,
        key: `${image.url}-${cycle}-${index}`,
        x: point.x,
        y: point.y,
        z: -36 - zIndex * Z_STRIDE - band * 28,
      });
    });
  }
  return tiles;
}

function planeSize(image, imageSize) {
  const aspect = Math.max(0.4, (image.width || 16) / (image.height || 9));
  const mid = imageSize * 20;
  if (Math.abs(aspect - 1) < 0.08) {
    return { width: Math.round(mid), height: Math.round(mid) };
  }
  if (aspect > 1) {
    const width = Math.round(mid * 1.18);
    return { width, height: Math.round(width / aspect) };
  }
  const height = Math.round(mid * 1.08);
  return { width: Math.round(height * aspect), height };
}

function project(x, y, z) {
  const scale = PERSPECTIVE / Math.max(140, PERSPECTIVE - z * UNIT);
  return {
    x: x * UNIT * scale,
    y: y * UNIT * scale,
    scale,
  };
}

function planeTransform(x, y, z) {
  const projected = project(x, y, z);
  return `translate(-50%, -50%) translate(${projected.x}px, ${projected.y}px) scale(${projected.scale})`;
}

function depthLook(z) {
  if (z > -HERO_NEAR) {
    return { opacity: 1, blur: 0, brightness: 1 };
  }
  const distance = -z;
  const t = Math.min(1, (distance - HERO_NEAR) / 340);
  return {
    opacity: 0.78 + (1 - t) * 0.16,
    blur: 1.1 + t * 3.4,
    brightness: 0.5 + (1 - t) * 0.42,
  };
}

function lookFilter(look) {
  const parts = [];
  if (look.blur > 0.15) parts.push(`blur(${look.blur}px)`);
  if (look.brightness < 0.98) parts.push(`brightness(${look.brightness})`);
  return parts.length ? parts.join(' ') : 'none';
}

function wrapZ(z, fieldDepth) {
  let next = z;
  while (next > PASS_Z) next -= fieldDepth;
  while (next < PASS_Z - fieldDepth) next += fieldDepth;
  return next;
}

function galleryFillsView(host) {
  const box = host.getBoundingClientRect();
  const viewH = window.innerHeight || 1;
  return box.top <= 12 && box.bottom >= viewH - 12 && box.height >= viewH * 0.8;
}

function parkCenter(motion) {
  motion.pointer.x = 0;
  motion.pointer.y = 0;
  motion.drift.x = 0;
  motion.drift.y = 0;
  motion.velocity.x = 0;
  motion.velocity.y = 0;
  motion.armed = false;
  motion.anchorX = null;
  motion.anchorY = null;
}

function readProgress(props) {
  const track = props.trackRef?.current;
  if (track) {
    const rect = track.getBoundingClientRect();
    const span = rect.height - window.innerHeight;
    if (span > 0) return Math.min(1, Math.max(0, -rect.top / span));
  }
  return Math.min(1, Math.max(0, props.progressRef?.current ?? 0));
}

function setTilePlayback(video, shouldPlay) {
  if (video.__wantPlay === shouldPlay) return;
  video.__wantPlay = shouldPlay;
  if (shouldPlay) {
    if (!video.getAttribute('src') && video.dataset.src) {
      video.src = video.dataset.src;
    }
    playInline(video).catch(() => {});
  } else {
    releaseInline(video);
    if (!video.paused) video.pause();
  }
}

function stepGallery({ host, world, motion, props }) {
  const current = props.current;
  if (!current || !host || !world) return;
  const {
    tiles,
    fieldDepth,
    driftAmount,
    friction,
    autoZoom,
    autoZoomSpeed,
  } = current;
  const hostBox = host.getBoundingClientRect();
  const onScreen = hostBox.bottom >= -80 && hostBox.top <= window.innerHeight + 80;
  motion.frames += 1;
  if (!onScreen) {
    if (motion.wasOnScreen) {
      host.querySelectorAll('video').forEach((video) => setTilePlayback(video, false));
      motion.wasOnScreen = false;
    }
    return;
  }
  motion.wasOnScreen = true;
  const compact = host.dataset.compact === '1';
  if (autoZoom && !compact) motion.zoom += autoZoomSpeed;

  const { pointer, drift, velocity } = motion;
  const progress = readProgress(current);
  const travel = motion.zoom + progress * fieldDepth * 0.48 + velocity.z;
  const held = galleryFillsView(host);
  if (held !== motion.held) {
    parkCenter(motion);
    motion.held = held;
  }
  const aimX = motion.armed ? pointer.x : 0;
  const aimY = motion.armed ? pointer.y : 0;
  velocity.x *= friction;
  velocity.y *= friction;
  velocity.z *= friction;
  drift.x += (aimX * driftAmount * 7 + velocity.x - drift.x) * 0.08;
  drift.y += (aimY * driftAmount * 5 + velocity.y - drift.y) * 0.08;
  world.style.transform = `translate3d(${drift.x}px, ${drift.y}px, 0)`;

  const nodes = host.querySelectorAll('figure');
  tiles.forEach((tile, index) => {
    const node = nodes[index];
    if (!node) return;
    const z = wrapZ(tile.z + travel, fieldDepth);
    const hidden = z > PASS_Z - 8;
    node.style.visibility = hidden ? 'hidden' : 'visible';
    const video = node.firstElementChild;
    const isVideo = video && video.tagName === 'VIDEO';
    if (hidden) {
      if (isVideo) setTilePlayback(video, false);
      return;
    }
    const look = depthLook(z);
    // Clips deep in the fog are invisible anyway; only decode the ones in view.
    if (isVideo) setTilePlayback(video, compact || look.opacity > 0.06);
    node.style.opacity = String(compact ? 1 : look.opacity);
    if (compact) {
      if (node.style.filter) node.style.filter = '';
    } else {
      node.style.filter = lookFilter(look);
    }
    node.style.zIndex = String(Math.round(900 + z));
    node.style.transform = planeTransform(tile.x, tile.y, z);
  });
}

function ensureGalleryTimer() {
  if (typeof window === 'undefined') return;
  if (window.__mkGalleryTimer) {
    window.clearInterval(window.__mkGalleryTimer);
    window.__mkGalleryTimer = 0;
  }
  if (window.__mkGalleryRaf) return;
  const tick = () => {
    document.querySelectorAll('[data-gallery="live"]').forEach((node) => {
      const ctx = node.__gallery;
      if (!ctx) return;
      try {
        stepGallery(ctx);
      } catch (error) {
        node.dataset.err = String(error?.message || error);
      }
    });
    window.__mkGalleryRaf = window.requestAnimationFrame(tick);
  };
  window.__mkGalleryRaf = window.requestAnimationFrame(tick);
}

export default function InfiniteGallery({
  width = '100%',
  height = '100%',
  className = '',
  images = [],
  density = 5,
  imageSize = 14,
  cellSize = 110,
  viewRange = 2,
  fogNear = 120,
  fogFar = 320,
  dragSpeed = 1,
  driftAmount = 8,
  friction = 0.9,
  autoZoom = true,
  autoZoomSpeed = 0.35,
  imageRadius = 0.06,
  allowImageFocusOnClick = false,
  backgroundColor = '#000000',
  fogColor = '#000000',
  progressRef,
  trackRef,
}) {
  const hostRef = useRef(null);
  const worldRef = useRef(null);
  const motionRef = useRef({
    zoom: 0,
    frames: 0,
    pointer: { x: 0, y: 0 },
    drift: { x: 0, y: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    drag: { active: false, x: 0, y: 0 },
    held: false,
    armed: false,
    anchorX: null,
    anchorY: null,
  });
  const propsRef = useRef(null);
  const [compact, setCompact] = useState(false);
  const layers = compact ? 1 : Math.min(3, Math.max(2, Math.round(viewRange)));
  const tiles = useMemo(() => {
    const source = compact ? images.filter((image) => !isVideoUrl(image.url)) : images;
    return buildTiles(source, cellSize, layers);
  }, [images, cellSize, layers, compact]);
  const fieldDepth = tiles.length
    ? PASS_Z - Math.min(...tiles.map((tile) => tile.z)) + Z_STRIDE
    : Z_STRIDE * 8;
  propsRef.current = {
    tiles,
    fieldDepth,
    fogNear,
    fogFar,
    dragSpeed,
    driftAmount,
    friction,
    autoZoom,
    autoZoomSpeed,
    progressRef,
    trackRef,
  };

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const apply = () => setCompact(query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useLayoutEffect(() => {
    const host = hostRef.current;
    const world = worldRef.current;
    if (!host || !world) return undefined;
    const motion = motionRef.current;
    host.dataset.gallery = 'live';
    host.dataset.compact = compact ? '1' : '';
    host.__gallery = { host, world, motion, props: propsRef };
    ensureGalleryTimer();

    const onPointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      const { drag, pointer, velocity } = motion;
      const speed = propsRef.current.dragSpeed;
      if (!galleryFillsView(host)) return;
      if (!motion.armed) {
        if (motion.anchorX == null) {
          motion.anchorX = event.clientX;
          motion.anchorY = event.clientY;
          return;
        }
        const moved = Math.hypot(
          event.clientX - motion.anchorX,
          event.clientY - motion.anchorY,
        );
        if (moved < 16) return;
        motion.armed = true;
      }
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      if (drag.active) {
        velocity.x += (event.clientX - drag.x) * speed * 0.08;
        velocity.y += (event.clientY - drag.y) * speed * 0.08;
        drag.x = event.clientX;
        drag.y = event.clientY;
      }
    };
    const onPointerDown = (event) => {
      if (!galleryFillsView(host)) return;
      motion.armed = true;
      motion.drag.active = true;
      motion.drag.x = event.clientX;
      motion.drag.y = event.clientY;
    };
    const onPointerUp = () => {
      motion.drag.active = false;
    };

    // Playback is driven per tile from stepGallery, based on what is in view.
    const videos = [...host.querySelectorAll('video')];

    host.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      if (!host.isConnected) {
        host.dataset.gallery = '';
        host.__gallery = null;
      }
      host.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      videos.forEach((video) => {
        video.__wantPlay = undefined;
        releaseInline(video);
        video.pause();
      });
    };
  }, [compact]);

  const bg = hexColor(backgroundColor, '#000000');
  const radius = `${Math.max(0, Math.min(1, imageRadius)) * 100}%`;
  void density;
  void fogColor;
  void allowImageFocusOnClick;

  return (
    <div
      ref={hostRef}
      className={`${styles.viewport} ${className}`.trim()}
      style={{ width, height, background: bg }}
    >
      <div ref={worldRef} className={styles.world}>
        {tiles.map((tile) => {
          const size = planeSize(tile, imageSize);
          const look = depthLook(tile.z);
          return (
            <figure
              key={tile.key}
              className={styles.plane}
              style={{
                width: size.width,
                height: size.height,
                borderRadius: radius,
                background: bg,
                opacity: look.opacity,
                filter: lookFilter(look),
                transform: planeTransform(tile.x, tile.y, tile.z),
              }}
            >
              {isVideoUrl(tile.url) ? (
                <video
                  data-src={tile.url}
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  preload="none"
                  disablePictureInPicture
                  aria-label="Creative study"
                />
              ) : (
                <img src={tile.url} alt="" loading="lazy" decoding="async" />
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
