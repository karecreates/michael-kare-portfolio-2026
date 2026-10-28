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

const TECH_PILLS = ["adobe illustrator", "photoshop"];

const FRAMES = [
  {
    src: "/placeholders/Michael_Portfolio_Images/SCSI_Branding_Frame_1.png",
    alt: "SCSI Testing — branding frame 1",
    width: 1920,
    height: 1080,
  },
  {
    src: "/placeholders/Michael_Portfolio_Images/SCSI_Branding_Frame_2.png",
    alt: "SCSI Testing — branding frame 2",
    width: 1920,
    height: 1080,
  },
];

const INFORMATION =
  "A print-forward identity package for SCSI Testing—built to read as engineering-grade and approachable at once. Lockups, marks, and supporting layouts were drafted in Adobe Illustrator for razor-sharp vector control, then finished and proofed in Photoshop for texture, contrast, and real-world mockups. The system is meant to travel: business cards, collateral, and digital avatars all inherit the same grid, weight, and color discipline so the brand feels consistent whether it is in a wallet or on a conference badge.";

export const metadata = {
  title: "SCSI Testing — Branding — Michael Kare",
  description: "Branding case study — SCSI Testing identity and collateral.",
};

export default function ScsiBrandingProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="scsi-branding-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="scsi-branding-title" className={styles.projectTitle}>
                SCSI Testing
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Technologies">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Branding</p>
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
          aria-label="SCSI Testing branding frames"
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

        <ProjectOutro current="/projects/scsi-branding" tags={["Branding", "Logo"]} />
        <Footer data={footer} />
      </div>
    </>
  );
}
