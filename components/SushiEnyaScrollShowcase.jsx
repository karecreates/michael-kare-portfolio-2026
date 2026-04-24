'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './SushiEnyaScrollShowcase.module.css';

const DEFAULT_IMAGE = {
  src: '/placeholders/Michael_Portfolio_Images/Sushi_Enya_Scoll.png',
  alt: 'Sushi Enya homepage — full-length screenshot',
  width: 1920,
  height: 8910
};

const DEFAULT_DURATION_MS = 22500;

/** Ease-in-out cubic — smooth S-curve (piecewise cubic Bézier). */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

const HOVER_SLOWDOWN = 0.5;
const SPEED_BLEND_MS = 420;

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

export default function SushiEnyaScrollShowcase({
  durationMs = DEFAULT_DURATION_MS,
  className = '',
  imageSrc = DEFAULT_IMAGE.src,
  imageAlt = DEFAULT_IMAGE.alt,
  intrinsicWidth = DEFAULT_IMAGE.width,
  intrinsicHeight = DEFAULT_IMAGE.height,
  sectionAriaLabel = 'Sushi Enya website preview',
  imagePriority = true,
  flushHorizontal = false
}) {
  const viewportRef = useRef(null);
  const railRef = useRef(null);
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const imageRef = useRef(null);

  const virtualElapsedRef = useRef(0);
  const lastFrameTimeRef = useRef(null);
  const playbackSpeedRef = useRef(1);
  const speedBlendRef = useRef(null);
  const rafRef = useRef(0);

  const scrollDistanceRef = useRef(0);
  const trackLenRef = useRef(0);
  const thumbHRef = useRef(28);

  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      reducedMotionRef.current = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const imgEl = imageRef.current;
    const track = trackRef.current;
    if (!viewport || !imgEl) return;

    const frameH = viewport.clientHeight;
    const imageH = imgEl.offsetHeight;
    const scrollDistance = Math.max(0, imageH - frameH);
    scrollDistanceRef.current = scrollDistance;

    if (track) {
      const tl = track.clientHeight;
      trackLenRef.current = tl;
      let th = imageH > 0 ? (frameH / imageH) * tl : tl;
      th = clamp(th, 22, tl * 0.44);
      thumbHRef.current = th;
    }
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(viewport);
    const img = imageRef.current;
    if (img) ro.observe(img);

    measure();
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const tick = (now) => {
      const rail = railRef.current;
      const thumb = thumbRef.current;
      if (!rail) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const last = lastFrameTimeRef.current;
      const delta = last == null ? 0 : now - last;
      lastFrameTimeRef.current = now;

      if (reducedMotionRef.current) {
        rail.style.transform = 'translate3d(0, 0, 0)';
        if (thumb) {
          thumb.style.height = `${thumbHRef.current}px`;
          thumb.style.transform = 'translate3d(0, 0, 0)';
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const blend = speedBlendRef.current;
      if (blend) {
        const age = now - blend.start;
        const u = Math.min(1, age / blend.duration);
        const eased = easeInOutCubic(u);
        playbackSpeedRef.current = blend.from + (blend.to - blend.from) * eased;
        if (u >= 1) {
          playbackSpeedRef.current = blend.to;
          speedBlendRef.current = null;
        }
      }

      const sd = scrollDistanceRef.current;
      if (sd <= 0.5) {
        rail.style.transform = 'translate3d(0, 0, 0)';
        if (thumb) {
          thumb.style.height = `${thumbHRef.current}px`;
          thumb.style.transform = 'translate3d(0, 0, 0)';
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      virtualElapsedRef.current += delta * playbackSpeedRef.current;

      const duration = durationMs;
      const v = virtualElapsedRef.current;
      const mod = ((v % duration) + duration) % duration;
      const progress = mod / duration;

      const translate = -progress * sd;
      rail.style.transform = `translate3d(0, ${translate}px, 0)`;

      const trackLen = trackLenRef.current;
      const thumbH = thumbHRef.current;
      const thumbTravel = Math.max(0, trackLen - thumbH);
      const thumbY = progress * thumbTravel;
      if (thumb) {
        thumb.style.height = `${thumbH}px`;
        thumb.style.transform = `translate3d(0, ${thumbY}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [durationMs]);

  const rootClass = [styles.root, flushHorizontal && styles.rootFlushH, className]
    .filter(Boolean)
    .join(' ');

  const beginSpeedBlend = (target) => {
    speedBlendRef.current = {
      from: playbackSpeedRef.current,
      to: target,
      start: performance.now(),
      duration: SPEED_BLEND_MS
    };
  };

  const handlePointerEnter = () => {
    if (reducedMotionRef.current) return;
    beginSpeedBlend(HOVER_SLOWDOWN);
  };

  const handlePointerLeave = () => {
    if (reducedMotionRef.current) return;
    beginSpeedBlend(1);
  };

  return (
    <section className={rootClass} aria-label={sectionAriaLabel}>
      <div
        className={styles.viewport}
        ref={viewportRef}
        data-lenis-prevent-wheel=""
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <div className={styles.imageMask}>
          <div className={styles.imageRail} ref={railRef}>
            <div ref={imageRef} className={styles.imageSizer}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={intrinsicWidth}
                height={intrinsicHeight}
                sizes="100vw"
                priority={imagePriority}
                draggable={false}
                className={styles.image}
                onLoadingComplete={measure}
              />
            </div>
          </div>
        </div>

        <div className={styles.scrollbar} aria-hidden>
          <div className={styles.trackLine} />
          <div ref={trackRef} className={styles.track}>
            <div ref={thumbRef} className={styles.thumb} />
          </div>
        </div>
      </div>
    </section>
  );
}
