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

const LIVE_URL = 'https://treespoonz.com/';

const TECH_PILLS = ['shopify', 'photoshop'];

const FRAMES = [
  {
    src: '/placeholders/Michael_Portfolio_Images/Treespoonz_Web_Development_Frame_1.png',
    alt: 'TreeSpoonz — website frame 1',
    width: 1920,
    height: 999
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Treespoonz_Web_Development_Frame_2.png',
    alt: 'TreeSpoonz — website frame 2',
    width: 1920,
    height: 999
  },
  {
    src: '/placeholders/Michael_Portfolio_Images/Treespoonz_Web_Development_Frame_3.png',
    alt: 'TreeSpoonz — website frame 3',
    width: 1920,
    height: 999
  }
];

const INFORMATION =
  'A Shopify build for Tree Spoonz Co that pairs crisp product merchandising with shipping clarity and the founders’ story. Hero and PDP moments feature a 3D realistic render of the Tree Spoonz product—crafted in Photoshop as a high-fidelity composite—so material, scale, and finish read before a shopper adds to cart, while Shopify handles variants, subscription copy, and a mobile-first checkout path.';

export const metadata = {
  title: 'TreeSpoonz — Michael Kare',
  description: 'Web development and product design case study — Tree Spoonz Co on Shopify.'
};

export default function TreespoonzProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="treespoonz-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="treespoonz-title" className={styles.projectTitle}>
                  TreeSpoonz
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
            <p className={styles.category}>Web Development &amp; Product Design</p>
            <p className={styles.infoLabel}>Information</p>
            <p className={styles.infoBody}>{INFORMATION}</p>
          </div>
        </section>

        <main className={styles.frames} aria-label="TreeSpoonz design frames">
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
