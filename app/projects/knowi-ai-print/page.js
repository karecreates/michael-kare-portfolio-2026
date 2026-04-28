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

const TECH_PILLS = ['adobe illustrator', 'photoshop'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Knowi_AI_Print_Frame_1.png',
    alt: 'Knowi AI print design — frame 1',
    width: 1920,
    height: 1423
  }
];

const DESIGNS = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Knowi_AI_Print_Design_1.png',
    alt: 'Knowi AI print design 1',
    width: 1763,
    height: 4096
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Knowi_AI_Print_Design_2.png',
    alt: 'Knowi AI print design 2',
    width: 1763,
    height: 4096
  }
];

const INFORMATION =
  'Large-format print for Knowi AI—built in Illustrator for crisp vector lockups and finished in Photoshop for color, texture, and production-ready exports. The work balances brand presence at a distance with detail that holds up in hand: hierarchy that reads in busy environments, restrained palettes that stay on-brand, and files structured so vendors can impose, trim, and proof without guesswork.';

export const metadata = {
  title: 'Knowi AI Print Design — Michael Kare',
  description: 'Knowi AI print design — Adobe Illustrator and Photoshop.'
};

export default function KnowiAiPrintProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="knowi-ai-print-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="knowi-ai-print-title" className={styles.projectTitle}>
                Knowi AI Print Design
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Print design</p>
            <div className={`${introLayoutStyles.introStack} ${styles.introMeta}`}>
              <p className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}>Information</p>
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
            <p className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="Knowi AI print design frames">
          {FRAMES.map((frame) => (
            <figure key={frame.src} className={styles.frame}>
              <Image
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
                className={styles.frameImage}
                priority
              />
            </figure>
          ))}

          <div className={styles.designGrid} aria-label="Knowi AI print design variations">
            {DESIGNS.map((design, index) => (
              <figure key={design.src} className={styles.frame}>
                <Image
                  src={design.src}
                  alt={design.alt}
                  width={design.width}
                  height={design.height}
                  sizes="(max-width: 900px) calc(100vw - 28px), (max-width: 1400px) calc((100vw - 60px) / 2), 860px"
                  className={styles.frameImage}
                  priority={index === 0}
                />
              </figure>
            ))}
          </div>
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
