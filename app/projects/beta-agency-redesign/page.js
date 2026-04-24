import Image from 'next/image';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BetaAgencyRedesignVideo from '@/components/BetaAgencyRedesignVideo';
import { siteData } from '@/data/siteData';
import styles from './page.module.css';

const CASE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const TECH_PILLS = ['figma'];

const FRAME_DIR = '/placeholders/Michael_Portfolio_Images/Beta_Website_Frame_';

const WEBSITE_FRAMES = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1;
  return {
    src: `${FRAME_DIR}${n}.png`,
    alt: `Beta Agency homepage redesign — frame ${n} of 9`,
    width: 1920,
    height: 1080
  };
});

const INFORMATION =
  'A homepage redesign concept for Beta Agency—structured in Figma as a single, confident narrative: clear positioning, proof-forward modules, and typography that reads like a studio site rather than a generic agency template. Motion in the deliverable is used sparingly to guide the eye and reinforce hierarchy, so stakeholders can review the full scroll rhythm without UI chrome or playback controls—just the work, looped for study and presentation.';

export const metadata = {
  title: 'Beta Agency Redesign — Michael Kare',
  description:
    'Web design case study — Beta Agency homepage redesign (Figma, motion preview).'
};

export default function BetaAgencyRedesignProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="beta-redesign-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="beta-redesign-title" className={styles.projectTitle}>
                  Beta Agency Redesign
                </h1>
              </div>
              <ul className={styles.techPills} aria-label="Tools">
                {TECH_PILLS.map((label) => (
                  <li key={label} className={styles.techPill}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.category}>Web Design</p>
            <p className={styles.infoLabel}>Information</p>
            <p className={styles.infoBody}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.media} aria-label="Beta Agency redesign work">
          <BetaAgencyRedesignVideo />
          {WEBSITE_FRAMES.map((frame, index) => (
            <figure key={frame.src} className={styles.frame}>
              <Image
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
                className={styles.frameImage}
                priority={index < 2}
              />
            </figure>
          ))}
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
