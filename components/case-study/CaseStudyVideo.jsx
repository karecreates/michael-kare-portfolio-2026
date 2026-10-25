'use client';

import { useEffect, useRef, useState } from 'react';
import { playInline, releaseInline } from '@/lib/inlineVideo';
import styles from './CaseStudyGallery.module.css';

const activePlayers = new Set();

function releaseOthers(current) {
  activePlayers.forEach((node) => {
    if (node !== current && !node.paused) node.pause();
  });
}

export default function CaseStudyVideo({ video, surfaceClass }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [src, setSrc] = useState(video.lazy && !video.lead ? undefined : video.src);
  const ratio = video.width && video.height ? `${video.width} / ${video.height}` : undefined;
  const showNativeControls = video.controls === true && !video.seamless;
  const canAutoplay = video.autoPlay !== false && !reduceMotion;
  const showButton = !video.seamless && !showNativeControls;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(motion.matches);
    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!video.lazy || video.lead || src) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSrc(video.src);
          observer.disconnect();
        }
      },
      { rootMargin: '480px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [src, video.lazy, video.lead, video.src]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !src) return undefined;
    activePlayers.add(node);
    const onPlay = () => {
      releaseOthers(node);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    node.addEventListener('play', onPlay);
    node.addEventListener('pause', onPause);

    const tryPlay = () => {
      if (!canAutoplay || node.paused === false) return;
      const box = node.getBoundingClientRect();
      const visible = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0);
      if (visible < Math.min(box.height, window.innerHeight) * 0.28) return;
      releaseOthers(node);
      playInline(node).catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.28
        );
        if (!visible) {
          releaseInline(node);
          node.pause();
          return;
        }
        tryPlay();
      },
      { threshold: [0, 0.28, 0.6] }
    );
    observer.observe(node);
    node.addEventListener('loadeddata', tryPlay);
    tryPlay();

    return () => {
      observer.disconnect();
      node.removeEventListener('loadeddata', tryPlay);
      node.removeEventListener('play', onPlay);
      node.removeEventListener('pause', onPause);
      activePlayers.delete(node);
      node.pause();
    };
  }, [canAutoplay, src]);

  const toggle = () => {
    const node = ref.current;
    if (!node) return;
    if (!src) setSrc(video.src);
    if (node.paused) {
      releaseOthers(node);
      playInline(node).then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      node.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={`${styles.video} ${surfaceClass || ''}`}
      style={ratio ? { '--video-ratio': ratio } : undefined}
    >
      <video
        ref={ref}
        className={styles.videoEl}
        src={src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        muted={video.muted !== false}
        loop={video.loop !== false}
        playsInline
        webkit-playsinline="true"
        autoPlay={canAutoplay}
        controls={showNativeControls}
        disablePictureInPicture
        preload={video.lead ? 'auto' : video.preload || 'metadata'}
        aria-label={video.alt}
      />
      {showButton ? (
        <button type="button" className={styles.videoToggle} onClick={toggle}>
          {playing ? 'Pause' : 'Play'}
        </button>
      ) : null}
    </div>
  );
}
