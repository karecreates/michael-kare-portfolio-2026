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

const LIVE_URL = 'https://scsitesting.ai/';

const TECH_PILLS = ['wordpress'];

const PREVIEW_VIDEO_SRC = '/placeholders/scsitesting_ai_sequence.mp4';

const INFORMATION =
  'scsitesting.ai is a WordPress-built marketing surface for SCSI’s AI testing story—structured so complex positioning reads cleanly: what the platform does, who it serves, and how teams move from curiosity to evaluation. Templates, blocks, and typography were tuned for scanability across long pages, with responsive layouts that keep CTAs and proof points aligned on mobile and desktop. The result is a credible, maintainable site that supports ongoing campaigns and product updates without sacrificing clarity or performance.';

export const metadata = {
  title: 'SCSI Testing AI — Michael Kare',
  description: 'Web design case study — scsitesting.ai on WordPress.'
};

export default function ScsitestingAiProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="scsitesting-ai-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="scsitesting-ai-title" className={styles.projectTitle}>
                  SCSI Testing AI
                </h1>
                <ProjectLiveLink href={LIVE_URL} />
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
            <div className={introLayoutStyles.introStack}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <section className={styles.scrollMedia} aria-label="scsitesting.ai website preview">
          <video
            className={styles.scrollMediaVideo}
            src={PREVIEW_VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="scsitesting.ai — looping site preview video"
          />
        </section>

        <Footer data={footer} />
      </div>
    </>
  );
}
