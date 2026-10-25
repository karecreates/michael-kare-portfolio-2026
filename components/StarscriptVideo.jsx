'use client';

import { useEffect, useRef } from 'react';
import { playInline } from '@/lib/inlineVideo';
import styles from './StarscriptVideo.module.css';

const VIDEO_SRC =
  '/placeholders/Michael_Portfolio_Images/Starscript_google_ads_showcase.mp4';

export default function StarscriptVideo() {
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
        aria-label="Starscript — Google Ads campaign showcase, looping video"
      />
    </div>
  );
}
