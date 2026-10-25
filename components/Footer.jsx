'use client';

import { siteData } from '@/data/siteData';
import TextLoop from './TextLoop';
import PerspectiveMarqueeBand from './PerspectiveMarqueeBand';
import styles from './Footer.module.css';

export default function Footer({ data, showMarquee = false }) {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`${styles.topRow} ${styles.gutter}`}>
        <span>Have something in mind?</span>
        <span>Let’s talk.</span>
      </div>
      <div className={styles.gutter}>
        <a className={styles.invitation} href={`mailto:${siteData.about.email}`}>
          <span>LETS MAKE</span>
          <span>SOMETHING</span>
          <span>
            SPECIAL
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none">
                <path
                  d="M12 16H84V88"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                />
                <path
                  d="M12 88L84 16"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="butt"
                />
              </svg>
            </span>
          </span>
        </a>
      </div>
      {showMarquee ? <PerspectiveMarqueeBand /> : null}
      <div className={styles.loop}>
        <TextLoop
          text="Michael Kare • Please don't steal my work"
          shape="wave"
          speed={90}
          direction="forward"
          separator="•"
          curviness={90}
          fontSize={46}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          color="var(--on-accent)"
          ribbon
          ribbonColor="var(--accent)"
          ribbonWidth={86}
          pauseOnHover={false}
        />
      </div>
      <div className={`${styles.contactRow} ${styles.gutter}`}>
        <a href={`mailto:${siteData.about.email}`}>{siteData.about.email}</a>
        <nav aria-label="Social links">
          {siteData.about.socials
            .filter((social) => social.label !== 'Email')
            .map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
                <span className={styles.socialArrow} aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none">
                    <path
                      d="M12 16H84V88"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                    />
                    <path
                      d="M12 88L84 16"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="butt"
                    />
                  </svg>
                </span>
              </a>
            ))}
        </nav>
      </div>
      <div className={`${styles.bottomRow} ${styles.gutter}`}>
        <span className={styles.copyright}>
          © {String(data.year).slice(0, 2)}
          <span aria-hidden="true">&#8203;</span>
          {String(data.year).slice(2)} Michael Kare
        </span>
        <span>Marina del Rey, CA</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
