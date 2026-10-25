import Image from "next/image";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteData";
import styles from "./page.module.css";
import ProjectBackToProjects from "@/components/ProjectBackToProjects";
import introLayoutStyles from "@/components/projectCaseIntro.module.css";

const CASE_NAV = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/#profile" },
  { label: "Contact", href: "/#contact" },
];

const TECH_PILLS = ["react", "google maps", "brandfetch"];

const FRAMES = [
  {
    src: "/editorial/interative_hero.png",
    alt: "Interactive Mapping — Abbot Kinney trade-area dashboard with brand mix and storefronts",
    width: 1920,
    height: 1080,
  },
  {
    src: "/editorial/interactive_mapping_2.png",
    alt: "Interactive Mapping — Google Map with Brandfetch logos placed on tenant locations",
    width: 3420,
    height: 1848,
  },
];

const INFORMATION =
  "An automated mapping product that places real retailers on Google Maps and pulls brand marks through Brandfetch—so a corridor like Abbot Kinney reads as a living tenant mix instead of a pin soup. Street photography and trade-area stats sit beside a logo-first map: occupancy, vacancies, and brand presence at a glance. The system was built to scale across high streets without hand-placing every mark, turning location data into a brief a leasing or strategy team can actually use.";

export const metadata = {
  title: "Interactive Mapping — Michael Kare",
  description:
    "Product case study — automated mapping with the Google Maps API and Brandfetch logos.",
};

export default function InteractiveMappingProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section
          className={styles.intro}
          aria-labelledby="interactive-mapping-title"
        >
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="interactive-mapping-title" className={styles.projectTitle}>
                Interactive Mapping
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Product Development</p>
            <div
              className={`${introLayoutStyles.introStack} ${styles.introMeta}`}
            >
              <p
                className={`${styles.infoLabel} ${introLayoutStyles.introLabel}`}
              >
                Information
              </p>
              <p
                className={`${styles.infoBody} ${introLayoutStyles.infoBodyStretch}`}
              >
                {INFORMATION}
              </p>
            </div>
            <div
              className={`${introLayoutStyles.introActions} ${styles.introCtaBar}`}
            >
              <div className={introLayoutStyles.introBack}>
                <ProjectBackToProjects />
              </div>
            </div>
          </div>
        </section>

        <main
          className={styles.frames}
          aria-label="Interactive Mapping design frames"
        >
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
