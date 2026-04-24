import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarscriptVideo from '@/components/StarscriptVideo';
import { siteData } from '@/data/siteData';
import styles from './page.module.css';

const CASE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const TECH_PILLS = [
  'after effects',
  'google ads',
  'google analytics',
  'google tag manager',
  'big query'
];

const INFORMATION =
  'Starscript pairs motion-led creative with a measurement stack built for scale: ads are authored in After Effects for crisp brand storytelling, then deployed through Google Ads with disciplined naming, audiences, and experiments. Google Analytics and Tag Manager keep conversion paths and campaign signals consistent across surfaces, while BigQuery becomes the source of truth for stitched reporting—so performance reviews move from screenshots to queryable insight. The result is creative that stays on-message and a data layer leadership can trust when budgets and targets shift.';

export const metadata = {
  title: 'Starscript — Michael Kare',
  description: 'Google Ads case study — Starscript creative and analytics stack.'
};

export default function StarscriptProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="starscript-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="starscript-title" className={styles.projectTitle}>
                  Starscript
                </h1>
              </div>
              <ul className={styles.techPills} aria-label="Technologies">
                {TECH_PILLS.map((label) => (
                  <li key={label} className={styles.techPill}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.category}>Google Ads</p>
            <p className={styles.infoLabel}>Information</p>
            <p className={styles.infoBody}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="Starscript campaign showcase">
          <StarscriptVideo />
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
