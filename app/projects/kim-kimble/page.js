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

const LIVE_URL = "https://shopkimkimble.com/pages/salon";

const TECH_PILLS = ["figma", "shopify"];

const FRAMES = [
  {
    src: "/placeholders/Michael_Portfolio_Images/Kim_Kim_Web_Development_1.png",
    alt: "Kim Kimble — website frame 1",
    width: 1920,
    height: 810,
  },
  {
    src: "/placeholders/Michael_Portfolio_Images/Kim_Kim_Web_Development_2.png",
    alt: "Kim Kimble — website frame 2",
    width: 1920,
    height: 912,
  },
];

const INFORMATION =
  "A Shopify salon experience for Kim Kimble that translates a celebrity hair brand into a high-touch retail story—services, products, and booking paths stay clear under bold photography. Layouts were explored in Figma before build, with responsive patterns that keep the salon narrative legible from hero to detail on every breakpoint.";

export const metadata = {
  title: "Kim Kimble — Michael Kare",
  description: "Web development case study — Kim Kimble salon on Shopify.",
};

export default function KimKimbleProjectPage() {
  const { footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.page}>
        <Header links={CASE_NAV} />
        <section className={styles.intro} aria-labelledby="kim-kimble-title">
          <div className={styles.introGrid}>
            <div className={styles.titleRow}>
              <h1 id="kim-kimble-title" className={styles.projectTitle}>
                Kim Kimble
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

        <main className={styles.frames} aria-label="Kim Kimble design frames">
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
