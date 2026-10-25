'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_FILTERS, FEATURED_WORKS } from '@/data/featuredWorks';
import styles from './FeaturedWorks.module.css';

export default function FeaturedWorks() {
  const [filter, setFilter] = useState('All');
  const gridRef = useRef(null);
  const items = useMemo(
    () =>
      filter === 'All'
        ? FEATURED_WORKS
        : FEATURED_WORKS.filter((item) => item.pills.includes(filter)),
    [filter],
  );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const media = Array.from(grid.querySelectorAll('[data-work-media]'));
    if (!media.length) return undefined;

    const frames = media.map((node) => node.firstElementChild);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      frames.forEach((frame) => {
        if (frame) frame.style.clipPath = 'none';
      });
      return undefined;
    }

    const ease = (amount) => 1 - (1 - amount) ** 3;
    let frame = 0;
    const apply = () => {
      frame = 0;
      const viewH = window.innerHeight || 1;
      const groups = new Map();
      media.forEach((node, index) => {
        const y = node.offsetTop;
        let key = null;
        for (const existing of groups.keys()) {
          if (Math.abs(existing - y) < 12) {
            key = existing;
            break;
          }
        }
        const id = key ?? y;
        const group = groups.get(id);
        if (group) group.push(index);
        else groups.set(id, [index]);
      });

      groups.forEach((indexes) => {
        const box = media[indexes[0]].getBoundingClientRect();
        const height = box.height || 1;
        const offscreen = box.bottom < height * -0.15 || box.top > viewH;
        let progress = 0;
        if (!offscreen) {
          const start = viewH * 0.92;
          const end = viewH * 0.36;
          const raw = (start - box.top) / (start - end);
          progress = ease(Math.min(1, Math.max(0, raw)));
        }
        const clip = `inset(0 ${(1 - progress) * 100}% 0 0)`;
        indexes.forEach((index) => {
          const node = frames[index];
          if (node) node.style.clipPath = clip;
        });
      });
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    let attached = window.__lenis;
    attached?.on?.('scroll', schedule);
    const lenisTimer = window.setInterval(() => {
      const next = window.__lenis;
      if (!next || next === attached) return;
      attached?.off?.('scroll', schedule);
      attached = next;
      attached.on?.('scroll', schedule);
    }, 300);
    return () => {
      cancelAnimationFrame(frame);
      frames.forEach((node) => {
        if (node) node.style.clipPath = '';
      });
      window.clearInterval(lenisTimer);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      attached?.off?.('scroll', schedule);
    };
  }, [items]);

  return (
    <section
      id="archive"
      className={styles.section}
      aria-labelledby="archive-title"
    >
      <h2 id="archive-title" className={styles.title}>
        Featured Work
      </h2>
      <div className={styles.filters} role="tablist" aria-label="Filter work">
        {FEATURED_FILTERS.map((name) => {
          const active = filter === name;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={active}
              className={`${styles.filter} ${active ? styles.filterActive : ''}`}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          );
        })}
      </div>
      <ul ref={gridRef} className={styles.grid}>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className={styles.card}>
              <div className={styles.media} data-work-media="">
                <div className={styles.frame}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className={styles.cardCopy}>
                <h3>{item.title}</h3>
                <p className={styles.pills}>
                  {item.pills.map((pill) => (
                    <span key={pill}>{pill}</span>
                  ))}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
