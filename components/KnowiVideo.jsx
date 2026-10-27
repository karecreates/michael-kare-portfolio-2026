import LazyVideo from './LazyVideo';
import styles from './KnowiVideo.module.css';

const VIDEO_SRC = `/placeholders/Michael_Portfolio_Images/${encodeURIComponent(
  'knowi_website_animation_container_2160p.mp4'
)}`;

export default function KnowiVideo() {
  return (
    <div className={styles.wrap}>
      <LazyVideo
        className={styles.video}
        src={VIDEO_SRC}
        aria-label="Knowi.ai website motion — looping video"
      />
    </div>
  );
}
