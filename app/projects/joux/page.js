import Image from "next/image";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteData";
import styles from "./page.module.css";
import ProjectBackToProjects from "@/components/ProjectBackToProjects";
import ProjectLiveLink from "@/components/ProjectLiveLink";
import introLayoutStyles from "@/components/projectCaseIntro.module.css";

const CASE_NAV = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/#profile" },
  { label: "Contact", href: "/#contact" },
];

const LIVE_URL = "https://www.jouxart.com/pages/about";

const TECH_PILLS = ["figma", "shopify"];

const FRAMES = [
  {
    src: "/placeholders/Michael_Portfolio_Images/Joux_Web_Design_Development_Frame_1.png",
    alt: "Joux — website frame 1",
    width: 1920,
    height: 1098,
  },
  {
    src: "/placeholders/Michael_Portfolio_Images/Joux_Web_Design_Development_Frame_2.png",
    alt: "Joux — website frame 2",
    width: 1920,
    height: 991,
  },
];

const INFORMATION =
  "A Shopify build for Joux Co Artwork that carries a street-art and mural practice into a polished commerce experience. Systems were mapped in Figma before development—balancing portfolio storytelling, shop paths, and a generous About page so fans can connect with the artist’s journey and move from inspiration to checkout without friction.";

export const metadata = {
  title: "Joux — Michael Kare",
  description:
    "Web design and development case study — Joux Co Artwork on Shopify.",
};

export default function JouxProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="joux-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="joux-title" className={styles.projectTitle}>
                Joux
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Web Design &amp; Development</p>
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
              <ProjectLiveLink
                href={LIVE_URL}
                className={introLayoutStyles.introLive}
              />
            </div>
          </div>
        </section>

        <main className={styles.frames} aria-label="Joux design frames">
          {FRAMES.map((frame) => (
            <figure key={frame.src} className={styles.frame}>
              <Image
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
                className={styles.frameImage}
                priority={frame.src.endsWith("Frame_1.png")}
              />
            </figure>
          ))}
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
