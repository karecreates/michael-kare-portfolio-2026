import Image from 'next/image';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteData } from '@/data/siteData';
import styles from './page.module.css';

const CASE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const TECH_PILLS = ['figma'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Smile_Wellness_Web_Design_Frame_1.png',
    alt: 'Smile Wellness — website frame 1',
    width: 1920,
    height: 908
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Smile_Wellness_Web_Design_Frame_2.png',
    alt: 'Smile Wellness — website frame 2',
    width: 1920,
    height: 1047
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Smile_Wellness_Web_Design_Frame_3.png',
    alt: 'Smile Wellness — website frame 3',
    width: 1920,
    height: 1506
  }
];

const INFORMATION =
  'A web design system for Smile Wellness that foregrounds trust, warmth, and clinical credibility before a patient ever books. The experience was structured in Figma—type scale, color, spacing, and component states map cleanly from hero through services and contact—so messaging about care and outcomes feels calm, legible, and human. The result is a dental brand that reads as approachable expertise: clear hierarchy, generous whitespace, and a path to action that never feels rushed.';

export const metadata = {
  title: 'Smile Wellness — Michael Kare',
  description: 'Web design case study — Smile Wellness.'
};

export default function SmileWellnessProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="smile-wellness-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="smile-wellness-title" className={styles.projectTitle}>
                  Smile Wellness
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
            <p className={styles.category}>Web Design</p>
            <p className={styles.infoLabel}>Information</p>
            <p className={styles.infoBody}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="Smile Wellness design frames">
          {FRAMES.map((frame, index) => (
            <figure key={frame.src} className={styles.frame}>
              <Image
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
                className={styles.frameImage}
                priority={index === 0}
              />
            </figure>
          ))}
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
