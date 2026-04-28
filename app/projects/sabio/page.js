import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SabioVideo from "@/components/SabioVideo";
import { siteData } from "@/data/siteData";
import styles from "./page.module.css";
import ProjectBackToProjects from "@/components/ProjectBackToProjects";
import introLayoutStyles from "@/components/projectCaseIntro.module.css";

const CASE_NAV = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/#profile" },
  { label: "Contact", href: "/#contact" },
];

const TECH_PILLS = ["photoshop", "after effects", "fcpx"];

const INFORMATION =
  "Brand-forward motion for Sabio—cut as a continuous loop with rhythm, color, and atmosphere over chrome-free playback. Frames move from Photoshop and After Effects through Final Cut Pro for finishing, so the piece reads as one seamless animation at full width—built to hold attention without controls or interruption.";

export const metadata = {
  title: "Sabio — Michael Kare",
  description: "Video animation case study — Sabio brand experiences.",
};

export default function SabioProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="sabio-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="sabio-title" className={styles.projectTitle}>
                Sabio
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Tools">
              {TECH_PILLS.map((label) => (
                <li key={label} className={styles.techPill}>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.category}>Video Animation</p>
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

        <main className={styles.media} aria-label="Sabio motion">
          <SabioVideo />
        </main>

        <Footer data={footer} />
      </div>
    </>
  );
}
