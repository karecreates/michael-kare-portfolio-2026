'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollableScreenshot.module.css';

const RETURN_EASE = 'cubic-bezier(0.76, 0, 0.18, 1)';

function canScroll(node, deltaY) {
  if (!node) return false;
  const { scrollTop, scrollHeight, clientHeight } = node;
  const max = Math.max(0, scrollHeight - clientHeight);
  if (max < 2) return false;
  if (deltaY > 0) return scrollTop < max - 1;
  if (deltaY < 0) return scrollTop > 1;
  return true;
}

export default function ScrollableScreenshot({
  src,
  alt,
  width,
  height,
  radius,
  ariaLabel,
  priority = false,
  mode = 'autoscroll',
  aspect,
  showScrollHint = false,
  showBottomFade = false,
}) {
  const frameRef = useRef(null);
  const viewportRef = useRef(null);
  const imageRef = useRef(null);
  const explore = mode === 'explore';
  const [hasOverflow, setHasOverflow] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [fadeVisible, setFadeVisible] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const viewport = viewportRef.current;
    const image = imageRef.current;
    if (!frame || !viewport || !image) return undefined;

    if (explore) {
      let interacted = false;
      const measure = () => {
        const overflow = viewport.scrollHeight - viewport.clientHeight > 8;
        setHasOverflow(overflow);
        setFadeVisible(
          overflow &&
            viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 8
        );
        setHintVisible(overflow && !interacted);
      };

      const hideHint = () => {
        interacted = true;
        setHintVisible(false);
      };
      const onScroll = () => {
        hideHint();
        setFadeVisible(
          viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 8
        );
      };
      const onWheel = (event) => {
        if (!canScroll(viewport, event.deltaY)) return;
        event.preventDefault();
        event.stopPropagation();
        viewport.scrollTop += event.deltaY;
        hideHint();
      };
      const onKeyDown = (event) => {
        const keys = {
          ArrowDown: 80,
          ArrowUp: -80,
          PageDown: viewport.clientHeight * 0.86,
          PageUp: -viewport.clientHeight * 0.86,
          ' ': viewport.clientHeight * 0.86,
          Home: -viewport.scrollTop,
          End: viewport.scrollHeight,
        };
        const delta = keys[event.key];
        if (delta === undefined) return;
        if (!canScroll(viewport, delta)) return;
        event.preventDefault();
        viewport.scrollTop += delta;
        hideHint();
      };

      measure();
      viewport.addEventListener('wheel', onWheel, { passive: false });
      viewport.addEventListener('scroll', onScroll, { passive: true });
      viewport.addEventListener('keydown', onKeyDown);
      viewport.addEventListener('pointerdown', hideHint);
      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(viewport);
      resizeObserver.observe(image);
      image.addEventListener('load', measure);

      return () => {
        viewport.removeEventListener('wheel', onWheel);
        viewport.removeEventListener('scroll', onScroll);
        viewport.removeEventListener('keydown', onKeyDown);
        viewport.removeEventListener('pointerdown', hideHint);
        resizeObserver.disconnect();
        image.removeEventListener('load', measure);
      };
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stopped = false;
    let visible = false;
    let generation = 0;
    let animation = null;
    let activeTravel = -1;

    const travelDistance = () => Math.max(0, image.offsetHeight - viewport.clientHeight);

    const stopMotion = () => {
      generation += 1;
      animation?.cancel();
      animation = null;
      image.style.transform = '';
    };

    const loop = async (token, travel) => {
      if (token !== generation || stopped || !visible || motion.matches) return;
      const down = Math.min(34000, Math.max(12000, travel / 0.11));
      animation = image.animate(
        [
          { transform: 'translate3d(0, 0, 0)' },
          { transform: `translate3d(0, ${-travel}px, 0)` },
        ],
        { duration: down, easing: 'linear', fill: 'forwards' }
      );
      try {
        await animation.finished;
      } catch {
        return;
      }
      if (token !== generation || stopped || !visible || motion.matches) return;
      animation = image.animate(
        [
          { transform: `translate3d(0, ${-travel}px, 0)` },
          { transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: 680, easing: RETURN_EASE, fill: 'forwards' }
      );
      try {
        await animation.finished;
      } catch {
        return;
      }
      if (token === generation) loop(token, travel);
    };

    const start = () => {
      if (stopped || !visible || motion.matches) return;
      const travel = travelDistance();
      if (travel < 8) return;
      if (animation && travel === activeTravel) return;
      activeTravel = travel;
      stopMotion();
      const token = generation;
      loop(token, travel);
    };

    const onMotion = () => {
      if (motion.matches) stopMotion();
      else start();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) start();
        else stopMotion();
      },
      { threshold: 0.2 }
    );
    observer.observe(frame);

    const onResize = () => {
      if (visible) start();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(viewport);
    resizeObserver.observe(image);
    image.addEventListener('load', onResize);
    motion.addEventListener('change', onMotion);

    return () => {
      stopped = true;
      stopMotion();
      observer.disconnect();
      resizeObserver.disconnect();
      image.removeEventListener('load', onResize);
      motion.removeEventListener('change', onMotion);
    };
  }, [explore, src]);

  return (
    <div
      ref={frameRef}
      className={`${styles.frame} ${explore ? styles.explore : ''}`}
      style={{
        ...(radius ? { borderRadius: radius } : null),
        ...(aspect ? { '--shot-aspect': aspect } : null),
      }}
    >
      <div
        ref={viewportRef}
        className={styles.scroller}
        tabIndex={explore ? 0 : undefined}
        role={explore ? 'region' : undefined}
        aria-label={explore ? ariaLabel || alt : undefined}
        aria-hidden={explore || ariaLabel ? undefined : true}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={styles.image}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
        />
      </div>
      {explore && showBottomFade ? (
        <div
          className={`${styles.fade} ${fadeVisible ? '' : styles.fadeHidden}`}
          aria-hidden="true"
        />
      ) : null}
      {explore && showScrollHint ? (
        <p
          className={`${styles.hint} ${
            hasOverflow && hintVisible ? '' : styles.hintHidden
          }`}
        >
          Scroll to explore
        </p>
      ) : null}
    </div>
  );
}
