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

const TECH_PILLS = ['figma'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Teleidoscope_Web_Design_Frame_1.png',
    alt: 'Teleidoscope website — hero',
    width: 1920,
    height: 1022
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Teleidoscope_Web_Design_Frame_2.png',
    alt: 'Teleidoscope website — narrative and features',
    width: 1920,
    height: 2299
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Teleidoscope_Web_Design_Frame_3.png',
    alt: 'Teleidoscope website — product highlights',
    width: 1920,
    height: 1277
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Teleidoscope_Web_Design_Frame_4.png',
    alt: 'Teleidoscope website — proof and metrics',
    width: 1920,
    height: 667
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Teleidoscope_Web_Design_Frame_5.png',
    alt: 'Teleidoscope website — detail section',
    width: 1920,
    height: 1146
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Teleidoscope_Web_Design_Frame_6.png',
    alt: 'Teleidoscope website — closing',
    width: 1920,
    height: 526
  }
];

const INFORMATION =
  'A scroll-driven experience for Teleidoscope that pairs prismatic gradients with crisp type and kinetic UI moments. The layout carries visitors from positioning through product story and proof—tuned for confident storytelling on desktop and fluid thumb-friendly browsing on mobile.';

export const metadata = {
  title: 'Teleidoscope — Michael Kare',
  description: 'Web design case study for Teleidoscope.'
};

export default function TeleidoscopeProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="teleidoscope-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <h1 id="teleidoscope-title" className={styles.projectTitle}>
                Teleidoscope
              </h1>
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

        <main className={styles.frames} aria-label="Teleidoscope design frames">
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
