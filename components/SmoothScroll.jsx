'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;
    let rafId;
    const configure = () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = undefined;
      if (preference.matches) return;
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1,
        wheelMultiplier: 0.9,
        anchors: true,
        prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
      });
      // Expose the instance so scroll-driven sections can request programmatic scrolls
      // that stay in sync with Lenis instead of fighting it with native smooth scroll.
      window.__lenis = lenis;
      const raf = (time) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };
    configure();
    preference.addEventListener('change', configure);
    return () => {
      preference.removeEventListener('change', configure);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, []);
  return null;
}
