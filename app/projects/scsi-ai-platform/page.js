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

const TECH_PILLS = ['figma', 'wordpress'];

const FRAME_DIR = '/placeholders/Michael_Portfolio_Images/';

function frameSrc(n) {
  return `${FRAME_DIR}${encodeURIComponent(`SCSI_Testing_AI_Platform_UI:UX_Frame_${n}.png`)}`;
}

const FRAMES = [
  {
    src: frameSrc(1),
    alt: 'SCSI AI Platform — UI/UX frame 1',
    width: 1920,
    height: 1015
  },
  {
    src: frameSrc(2),
    alt: 'SCSI AI Platform — UI/UX frame 2',
    width: 1920,
    height: 1115
  },
  {
    src: frameSrc(3),
    alt: 'SCSI AI Platform — UI/UX frame 3',
    width: 1920,
    height: 1014
  },
  {
    src: frameSrc(4),
    alt: 'SCSI AI Platform — UI/UX frame 4',
    width: 1920,
    height: 1187
  }
];

const INFORMATION =
  'A dense, product-grade UI for the SCSI AI testing platform—where signal, tables, and controls have to stay legible under real workloads. The interface system was modeled in Figma: grids, component states, and typography tuned for dashboards and drill-down flows, with patterns that scale from overview metrics to edge-case detail. WordPress anchors the broader marketing and documentation surface so product UI and public narrative stay visually aligned while each stack can evolve on its own cadence.';

export const metadata = {
  title: 'SCSI AI Platform — Michael Kare',
  description: 'UI/UX case study — SCSI AI testing platform.'
};

export default function ScsiAiPlatformProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="scsi-ai-platform-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="scsi-ai-platform-title" className={styles.projectTitle}>
                SCSI AI Platform
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>UI/UX</p>
            <div className={`${introLayoutStyles.introStack} ${styles.introMeta}`}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="SCSI AI Platform UI/UX frames">
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
