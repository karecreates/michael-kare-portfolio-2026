'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import SectionLabel from '@/components/SectionLabel';
import styles from './FocusSection.module.css';

/** Smoothing — lower = more lag */
const LERP = 0.09;
/** Fade speed */
const OPACITY_LERP = 0.08;
const OPACITY_EPSILON = 0.004;

export default function FocusSection({ items }) {
  const sectionRef = useRef(null);
  const followerRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const opacityRef = useRef(0);
  const activeRef = useRef(false);
  const firstMoveRef = useRef(true);

  const [hoverFxEnabled, setHoverFxEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHoverFxEnabled(mq.matches);
    const onChange = () => setHoverFxEnabled(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const tick = useCallback(() => {
    const el = followerRef.current;
    if (!el) {
      rafRef.current = null;
      return;
    }

    const target = targetRef.current;
    const cur = currentRef.current;

    cur.x += (target.x - cur.x) * LERP;
    cur.y += (target.y - cur.y) * LERP;

    const targetOp = activeRef.current ? 1 : 0;
    opacityRef.current += (targetOp - opacityRef.current) * OPACITY_LERP;

    el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
    el.style.opacity = String(opacityRef.current);

    const keepGoing =
      activeRef.current ||
      opacityRef.current > OPACITY_EPSILON ||
      Math.abs(target.x - cur.x) > 0.5 ||
      Math.abs(target.y - cur.y) > 0.5;

    if (keepGoing) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, []);

  const ensureLoop = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    if (!hoverFxEnabled) return;

    const section = sectionRef.current;
    if (!section) return;

    const onPointerMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetRef.current.x = x;
      targetRef.current.y = y;
      if (firstMoveRef.current) {
        currentRef.current.x = x;
        currentRef.current.y = y;
        firstMoveRef.current = false;
      }
      ensureLoop();
    };

    const onPointerEnter = (e) => {
      activeRef.current = true;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetRef.current.x = x;
      targetRef.current.y = y;
      currentRef.current.x = x;
      currentRef.current.y = y;
      firstMoveRef.current = false;
      ensureLoop();
    };

    const onPointerLeave = () => {
      activeRef.current = false;
      firstMoveRef.current = true;
      ensureLoop();
    };

    section.addEventListener('pointerenter', onPointerEnter);
    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);

    return () => {
      section.removeEventListener('pointerenter', onPointerEnter);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [hoverFxEnabled, ensureLoop]);

  return (
    <section id="focus" ref={sectionRef} className={styles.focusSection}>
      <div className={styles.focusContent}>
        <SectionLabel label="Focus" />
        <div className={styles.focusGrid}>
          <ul className={styles.focusList}>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div ref={followerRef} className={styles.follower} aria-hidden="true" />
    </section>
  );
}
