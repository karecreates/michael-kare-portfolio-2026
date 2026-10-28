import RelatedProjects from './RelatedProjects';
import styles from './ProjectOutro.module.css';

/** Related projects + back link for the hand-built project pages. */
export default function ProjectOutro({ current, tags }) {
  return (
    <div className={styles.outro}>
      <RelatedProjects currentHref={current} tags={tags} />
    </div>
  );
}
