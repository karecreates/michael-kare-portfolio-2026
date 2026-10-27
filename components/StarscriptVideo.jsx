import LazyVideo from './LazyVideo';
import styles from './StarscriptVideo.module.css';

const VIDEO_SRC =
  '/placeholders/Michael_Portfolio_Images/Starscript_google_ads_showcase.mp4';

export default function StarscriptVideo() {
  return (
    <div className={styles.wrap}>
      <LazyVideo
        className={styles.video}
        src={VIDEO_SRC}
        eager
        aria-label="Starscript — Google Ads campaign showcase, looping video"
      />
    </div>
  );
}
