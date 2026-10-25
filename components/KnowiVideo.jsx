'use client';

import { useEffect, useRef } from 'react';
import { playInline } from '@/lib/inlineVideo';
import styles from './KnowiVideo.module.css';

const VIDEO_SRC = `/placeholders/Michael_Portfolio_Images/${encodeURIComponent(
  'knowi_website_animation_container_2160p.mp4'
)}`;

export default function KnowiVideo() {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const start = () => playInline(video).catch(() => {});
    start();
    video.addEventListener('loadeddata', start);
    return () => video.removeEventListener('loadeddata', start);
  }, []);
  return (
    <div className={styles.wrap}>
      <video
        ref={ref}
        className={styles.video}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-label="Knowi.ai website motion — looping video"
      />
    </div>
  );
}
