import styles from './Footer.module.css';

export default function Footer({ data }) {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.topRow}>
        <span>{data.year}</span>
        <span>{data.handle}</span>
      </div>
      <div className={styles.wordmark}>{data.wordmark}</div>
    </footer>
  );
}
