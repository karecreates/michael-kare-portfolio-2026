import styles from './SectionLabel.module.css';

export default function SectionLabel({ label }) {
  return <div className={styles.label}>{label} ↘</div>;
}
