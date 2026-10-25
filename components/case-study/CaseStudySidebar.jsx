import Link from 'next/link';
import FadeLines from '@/components/FadeLines';
import styles from './CaseStudySidebar.module.css';

export default function CaseStudySidebar({ study }) {
  const cta = study.cta ?? {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.kickerRow}>
          <p className={styles.kicker}>{study.label ?? 'Case Study'}</p>
          <Link href="/#archive" className={styles.back}>
            Selected work
          </Link>
        </div>
        <FadeLines as="h1" className={styles.title} text={study.title} />
        {study.projectType ? <p className={styles.projectType}>{study.projectType}</p> : null}
        {study.description ? (
          <FadeLines className={styles.description} text={study.description} />
        ) : null}
        {study.disciplines?.length ? (
          <ul className={styles.disciplines}>
            {study.disciplines.map((item) => (
              <li key={item} className={styles.discipline}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <a className={styles.cta} href={cta.href}>
        {cta.label}
      </a>
    </aside>
  );
}
