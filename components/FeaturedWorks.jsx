'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_FILTERS, FEATURED_WORKS } from '@/data/featuredWorks';
import GooeyNav from './GooeyNav';
import styles from './FeaturedWorks.module.css';

// No href: GooeyNav renders buttons, so filtering never touches the URL.
const FILTER_ITEMS = FEATURED_FILTERS.map((label) => ({ label }));

/**
 * Filterable project grid. The homepage passes a curated subset with the
 * filters off and a "view all" link; /work renders the full set as the page.
 */
export default function FeaturedWorks({
  works = FEATURED_WORKS,
  heading = 'Featured Work',
  headingTag: Heading = 'h2',
  id = 'archive',
  filters = true,
  cta = null,
  align = 'start',
}) {
  const [filter, setFilter] = useState('All');
  const [light, setLight] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setLight(root.dataset.theme === 'light');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  const items = useMemo(
    () =>
      !filters || filter === 'All'
        ? works
        : works.filter((item) => item.pills.includes(filter)),
    [works, filters, filter],
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
      id={id}
      className={`${styles.section} ${align === 'center' ? styles.centered : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <Heading id={`${id}-title`} className={styles.title}>
        {heading}
      </Heading>
      {filters ? (
        <div className={styles.filters}>
          <GooeyNav
            className={styles.gooey}
            items={FILTER_ITEMS}
            activeIndex={Math.max(0, FEATURED_FILTERS.indexOf(filter))}
            onChange={(index) => setFilter(FEATURED_FILTERS[index])}
            theme={light ? 'light' : 'dark'}
            color={light ? '#000000' : '#ffffff'}
            size="md"
            frame
            particleCount={15}
            spread={56}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect
          />
        </div>
      ) : (
        <div className={styles.spacer} aria-hidden="true" />
      )}
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
      {cta ? (
        <div className={styles.ctaRow}>
          <Link href={cta.href} className={styles.viewAll}>
            {cta.label}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
