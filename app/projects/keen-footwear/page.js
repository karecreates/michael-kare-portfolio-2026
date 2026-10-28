import Image from "next/image";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteData";
import styles from "./page.module.css";
import ProjectBackToProjects from "@/components/ProjectBackToProjects";
import ProjectOutro from "@/components/ProjectOutro";
import introLayoutStyles from "@/components/projectCaseIntro.module.css";

const CASE_NAV = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/#profile" },
  { label: "Contact", href: "/#contact" },
];

const TECH_PILLS = ["react", "google maps"];

const FRAMES = [
  {
    src: "/editorial/keen_1.png",
    alt: "Keen Footwear — Washington ZIP choropleth shaded by ecommerce spend",
    width: 1920,
    height: 1080,
  },
  {
    src: "/editorial/keen_2.png",
    alt: "Keen Footwear — Redmond ZIP 98052 detail with spend and penetration metrics",
    width: 1920,
    height: 1080,
  },
];

const INFORMATION =
  "A shaded map of Keen Footwear demand across Washington ZIP codes, bucketed by income and spend so high-value outdoor and performance shoppers surface immediately. Layers toggle ecommerce dollars, state share, and local penetration; a ZIP search opens population, customers, and volume for a single market—Redmond, for example—so the team could point media and retail at neighborhoods where spend already concentrates instead of spraying the whole state.";

export const metadata = {
  title: "Keen Footwear — Michael Kare",
  description:
    "Data visualization case study — Keen Footwear income and spend mapping for target markets.",
};

export default function KeenFootwearProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="keen-footwear-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="keen-footwear-title" className={styles.projectTitle}>
                Keen Footwear
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Data Visualization</p>
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

        <main className={styles.frames} aria-label="Keen Footwear design frames">
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

        <ProjectOutro current="/projects/keen-footwear" tags={["Web Development", "Custom Code"]} />
        <Footer data={footer} />
      </div>
    </>
  );
}
