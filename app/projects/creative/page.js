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

const TECH_PILLS = ["photography", "motion", "creative direction"];

const HERO_ITEM = {
  src: "/placeholders/Michael_Portfolio_Images/Creative_1.png",
  alt: "Creative showcase hero image",
  width: 3840,
  height: 2160,
};

const BOTTOM_FULL_WIDTH_ITEM = {
  src: "/placeholders/Michael_Portfolio_Images/Creative_7.png",
  alt: "Creative 7 full-width image",
  width: 3840,
  height: 2160,
};

const GRID_ITEMS = [
  {
    type: "video",
    src: "/placeholders/Michael_Portfolio_Images/Creative_2.mp4",
    title: "Creative 2",
    ariaLabel: "Creative 2 video — autoplaying and looping",
  },
  {
    type: "image",
    src: "/placeholders/Michael_Portfolio_Images/Creative_3.png",
    alt: "Creative 3 image",
    width: 3000,
    height: 3000,
    title: "Creative 3",
  },
  {
    type: "image",
    src: "/placeholders/Michael_Portfolio_Images/Creative_4.png",
    alt: "Creative 4 image",
    width: 3000,
    height: 3000,
    title: "Creative 4",
  },
  {
    type: "image",
    src: "/placeholders/Michael_Portfolio_Images/Creative_5.png",
    alt: "Creative 5 image",
    width: 3000,
    height: 3000,
    title: "Creative 5",
  },
  {
    type: "image",
    src: "/placeholders/Michael_Portfolio_Images/Creative_6.png",
    alt: "Creative 6 image",
    width: 3000,
    height: 3000,
    title: "Creative 6",
  },
  {
    type: "image",
    src: "/placeholders/Michael_Portfolio_Images/Creative_8.png",
    alt: "Creative 8 image",
    width: 3000,
    height: 3000,
    title: "Creative 8",
  },
];

const INFORMATION =
  "A focused collection of visual experiments across still and motion. The layout is intentionally minimal: one cinematic opener followed by a clean square grid that keeps composition and rhythm consistent across desktop and mobile.";

export const metadata = {
  title: "Creative Work — Michael Kare",
  description: "Creative work showcase featuring photography and motion.",
};

export default function CreativeProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="creative-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="creative-title" className={styles.projectTitle}>
                Creative Work
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Creative disciplines">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Photography &amp; Motion</p>
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

        <main className={styles.media} aria-label="Creative work media gallery">
          <figure className={styles.hero}>
            <Image
              src={HERO_ITEM.src}
              alt={HERO_ITEM.alt}
              width={HERO_ITEM.width}
              height={HERO_ITEM.height}
              sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
              className={styles.heroImage}
              priority
            />
          </figure>

          <section className={styles.grid} aria-label="Creative media grid">
            {GRID_ITEMS.map((item, index) => (
              <figure key={item.src} className={styles.gridItem}>
                {item.type === "video" ? (
                  <video
                    className={styles.gridVideo}
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload={index === 0 ? "auto" : "metadata"}
                    disablePictureInPicture
                    aria-label={item.ariaLabel}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 700px) calc(100vw - 28px), calc((100vw - 50px) / 2)"
                    className={styles.gridImage}
                    priority={index < 2}
                  />
                )}
              </figure>
            ))}
          </section>

          <figure className={styles.hero}>
            <Image
              src={BOTTOM_FULL_WIDTH_ITEM.src}
              alt={BOTTOM_FULL_WIDTH_ITEM.alt}
              width={BOTTOM_FULL_WIDTH_ITEM.width}
              height={BOTTOM_FULL_WIDTH_ITEM.height}
              sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
              className={styles.heroImage}
            />
          </figure>
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
