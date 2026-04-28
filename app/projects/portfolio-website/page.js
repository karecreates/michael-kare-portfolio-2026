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

const TECH_PILLS = ['nextjs', 'react'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Portfolio_Website_Frame_1.png',
    alt: 'Portfolio website — frame 1',
    width: 1920,
    height: 996
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Portfolio_Website_Frame_3.png',
    alt: 'Portfolio website — frame 3',
    width: 1920,
    height: 996
  }
];

const INFORMATION =
  'The portfolio you are browsing is its own case study: a Next.js and React surface built for clarity, speed, and a long-form read of work. Layout and components favor predictable rhythm—full-bleed case studies, sticky navigation, and a project grid that scales cleanly—while the stack keeps interactivity lightweight so photography and motion stay sharp. It is web development as self-editorial: one codebase that can grow with every new ship, without sacrificing craft.';

export const metadata = {
  title: 'Portfolio Website — Michael Kare',
  description: 'Web development case study — Michael Kare portfolio (Next.js & React).'
};

export default function PortfolioWebsiteProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="portfolio-site-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="portfolio-site-title" className={styles.projectTitle}>
                Portfolio Website
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

        <main className={styles.frames} aria-label="Portfolio website frames">
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
