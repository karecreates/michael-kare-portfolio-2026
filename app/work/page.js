import FeaturedWorks from '@/components/FeaturedWorks';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SmoothScroll from '@/components/SmoothScroll';
import WorkGlow from '@/components/WorkGlow';
import { siteData } from '@/data/siteData';
import styles from './page.module.css';

export const metadata = {
  title: 'Selected work — Michael Kare',
  description:
    'Web design, development, branding, and product work by Michael Kare — the full index of selected projects.',
};

export default function WorkPage() {
  return (
    <>
      <SmoothScroll />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        <WorkGlow />
        <FeaturedWorks id="work-index" heading="Selected work" headingTag="h1" align="center" />
      </main>
      <Footer data={siteData.footer} />
    </>
  );
}
