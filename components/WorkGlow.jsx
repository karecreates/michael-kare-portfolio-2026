'use client';

import { useEffect, useState } from 'react';
import SideRays from './SideRays';
import styles from './WorkGlow.module.css';

const RAYS = {
  speed: 2.5,
  rayColor1: '#EAB308',
  rayColor2: '#96c8ff',
  // Each half only gets half the viewport, so push a little harder than the
  // hero to land at a similar brightness.
  intensity: 2.6,
  spread: 2,
  tilt: 0,
  saturation: 1.5,
  blend: 0.75,
  falloff: 1.6,
  opacity: 1.0,
};

/**
 * The hero's corner glow, mirrored into a pair so the light pours straight
 * out of the top (or bottom) centre of its positioned parent. Decorative only.
 */
export default function WorkGlow({ edge = 'top' }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  if (reduced) return null;

  const fromBottom = edge === 'bottom';
  // The footer version sits over more open black, so push a touch brighter.
  const rays = fromBottom ? { ...RAYS, intensity: 5, falloff: 1.3 } : RAYS;

  return (
    <div className={`${styles.glow} ${fromBottom ? styles.bottom : styles.top}`} aria-hidden="true">
      <div className={`${styles.half} ${styles.left}`}>
        <SideRays {...rays} origin={fromBottom ? 'bottom-right' : 'top-right'} />
      </div>
      <div className={`${styles.half} ${styles.right}`}>
        <SideRays {...rays} origin={fromBottom ? 'bottom-left' : 'top-left'} />
      </div>
    </div>
  );
}
