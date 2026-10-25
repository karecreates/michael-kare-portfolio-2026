'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ScrollableWebsitePreview.module.css';

export default function ScrollableWebsitePreview({ asset, className = '' }) {
  const frameRef = useRef(null);
  const scrollerRef = useRef(null);
  const imageRef = useRef(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const previewHeight = asset.previewHeight ?? 360;

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    const image = imageRef.current;
    if (!scroller || !image) return;
    setCanScroll(image.scrollHeight - scroller.clientHeight > 8);
  }, []);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setIsCoarse(coarse.matches);
      setReduceMotion(motion.matches);
    };
    sync();
    coarse.addEventListener('change', sync);
    motion.addEventListener('change', sync);
    return () => {
      coarse.removeEventListener('change', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    measure();
    const image = imageRef.current;
    if (!image) return undefined;
    image.addEventListener('load', measure);
    window.addEventListener('resize', measure);
    return () => {
      image.removeEventListener('load', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure, asset.src]);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setActive(false);
    };
    const onPointer = (event) => {
      if (!frameRef.current?.contains(event.target)) setActive(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [active]);

  useEffect(() => {
    if (!active && scrollerRef.current) {
      scrollerRef.current.scrollTop = 0;
    }
  }, [active]);

  if (!asset.scrollable) return null;

  const eligible = asset.scrollable && canScroll;
  const showCue = eligible && !active && (hovered || isCoarse);
  const cueLabel = isCoarse ? 'Tap to explore' : 'Scroll to explore';

  const activate = () => {
    if (!eligible) return;
    setActive(true);
  };

  return (
    <div
      ref={frameRef}
      className={`${styles.frame} ${className}`.trim()}
      style={{ '--preview-height': `${previewHeight}px` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activate();
        }
      }}
      role={eligible ? 'button' : undefined}
      tabIndex={eligible && !active ? 0 : undefined}
      aria-label={eligible ? `${asset.alt}. ${cueLabel}` : asset.alt}
    >
      <div
        ref={scrollerRef}
        className={`${styles.scroller} ${active ? styles.scrollerActive : ''}`}
        data-lenis-prevent={active ? '' : undefined}
      >
        <img
          ref={imageRef}
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          className={`${styles.image} ${
            eligible && hovered && !active && !reduceMotion ? styles.hintShift : ''
          }`}
          loading={asset.priority ? 'eager' : 'lazy'}
        />
      </div>
      {showCue ? (
        <div className={`${styles.overlay} ${styles.overlayVisible}`} aria-hidden="true">
          <svg className={styles.icon} viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1.5v9M2.5 7.5 6 10.5 9.5 7.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {cueLabel}
        </div>
      ) : null}
      {active ? (
        <button
          type="button"
          className={styles.close}
          onClick={(event) => {
            event.stopPropagation();
            setActive(false);
          }}
        >
          Done
        </button>
      ) : null}
    </div>
  );
}
