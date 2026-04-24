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

const TECH_PILLS = ['figma'];

const BRAND_GUIDELINES_PDF =
  '/placeholders/Michael_Portfolio_Images/Knowi_AI_SaaS_Brand_Guidelines.pdf';

const BRAND_GUIDELINES_COVER = {
  src: '/placeholders/Michael_Portfolio_Images/Knowi_AI_SaaS_Brand_Guidelines_Cover_Page.png',
  alt: 'Knowi AI SaaS brand guidelines — cover',
  width: 1920,
  height: 1081
};

const FRAME_WIDTH = 430;
const FRAME_HEIGHT = 932;

const FRAMES = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  return {
    src: `/placeholders/Michael_Portfolio_Images/Knowi_iphone_frame_${n}.png`,
    alt: `Know App — UI/UX frame ${n}`,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT
  };
});

const INFORMATION =
  'A high-fidelity mobile prototype for the Know App—Knowi’s companion experience for exploring data and workflows on the go. The entire surface was authored in Figma as a connected system: reusable components, responsive variants, and interaction notes that mirror production constraints, so flows from discovery through detail read as a real product, not a static deck. The result is prototype-grade UI/UX you can walk stakeholders through with confidence—clear hierarchy, deliberate motion cues, and a visual language that stays aligned with the core Knowi brand.';

export const metadata = {
  title: 'Know App Prototype — Michael Kare',
  description: 'UI/UX app prototyping case study — Know App in Figma.'
};

export default function KnowAppPrototypePage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="know-app-title">
          <div className={styles.introGrid}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 id="know-app-title" className={styles.projectTitle}>
                  Know App Prototype
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
            <p className={styles.category}>UI/UX App Prototyping</p>
            <p className={styles.infoLabel}>Information</p>
            <p className={styles.infoBody}>{INFORMATION}</p>
          </div>
        </section>

        <section className={styles.brandGuidelines} aria-label="Brand guidelines">
          <a
            href={BRAND_GUIDELINES_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.brandCoverLink}
          >
            <Image
              src={BRAND_GUIDELINES_COVER.src}
              alt={BRAND_GUIDELINES_COVER.alt}
              width={BRAND_GUIDELINES_COVER.width}
              height={BRAND_GUIDELINES_COVER.height}
              sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
              className={styles.brandCoverImage}
              priority
            />
          </a>
        </section>

        <main className={styles.frames} aria-label="Know App UI/UX frames">
          {FRAMES.map((frame, index) => (
            <figure key={frame.src} className={styles.frame}>
              <Image
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                sizes="(max-width: 520px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className={styles.frameImage}
                priority={index < 4}
              />
            </figure>
          ))}
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
