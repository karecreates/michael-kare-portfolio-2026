'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.9
    });

    lenis.on('scroll', (instance) => {
      window.dispatchEvent(
        new CustomEvent('lenis-scroll', {
          detail: { scroll: instance.scroll }
        })
      );
    });

    let rafId = 0;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  return null;
}
