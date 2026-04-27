import styles from './SectionLabel.module.css';

const ARROW_SRC = '/placeholders/Michael_Portfolio_Images/arrow_home.svg';

export default function SectionLabel({ label }) {
  return (
    <div className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <img
        src={ARROW_SRC}
        alt=""
        width={27}
        height={26}
        className={styles.arrow}
        decoding="async"
      />
    </div>
  );
}
