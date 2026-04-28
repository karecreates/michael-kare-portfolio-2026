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

const TECH_PILLS = ["figma"];

const FRAMES = [
  {
    src: "/placeholders/Michael_Portfolio_Images/in2ai_Web_Design_Frame_1.png",
    alt: "in2ai.ai — website frame 1",
    width: 1920,
    height: 1080,
  },
  {
    src: "/placeholders/Michael_Portfolio_Images/in2ai_dashboard.png",
    alt: "in2ai.ai — categories, partners, and branding",
    width: 1920,
    height: 1080,
  },
  {
    src: "/placeholders/Michael_Portfolio_Images/in2ai_Web_Design_Frame_2.png",
    alt: "in2ai.ai — website frame 2",
    width: 3840,
    height: 2160,
  },
];

const INFORMATION =
  "A marketing web experience for in2ai.ai that distills a complex AI education story into confident, editorial layouts. The system was modeled end-to-end in Figma—typography, spacing, and component logic stay consistent across hero, proof, and conversion—so messaging about curriculum depth and outcomes reads clearly before a visitor ever reaches a form or CTA.";

export const metadata = {
  title: "in2ai.ai — Michael Kare",
  description: "Web design case study — in2ai.ai.",
};

export default function In2aiAiProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="in2ai-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="in2ai-title" className={styles.projectTitle}>
                in2ai.ai
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

        <main className={styles.frames} aria-label="in2ai.ai design frames">
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
