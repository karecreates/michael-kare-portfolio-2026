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

const TECH_PILLS = ["Figma"];

const FRAMES = [
  {
    src: "/placeholders/Michael_Portfolio_Images/Cove_Website_Frame_1.png",
    alt: "Cove USA — website frame 1",
    width: 1920,
    height: 1080,
  },
  {
    src: "/placeholders/Michael_Portfolio_Images/Cove_Website_Frame_2.png",
    alt: "Cove USA — website frame 2",
    width: 1920,
    height: 1080,
  },
  {
    src: "/placeholders/Michael_Portfolio_Images/Cove_Website_Frame_3.png",
    alt: "Cove USA — website frame 3",
    width: 1920,
    height: 1080,
  },
];

const INFORMATION =
  "Cove USA is a web design exploration focused on clarity, trust, and a calm editorial rhythm suited to a modern lifestyle brand. In Figma, the experience was structured around generous whitespace, restrained typography, and purposeful imagery so messaging and calls to action read quickly on any device. The layouts progress from a strong hero and value narrative through supporting detail and conversion-oriented sections—balancing brand warmth with the discipline expected of a production-ready site system.";

export const metadata = {
  title: "Cove USA — Michael Kare",
  description:
    "Web design case study — Cove USA: Figma-led layouts, frames 1–3, and a refined digital presentation.",
};

export default function CoveUsaProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="cove-usa-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="cove-usa-title" className={styles.projectTitle}>
                Cove USA
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Web Design</p>
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

        <main className={styles.frames} aria-label="Cove USA design frames">
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
