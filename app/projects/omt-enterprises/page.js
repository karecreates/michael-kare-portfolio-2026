import Image from 'next/image';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SushiEnyaScrollShowcase from '@/components/SushiEnyaScrollShowcase';
import { siteData } from '@/data/siteData';
import styles from './page.module.css';
import ProjectBackToProjects from '@/components/ProjectBackToProjects';
import introLayoutStyles from '@/components/projectCaseIntro.module.css';


const CASE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const LIVE_URL = 'https://omtenterprises.com/';

const TECH_PILLS = ['wordpress', 'elementor pro'];

const FULL_SCROLL = {
  src: '/placeholders/Michael_Portfolio_Images/OMT_Scroll.png',
  alt: 'OMT Enterprises website — full-length scroll',
  width: 3420,
  height: 16014
};

/** Matches `Sushi_Enya_Scoll.png` height for loop duration scaling. */
const SUSHI_REFERENCE_SCROLL_HEIGHT = 8910;

const SCROLL_DURATION_MS = Math.round(
  22500 * (FULL_SCROLL.height / SUSHI_REFERENCE_SCROLL_HEIGHT)
);

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/OMT_Enterprises_Web_Development_Frame_1.png',
    alt: 'OMT Enterprises — website frame 1',
    width: 1920,
    height: 1000
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/OMT_Enterprises_Web_Development_Frame_2.png',
    alt: 'OMT Enterprises — website frame 2',
    width: 1920,
    height: 999
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/OMT_Enterprises_Web_Development_Frame_3.png',
    alt: 'OMT Enterprises — website frame 3',
    width: 1920,
    height: 1000
  }
];

const INFORMATION =
  'A WordPress build for OMT Enterprises, Inc.—implemented with Elementor Pro to organize a broad wholesale story: sourcing, product development, club sales, and logistics for partners ranging from national retailers to specialty buyers. The site foregrounds product families across home, office, and outdoor categories while keeping service pillars and contact paths easy to scan—credibility-first web development for a team with decades in distribution and compliance.';

export const metadata = {
  title: 'OMT Enterprises — Michael Kare',
  description: 'Web development case study — OMT Enterprises on WordPress.'
};

export default function OmtEnterprisesProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="omt-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="omt-title" className={styles.projectTitle}>
                  OMT Enterprises
                </h1>
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveLink}
                >
                  View Project Live
                </a>
              </div>
              <ul className={styles.techPills} aria-label="Technologies">
                {TECH_PILLS.map((label) => (
                  <li key={label} className={styles.techPill}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.category}>Web Development</p>
            <div className={introLayoutStyles.introStack}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <SushiEnyaScrollShowcase
          imageSrc={FULL_SCROLL.src}
          imageAlt={FULL_SCROLL.alt}
          intrinsicWidth={FULL_SCROLL.width}
          intrinsicHeight={FULL_SCROLL.height}
          sectionAriaLabel="OMT Enterprises website preview"
          durationMs={SCROLL_DURATION_MS}
        />

        <main className={styles.frames} aria-label="OMT Enterprises design frames">
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
