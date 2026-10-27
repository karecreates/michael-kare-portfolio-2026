import LazyVideo from './LazyVideo';
import styles from './BetaAgencyRedesignVideo.module.css';

const VIDEO_SRC =
  '/placeholders/Michael_Portfolio_Images/Beta_Homepage_Animation.mp4';

export default function BetaAgencyRedesignVideo() {
  return (
    <div className={styles.wrap}>
      <LazyVideo
        className={styles.video}
        src={VIDEO_SRC}
        eager
        aria-label="Beta Agency homepage redesign — motion preview"
      />
    </div>
  );
}
