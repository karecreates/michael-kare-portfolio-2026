'use client';

import { useEffect, useRef } from 'react';
import { playInline, releaseInline } from '@/lib/inlineVideo';
import styles from './BetaAgencyRedesignVideo.module.css';

const VIDEO_SRC =
  '/placeholders/Michael_Portfolio_Images/Beta_Homepage_Animation.mp4';

export default function BetaAgencyRedesignVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      if (mq.matches) {
        releaseInline(video);
        video.pause();
        return;
      }
      playInline(video).catch(() => {});
    };

    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div className={styles.wrap}>
      <video
        ref={videoRef}
        className={styles.video}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-label="Beta Agency homepage redesign — motion preview"
      />
    </div>
  );
}
