'use client';

import { useEffect, useMemo, useState } from 'react';
import GridMotion from './GridMotion';
import ShinyText from './ShinyText';
import { FEATURED_WORKS } from '@/data/featuredWorks';
import { siteData } from '@/data/siteData';
import styles from './WorkGridCta.module.css';

/**
 * Closing call to action: every project thumbnail drifting in a tilted,
 * seamlessly looping grid behind a shiny "Ready to get to work?" and an email
 * button.
 */
export default function WorkGridCta() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setLight(root.dataset.theme === 'light');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // 640px WebP derivatives of the 1920x1080 thumbnails (public/showcase/grid),
  // sized for the small drifting tiles.
  const items = useMemo(
    () =>
      FEATURED_WORKS.map((work) => {
        const file = decodeURIComponent(work.image.split('/').pop()).replace(/\.png$/i, '.webp');
        return { src: `/showcase/grid/${encodeURIComponent(file)}`, alt: '' };
      }),
    [],
  );

  return (
    <section className={styles.section} aria-labelledby="work-cta-title">
      <div className={styles.grid} aria-hidden="true">
        <GridMotion
          items={items}
          rows={4}
          aspectRatio={16 / 9}
          gap={16}
          radius={14}
          angle={-12}
          tilt={0}
          speed={42}
          direction="alternate"
          parallax={0.5}
          spotlight={0.6}
          dim={0.45}
          fade={0.5}
          grayscale={false}
          theme={light ? 'light' : 'dark'}
        />
      </div>
      <div className={styles.overlay}>
        <h2 id="work-cta-title" className={styles.title}>
          <ShinyText
            text="Ready to get to work?"
            color={light ? '#4a4a4a' : '#b5b5b5'}
            shineColor={light ? '#000000' : '#ffffff'}
            speed={2.4}
            shineWidth={40}
            softness={0.8}
            trigger="loop"
            delay={0.6}
            angle={120}
            bands={1}
            glow={0}
            direction="left"
            easing="smooth"
          />
        </h2>
        <a className={styles.button} href={`mailto:${siteData.about.email}`}>
          Email me
        </a>
      </div>
    </section>
  );
}
