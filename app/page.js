import styles from './page.module.css';
import { siteData } from '@/data/siteData';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FocusSection from '@/components/FocusSection';
import ProjectGrid from '@/components/ProjectGrid';
import TechStackOrbit from '@/components/TechStackOrbit';
import CreativeWork from '@/components/CreativeWork';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { hero, projects, focusAreas, creativeWork, about, footer } = siteData;

  return (
    <>
      <SmoothScroll />
      <div className={styles.pageShell}>
        <Header />
        <main>
          <Hero data={hero} />

          <section id="work" className={styles.section}>
            <div className={`${styles.sectionIntro} ${styles.heroSectionIntro}`}>
              <span className={styles.year}>{hero.year}</span>
              <h2 className={styles.sectionTitle}>Portfolio</h2>
            </div>
            <ProjectGrid projects={projects} />
          </section>

          <TechStackOrbit />

          <FocusSection items={focusAreas} />

          <section id="profile" className={styles.section}>
            <AboutSection data={about} />
          </section>

          <section id="creative" className={styles.section}>
            <CreativeWork data={creativeWork} />
          </section>
        </main>
        <Footer data={footer} />
      </div>
    </>
  );
}
