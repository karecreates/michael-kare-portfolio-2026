import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KnowiVideo from '@/components/KnowiVideo';
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

const LIVE_URL = 'https://knowi.ai/';

const TECH_PILLS = ['figma', 'wordpress', 'after effects'];

const SCROLL_VIDEO_SRC =
  '/placeholders/Michael_Portfolio_Images/Knowi_Animation_Sequence.mp4';

const INFORMATION =
  'A web and brand initiative for Knowi.ai that pairs a disciplined UI system with motion-led storytelling. Design was prototyped in Figma, the marketing surface is built on WordPress for flexible publishing, and After Effects animation carries the product narrative in a hero loop—so positioning reads clearly whether visitors land on static hero art or the full-width motion container.';

export const metadata = {
  title: 'Knowi.ai — Michael Kare',
  description: 'Web development and branding case study — Knowi.ai.'
};

export default function KnowiAiProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="knowi-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="knowi-title" className={styles.projectTitle}>
                  Knowi.ai
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
            <p className={styles.category}>Web Development &amp; Branding</p>
            <div className={introLayoutStyles.introStack}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <section className={styles.scrollMedia} aria-label="Knowi.ai website preview">
          <video
            className={styles.scrollMediaVideo}
            src={SCROLL_VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="Knowi.ai website animation sequence — looping video"
          />
        </section>

        <main className={styles.frames} aria-label="Knowi.ai project media">
          <KnowiVideo />
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
