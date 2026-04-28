import Image from 'next/image';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteData } from '@/data/siteData';
import styles from './page.module.css';
import ProjectBackToProjects from '@/components/ProjectBackToProjects';
import introLayoutStyles from '@/components/projectCaseIntro.module.css';


const CASE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const TECH_PILLS = ['figma'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Folio_App_Design_Frame_1.png',
    alt: 'Folio — app prototype frame 1',
    width: 1920,
    height: 1080
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Folio_App_Design_Frame_2.png',
    alt: 'Folio — app prototype frame 2',
    width: 1920,
    height: 929
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Folio_App_Design_Frame_3.png',
    alt: 'Folio — app prototype frame 3',
    width: 1920,
    height: 1080
  }
];

const INFORMATION =
  'Folio is an app prototype explored in Figma—focused on a clear primary journey, predictable navigation, and UI that can flex without breaking. Components are built for reuse across screens: spacing, type scale, and touch targets stay consistent so flows feel intentional rather than stitched together. The frames document key states and transitions enough to hand off for critique or dev without a live build.';

export const metadata = {
  title: 'Folio — Michael Kare',
  description: 'Folio app prototyping case study — Figma.'
};

export default function FolioProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="folio-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="folio-title" className={styles.projectTitle}>
                Folio
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>App prototyping</p>
            <div className={`${introLayoutStyles.introStack} ${styles.introMeta}`}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="Folio app design frames">
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
