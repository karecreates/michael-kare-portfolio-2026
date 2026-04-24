'use client';

import styles from './StarscriptVideo.module.css';

const VIDEO_SRC =
  '/placeholders/Michael_Portfolio_Images/Starscript_google_ads_showcase.mp4';

export default function StarscriptVideo() {
  return (
    <div className={styles.wrap}>
      <video
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
