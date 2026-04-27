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
    src: '/placeholders/Michael_Portfolio_Images/Sushi_Enya_Frame_1.png',
    alt: 'Sushi Enya website — hero',
    width: 1920,
    height: 1022
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Sushi_Enya_Frame_2.png',
    alt: 'Sushi Enya website — our story',
    width: 1920,
    height: 1947
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Sushi_Enya_Frame_3.png',
    alt: 'Sushi Enya website — menu preview',
    width: 1920,
    height: 2121
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Sushi_Enya_Frame_4.png',
    alt: 'Sushi Enya website — reviews',
    width: 1920,
    height: 936
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Sushi_Enya_Frame_5.png',
    alt: 'Sushi Enya website — join us',
    width: 1920,
    height: 1211
  }
];

const INFORMATION =
  'A full-width web experience for Sushi Enya, pairing bold typography with high-contrast photography. The layout moves guests through story, menu, and social proof—structured for clarity and a smooth path to order online across desktop and mobile.';

export const metadata = {
  title: 'Sushi Enya — Michael Kare',
  description: 'Web design case study for Sushi Enya restaurant.'
};

export default function SushiEnyaProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="sushi-enya-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <h1 id="sushi-enya-title" className={styles.projectTitle}>
                Sushi Enya
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

        <main className={styles.frames} aria-label="Sushi Enya design frames">
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
