import Image from 'next/image';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteData } from '@/data/siteData';
import styles from './page.module.css';
import ProjectBackToProjects from '@/components/ProjectBackToProjects';
import ProjectLiveLink from '@/components/ProjectLiveLink';
import introLayoutStyles from '@/components/projectCaseIntro.module.css';


const CASE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const LIVE_URL = 'https://solace-landing-page-hero-assignment.webflow.io/';

const TECH_PILLS = ['figma', 'webflow'];

const HERO = {
  src: '/placeholders/Michael_Portfolio_Images/Solace_Design_Development_Frame_1_new.png',
  alt: 'Solace — desktop hero landing page',
  width: 1920,
  height: 1080
};

const MOBILE = {
  src: '/placeholders/Michael_Portfolio_Images/Solace_Web_Design_Development_Frame_2.png',
  alt: 'Solace — mobile layout',
  width: 400,
  height: 1114
};

const INFORMATION =
  'A Webflow landing page for Solace that leads with a calm, confident hero and a clear advocacy story for families navigating care. Trust cues, patient proof, and a focused path to “find my advocate” stay legible at a glance—while the mobile build keeps the same narrative arc in a tight, scroll-friendly column.';

export const metadata = {
  title: 'Solace — Michael Kare',
  description: 'Web design and development case study — Solace healthcare landing page.'
};

export default function SolaceProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="solace-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="solace-title" className={styles.projectTitle}>
                  Solace
                </h1>
                <ProjectLiveLink href={LIVE_URL}>View project live</ProjectLiveLink>
              </div>
              <ul className={styles.techPills} aria-label="Technologies">
                {TECH_PILLS.map((label) => (
                  <li key={label} className={styles.techPill}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.category}>Web Design & Development</p>
            <div className={introLayoutStyles.introStack}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="Solace design frames">
          <div className={styles.heroPair}>
            <figure className={`${styles.frame} ${styles.heroFrame}`}>
              <Image
                src={HERO.src}
                alt={HERO.alt}
                width={HERO.width}
                height={HERO.height}
                sizes="(max-width: 900px) calc(100vw - 28px), (max-width: 1200px) 58vw, 1200px"
                className={styles.frameImage}
                priority
              />
            </figure>
            <figure className={`${styles.frame} ${styles.mobileFrame}`}>
              <Image
                src={MOBILE.src}
                alt={MOBILE.alt}
                width={MOBILE.width}
                height={MOBILE.height}
                sizes="(max-width: 900px) min(400px, calc(100vw - 28px)), 400px"
                className={styles.mobileImage}
              />
            </figure>
          </div>
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
