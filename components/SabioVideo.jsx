'use client';

import { useCallback } from 'react';
import styles from './SabioVideo.module.css';

const START_SEC = 60;

const VIDEO_SRC = `/placeholders/Michael_Portfolio_Images/${encodeURIComponent(
  'SCSI Testing AI Video 4K_2160p.mp4'
)}`;

export default function SabioVideo() {
  const onLoadedMetadata = useCallback((e) => {
    e.currentTarget.currentTime = START_SEC;
  }, []);

  const onSeeked = useCallback((e) => {
    void e.currentTarget.play();
  }, []);

  const onEnded = useCallback((e) => {
    const v = e.currentTarget;
    v.currentTime = START_SEC;
    void v.play();
  }, []);

  return (
    <div className={styles.wrap}>
      <video
        className={styles.video}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedMetadata={onLoadedMetadata}
        onSeeked={onSeeked}
        onEnded={onEnded}
        aria-label="Sabio brand motion — looping video"
      />
    </div>
  );
}
