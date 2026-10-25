import { siteData } from '@/data/siteData';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import EditorialHome from '@/components/EditorialHome';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <EditorialHome data={siteData} />
      </main>
      <Footer data={siteData.footer} showMarquee />
    </>
  );
}
