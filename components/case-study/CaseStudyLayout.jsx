import CaseStudyDocument from './CaseStudyDocument';
import CaseStudyGallery from './CaseStudyGallery';
import CaseStudySidebar from './CaseStudySidebar';
import RelatedProjects from '@/components/RelatedProjects';
import styles from './CaseStudyLayout.module.css';

export default function CaseStudyLayout({ study }) {
  if (!study) return null;

  return (
    <article id="top" className={styles.page}>
      <CaseStudyDocument />
      <div className={styles.grid}>
        <div className={styles.sidebarSlot}>
          <CaseStudySidebar study={study} />
        </div>
        <div className={styles.gallerySlot}>
          <CaseStudyGallery gallery={study.gallery} />
        </div>
      </div>
      <div className={styles.outro}>
        <RelatedProjects currentHref={`/projects/${study.slug}`} tags={study.disciplines} />
      </div>
    </article>
  );
}
