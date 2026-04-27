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

const TECH_PILLS = ['indesign', 'photoshop'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/daves_hot_eblast.png',
    alt: "Dave's Hot Chicken — marketing email design",
    width: 1080,
    height: 1726
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Qdoba_Marketing_eblast.png',
    alt: 'Qdoba — marketing email design',
    width: 1080,
    height: 1846
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Sweetgreen_marketing_eblast.png',
    alt: 'Sweetgreen — marketing email design',
    width: 1080,
    height: 2131
  }
];

const INFORMATION =
  'Campaign-ready marketing e-blasts for Beta Agency—each piece built to move quickly from design review to ESP handoff without sacrificing craft. Layouts are authored in InDesign with disciplined grids, type styles, and export settings tuned for long vertical email canvases; photography and brand color are refined in Photoshop so hero art, food, and badges stay crisp at retina density. The work spans distinct restaurant brands—Dave’s Hot Chicken, Qdoba, and Sweetgreen—while keeping hierarchy, legibility, and CTA clarity consistent in the inbox.';

export const metadata = {
  title: 'Beta Agency Marketing Design — Michael Kare',
  description: 'Email and campaign design — Beta Agency marketing e-blasts in InDesign and Photoshop.'
};

export default function BetaAgencyMarketingDesignPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="beta-agency-marketing-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="beta-agency-marketing-title" className={styles.projectTitle}>
                  Beta Agency Marketing Design
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
            <p className={styles.category}>Email &amp; Campaign</p>
            <div className={introLayoutStyles.introStack}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="Beta Agency marketing e-blast designs">
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
