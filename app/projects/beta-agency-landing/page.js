import Image from 'next/image';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteData } from '@/data/siteData';
import styles from './page.module.css';

const CASE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const LIVE_URL = 'https://www.betaagency.com/westchester-village-presentation';

const TECH_PILLS = ['figma', 'webflow'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Beta_Agency_Landing_Web_Development_Frame_1.png',
    alt: 'Westchester Village presentation — frame 1',
    width: 1920,
    height: 714
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Beta_Agency_Landing_Web_Development_Frame_2.png',
    alt: 'Westchester Village presentation — frame 2',
    width: 1920,
    height: 678
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Beta_Agency_Landing_Web_Development_Frame_3.png',
    alt: 'Westchester Village presentation — frame 3',
    width: 1920,
    height: 772
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Beta_Agency_Landing_Web_Development_Frame_4.png',
    alt: 'Westchester Village presentation — frame 4',
    width: 1920,
    height: 938
  }
];

const INFORMATION =
  'A presentation-style landing for Westchester Village—designed in Figma and built in Webflow for Beta Agency. The page walks prospects through positioning, proof, and next steps with a calm editorial rhythm: strong typographic hierarchy, generous whitespace, and section breaks that read like slides without feeling like a deck. Built to load fast, scale cleanly, and hold up in live reviews.';

export const metadata = {
  title: 'Westchester Village — Michael Kare',
  description:
    'Westchester Village presentation landing — web design and development case study (Figma, Webflow).'
};

export default function BetaAgencyLandingProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="westchester-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="westchester-title" className={styles.projectTitle}>
                  Westchester Village
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
            <p className={styles.category}>Web design &amp; development</p>
            <p className={styles.infoLabel}>Information</p>
            <p className={styles.infoBody}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="Westchester Village design frames">
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
