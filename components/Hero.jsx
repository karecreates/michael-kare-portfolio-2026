import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero({ data }) {
  return (
    <section id="top" className={styles.hero} aria-label="Portfolio hero">
      <div className={`container ${styles.visual}`}>
        <div className={styles.imageWrap}>
          <Image
            src={data.portrait}
            alt={data.portraitAlt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 920px"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
