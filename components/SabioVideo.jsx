import LazyVideo from './LazyVideo';
import styles from './SabioVideo.module.css';

const START_SEC = 60;

// 1080p derivative of "SCSI Testing AI Video 4K_2160p.mp4" (master kept on disk).
const VIDEO_SRC = '/showcase/video-animation-1080p.mp4';

export default function SabioVideo() {
  return (
    <div className={styles.wrap}>
      <LazyVideo
        className={styles.video}
        src={VIDEO_SRC}
        startAt={START_SEC}
        aria-label="Sabio brand motion — looping video"
      />
    </div>
  );
}
