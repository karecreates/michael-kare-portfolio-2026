import Image from 'next/image';
import Link from 'next/link';
import { getRelatedWorks } from '@/data/featuredWorks';
import styles from './RelatedProjects.module.css';

/**
 * Closing block for every project page: up to three related projects (two on
 * phones) chosen by shared disciplines, and a link back to the full index.
 */
export default function RelatedProjects({ currentHref, tags = [], limit = 3 }) {
  const related = getRelatedWorks(currentHref, tags, limit);

  return (
    <section className={styles.section} aria-labelledby="related-title">
      <div className={styles.head}>
        <span className={styles.kicker}>Keep exploring</span>
        <h2 id="related-title" className={styles.title}>
          Related projects
        </h2>
      </div>
      <ul className={styles.grid}>
        {related.map((item) => (
          <li key={item.id} className={styles.item}>
            <Link href={item.href} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 50vw, 33vw"
                />
              </div>
              <div className={styles.copy}>
                <h3>{item.title}</h3>
                <p className={styles.pills}>
                  {item.pills.map((pill) => (
                    <span key={pill}>{pill}</span>
                  ))}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <Link href="/work" className={styles.back}>
          <span aria-hidden="true">←</span> Back to projects
        </Link>
      </div>
    </section>
  );
}
