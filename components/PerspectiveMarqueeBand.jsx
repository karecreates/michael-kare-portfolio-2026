'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './PerspectiveMarqueeBand.module.css';

const ITEMS = [
  'Branding',
  'Marketing',
  'Development',
  'Design',
  'Animation',
  'Websites',
  'Logos',
  'Anything Creative',
];

const COPIES = 3;

export default function PerspectiveMarqueeBand() {
  const reduced = useReducedMotion();
  const bandRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    const band = bandRef.current;
    const row = rowRef.current;
    if (!band || !row || reduced) return undefined;

    const words = [...row.querySelectorAll('[data-marquee-word]')];
    let frame = 0;
    let active = false;

    const paint = () => {
      const mid = band.getBoundingClientRect().left + band.clientWidth / 2;
      words.forEach((word) => {
        const box = word.getBoundingClientRect();
        const center = box.left + box.width / 2;
        const distance = Math.min(1, Math.abs(center - mid) / Math.max(1, band.clientWidth * 0.42));
        word.style.filter = `blur(${distance * 6}px)`;
        word.style.opacity = String(1 - distance * 0.42);
      });
    };

    const tick = () => {
      paint();
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          frame = requestAnimationFrame(tick);
        }
        if (!entry.isIntersecting && active) {
          active = false;
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0.12 },
    );
    io.observe(band);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const rendered = Array.from({ length: COPIES }, () => ITEMS).flat();

  return (
    <section
      ref={bandRef}
      className={styles.band}
      aria-label="Branding, Marketing, Development, Design, Animation, Websites, Logos, Anything Creative"
    >
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.tilt}>
          <div
            ref={rowRef}
            className={`${styles.row} ${reduced ? styles.rowStatic : styles.rowMoving}`}
          >
            {rendered.map((item, index) => (
              <span key={`${item}-${index}`} data-marquee-word className={styles.word}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.fadeX} />
      <div className={styles.fadeY} />
    </section>
  );
}
