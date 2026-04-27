import styles from './ProjectLiveLink.module.css';

export default function ProjectLiveLink({ href, children = 'View Project Live', className = '', ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[styles.liveLink, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
    </a>
  );
}
