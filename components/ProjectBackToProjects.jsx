import Link from 'next/link';
import styles from './ProjectBackToProjects.module.css';

export default function ProjectBackToProjects() {
  return (
    <Link href="/work" className={styles.backLink}>
      <span className={styles.arrow} aria-hidden="true">
        ←
      </span>
      Back to projects
    </Link>
  );
}
