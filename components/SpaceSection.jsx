'use client';

import { useEffect, useRef, useState } from 'react';
import SpaceWalker from './SpaceWalker';
import styles from './SpaceSection.module.css';

const LINES = [
  'NOTHING IS IMPOSSIBLE',
  'WHEN YOU BREAK IT DOWN',
  'INTO POSSIBILITIES',
];

// Phones re-break the quote into four shorter lines so the type can run larger.
const COMPACT_LINES = [
  'NOTHING IS',
  'IMPOSSIBLE WHEN',
  'YOU BREAK IT DOWN',
  'INTO POSSIBILITIES',
];

const ASSET = '/placeholders/Michael_Portfolio_Images/space_section';

export default function SpaceSection({ reduced = false }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [compact, setCompact] = useState(false);
  const [showWalker, setShowWalker] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 720px)');
    const apply = () => setCompact(query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const node = stageRef.current;
    const track = trackRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry?.intersectionRatio ?? 0;
        setPlay((current) => {
          if (ratio >= 0.38) return true;
          if (ratio <= 0.08) return false;
          return current;
        });
      },
      { threshold: [0, 0.08, 0.38, 0.7] },
    );
    observer.observe(node);

    let near = false;
    let allowed = !document.documentElement.hasAttribute('data-loading');
    const armWalker = () => {
      if (near && allowed) setShowWalker(true);
    };
    const preload = new IntersectionObserver(
      ([entry]) => {
        near = Boolean(entry?.isIntersecting);
        armWalker();
      },
      { rootMargin: '40% 0px' },
    );
    if (track) preload.observe(track);
    const loading = new MutationObserver(() => {
      allowed = !document.documentElement.hasAttribute('data-loading');
      armWalker();
    });
    loading.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-loading'],
    });
    armWalker();

    return () => {
      observer.disconnect();
      preload.disconnect();
      loading.disconnect();
    };
  }, [reduced]);

  return (
    <section
      ref={trackRef}
      className={`${styles.track} ${play ? styles.play : ''} ${
        reduced ? styles.reduced : ''
      }`}
      aria-labelledby="space-quote"
      data-header-contrast="invert"
    >
      <div ref={stageRef} className={styles.stage}>
        <img
          className={styles.background}
          src={`${ASSET}/space_background.png`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className={styles.glow}
          src="/Cool_Stuff/space_glow.png"
          alt=""
          loading="lazy"
          decoding="async"
        />
        {reduced || !showWalker ? null : (
          <SpaceWalker trackRef={trackRef} stageRef={stageRef} />
        )}
        <h2 id="space-quote" className={styles.quote}>
          {(compact ? COMPACT_LINES : LINES).map((line, lineIndex) => (
            <span className={styles.line} key={line}>
              {line.split('').map((char, index) => (
                <span
                  className={styles.char}
                  key={`${lineIndex}-${index}`}
                  style={{
                    '--i': index,
                    '--line': lineIndex,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
