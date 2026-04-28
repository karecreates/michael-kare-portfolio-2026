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

const LIVE_URL = 'https://seacliff.village.betaagency.com/';

const TECH_PILLS = ['.nextjs', 'react', 'vercel'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Seacliff_Village_Web_Development_Frame_1.png',
    alt: 'SeaCliff Village — frame 1',
    width: 1920,
    height: 992
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Seacliff_Village_Web_Development_Frame_2.png',
    alt: 'SeaCliff Village — frame 2',
    width: 1920,
    height: 992
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Seacliff_Village_Web_Development_Frame_3.png',
    alt: 'SeaCliff Village — frame 3',
    width: 1920,
    height: 992
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Seacliff_Village_Web_Development_Frame_4.png',
    alt: 'SeaCliff Village — frame 4',
    width: 1920,
    height: 992
  }
];

const INFORMATION =
  'A presentation-ready landing experience for SeaCliff Village, built with Next.js and React and deployed on Vercel. The deck-style layout foregrounds the Beta Agency story with a confident hero, modular sections, and clear next steps—tuned for stakeholder review, fast loads, and a crisp read at any viewport.';

export const metadata = {
  title: 'SeaCliff Village — Michael Kare',
  description: 'SeaCliff Village digital presentation — landing page case study.'
};

export default function SeacliffVillageProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="seacliff-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="seacliff-title" className={styles.projectTitle}>
                SeaCliff Village
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
              <div className={introLayoutStyles.introActions}>
                <div className={introLayoutStyles.introBack}>
                  <ProjectBackToProjects />
                </div>
                <ProjectLiveLink href={LIVE_URL} className={introLayoutStyles.introLive} />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="SeaCliff Village design frames">
          {FRAMES.map((frame) => (
            <figure key={frame.src} className={styles.frame}>
              <Image
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
                className={styles.frameImage}
                priority={frame.src.endsWith('Frame_1.png')}
              />
            </figure>
          ))}
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
