'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './CreativeInfiniteGallery.module.css';

const InfiniteGallery = dynamic(() => import('@/components/ui/infinite-gallery'), {
  ssr: false,
});

const cool = (file) => `/${['Cool_Stuff', file].map(encodeURIComponent).join('/')}`;

const CREATIVE_IMAGES = [
  {
    url: '/editorial/creative-gallery/1.webp',
    width: 1400,
    height: 788,
  },
  {
    url: '/placeholders/Michael_Portfolio_Images/Creative_2.mp4',
    width: 960,
    height: 960,
  },
  {
    url: '/editorial/creative-gallery/3.webp',
    width: 1400,
    height: 1400,
  },
  {
    url: '/editorial/creative-gallery/4.webp',
    width: 1399,
    height: 1400,
  },
  {
    url: '/editorial/creative-gallery/5.webp',
    width: 1400,
    height: 1400,
  },
  {
    url: '/editorial/creative-gallery/6.webp',
    width: 1400,
    height: 1400,
  },
  {
    url: '/editorial/creative-gallery/7.webp',
    width: 1400,
    height: 788,
  },
  {
    url: '/editorial/creative-gallery/8.webp',
    width: 1400,
    height: 1400,
  },
  {
    url: cool('Academy_LIGHT.png'),
    width: 2550,
    height: 1650,
  },
  {
    url: cool('MENU.png'),
    width: 2550,
    height: 1650,
  },
  {
    url: cool('milky_way_car.png'),
    width: 1920,
    height: 1080,
  },
  {
    url: cool('rolling_dog_main_front_panel.png'),
    width: 2048,
    height: 975,
  },
  {
    url: cool('Knowi_Animation_Sequence.mp4'),
    width: 1920,
    height: 1080,
  },
  {
    url: cool('knowi_animation_new_web_friendly.mp4'),
    width: 1920,
    height: 1080,
  },
  {
    url: cool('how_to_video.mp4'),
    width: 1276,
    height: 720,
  },
  {
    url: cool('clean_tesla_file.mp4'),
    width: 1280,
    height: 720,
  },
  {
    url: cool('SCSI_Testing_Cropped.mp4'),
    width: 600,
    height: 200,
  },
  {
    url: cool('scsi_ai_video_720p.mp4'),
    width: 1280,
    height: 720,
  },
];

function usePageBackground() {
  const [color, setColor] = useState('#000000');
  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
      if (/^#[0-9a-f]{6}$/i.test(value)) setColor(value);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);
  return color;
}

export default function CreativeInfiniteGallery({ reduced }) {
  const trackRef = useRef(null);
  const progressRef = useRef(0);
  const fadeRef = useRef(null);
  const hintRef = useRef(null);
  const pageBackground = usePageBackground();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        io.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    let active = false;
    const apply = () => {
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      progressRef.current = progress;
      if (fadeRef.current) {
        fadeRef.current.style.opacity = String(
          progress < 0.9 ? 0 : Math.min(1, (progress - 0.9) / 0.08),
        );
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(
          progress < 0.08 ? 1 : Math.max(0, 1 - (progress - 0.08) / 0.08),
        );
      }
    };
    const tick = () => {
      apply();
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
      { rootMargin: '20% 0px' },
    );
    io.observe(track);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section
        id="creative-gallery"
        ref={trackRef}
        className={styles.static}
        aria-labelledby="creative-gallery-title"
      >
        <div className={styles.kicker}>
          <span>03 / Studies</span>
          <span>{String(CREATIVE_IMAGES.length).padStart(2, '0')} pieces</span>
        </div>
        <h2 id="creative-gallery-title" className={styles.staticTitle}>
          Creative studies
        </h2>
        <div className={styles.staticGrid}>
          {ready && CREATIVE_IMAGES.map((item, index) => (
            <figure key={item.url} className={styles.staticItem}>
              {/\.(mp4|webm|mov)(\?|$)/i.test(item.url) ? (
                <video
                  src={item.url}
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  autoPlay
                  preload="metadata"
                  disablePictureInPicture
                  aria-label={`Creative study ${index + 1}`}
                />
              ) : (
                <img src={item.url} alt={`Creative study ${index + 1}`} loading="lazy" decoding="async" />
              )}
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="creative-gallery"
      ref={trackRef}
      className={styles.track}
      aria-labelledby="creative-gallery-title"
    >
      <div className={styles.sticky}>
        <h2 id="creative-gallery-title" className={styles.visuallyHidden}>
          Creative studies
        </h2>
        {ready ? (
          <InfiniteGallery
            width="100%"
            height="100%"
            images={CREATIVE_IMAGES}
            density={5}
            imageSize={14}
            cellSize={110}
            viewRange={2}
            fogNear={120}
            fogFar={320}
            dragSpeed={1}
            driftAmount={8}
            friction={0.9}
            autoZoom
            autoZoomSpeed={0.32}
            imageRadius={0.06}
            allowImageFocusOnClick={false}
            backgroundColor={pageBackground}
            fogColor={pageBackground}
            progressRef={progressRef}
            trackRef={trackRef}
          />
        ) : null}
        <p ref={hintRef} className={styles.hint}>
          Scroll to move through the work
        </p>
        <div ref={fadeRef} className={styles.fade} aria-hidden="true" />
      </div>
    </section>
  );
}
