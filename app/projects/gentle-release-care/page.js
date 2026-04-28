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

const TECH_PILLS = ['next.js', 'react', 'figma'];

const HERO_FRAME = {
  src: '/placeholders/Michael_Portfolio_Images/Gentle_Release_Website.png',
  alt: 'Gentle Release Care — website overview',
  width: 1920,
  height: 1080
};

const INFORMATION =
  'Gentle Release Care is a marketing experience built in Next.js and React: a calm, editorial structure that carries visitors from positioning through services, story, and proof without visual noise. The system was designed in Figma—typography, spacing, and component states were defined up front—then implemented as reusable UI with predictable motion and responsive behavior across breakpoints. The outcome is a fast, trustworthy surface that reads as considered care: clear hierarchy, accessible contrast, and a narrative flow that works as well on a phone as it does on a large display.';

export const metadata = {
  title: 'Gentle Release Care — Michael Kare',
  description: 'Web design and development case study — Gentle Release Care in Next.js, React, and Figma.'
};

export default function GentleReleaseCareProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="gentle-release-care-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="gentle-release-care-title" className={styles.projectTitle}>
                Gentle Release Care
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Web Design &amp; Development</p>
            <div className={`${introLayoutStyles.introStack} ${styles.introMeta}`}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="Gentle Release Care design frames">
          <figure className={styles.frame}>
            <Image
              src={HERO_FRAME.src}
              alt={HERO_FRAME.alt}
              width={HERO_FRAME.width}
              height={HERO_FRAME.height}
              sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
              className={styles.frameImage}
              priority
            />
          </figure>
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
