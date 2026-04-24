import Image from 'next/image';
import SectionLabel from '@/components/SectionLabel';
import styles from './CreativeWork.module.css';

export default function CreativeWork({ data }) {
  return (
    <div className={styles.root}>
      <SectionLabel label={data.sectionLabel} />
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.headline}>{data.headline}</h2>
        <div className={styles.imageWrap}>
          {/* Intrinsic 750×531 — avoid fixed 16:9 + cover, which crops head/top */}
          <Image
            src={data.image}
            alt={data.imageAlt}
            width={750}
            height={531}
            sizes="(max-width: 900px) 100vw, min(960px, 92vw)"
            className={styles.image}
            priority
          />
        </div>
        <div className={styles.ctaRow}>
          <div className={styles.ctaCol}>
            <a href={data.ctaHref} className={styles.cta}>
              {data.ctaLabel}
            </a>
          </div>
          <div className={styles.ctaCursorCol}>
            <img
              src={data.cursorIcon}
              alt=""
              width={98}
              height={98}
              className={styles.cursor}
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
