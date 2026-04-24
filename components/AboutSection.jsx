import styles from './AboutSection.module.css';

export default function AboutSection({ data }) {
  const title = data.title ?? 'About Me';

  return (
    <div className={styles.about}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.bio}>
        {data.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className={styles.contact}>
        <a className={styles.email} href={`mailto:${data.email}`}>
          {data.email}
        </a>
        <p className={styles.location}>{data.location}</p>
      </div>

      <nav className={styles.socials} aria-label="Social links">
        {data.socials.map((social) => (
          <a key={social.label} href={social.href} className={styles.social}>
            {social.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
