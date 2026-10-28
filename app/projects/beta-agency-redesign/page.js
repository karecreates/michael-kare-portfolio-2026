import Image from "next/image";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BetaAgencyRedesignVideo from "@/components/BetaAgencyRedesignVideo";
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

const TECH_PILLS = ["figma"];

const FRAME_DIR = "/placeholders/Michael_Portfolio_Images/Beta_Website_Frame_";

const WEBSITE_FRAMES = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1;
  return {
    src: `${FRAME_DIR}${n}.png`,
    alt: `Beta Agency homepage redesign — frame ${n} of 9`,
    width: 1920,
    height: 1080,
  };
});

const INFORMATION =
  "A homepage redesign concept for Beta Agency—structured in Figma as a single, confident narrative: clear positioning, proof-forward modules, and typography that reads like a studio site rather than a generic agency template. Motion in the deliverable is used sparingly to guide the eye and reinforce hierarchy, so stakeholders can review the full scroll rhythm without UI chrome or playback controls—just the work, looped for study and presentation.";

export const metadata = {
  title: "Beta Agency Redesign — Michael Kare",
  description:
    "Web design case study — Beta Agency homepage redesign (Figma, motion preview).",
};

export default function BetaAgencyRedesignProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="beta-redesign-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="beta-redesign-title" className={styles.projectTitle}>
                Beta Agency Redesign
              </h1>
            </div>
            <ul className={styles.techPills} aria-label="Tools">
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

        <main className={styles.media} aria-label="Beta Agency redesign work">
          <BetaAgencyRedesignVideo />
          {WEBSITE_FRAMES.slice(1).map((frame, index) => (
            <figure key={frame.src} className={styles.frame}>
              <Image
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                sizes="(max-width: 900px) calc(100vw - 28px), calc(100vw - 40px)"
                className={styles.frameImage}
                priority={index < 2}
              />
            </figure>
          ))}
        </main>

        <ProjectOutro current="/projects/beta-agency-redesign" tags={["Web Design", "UI/UX"]} />
        <Footer data={footer} />
      </div>
    </>
  );
}
