import CaseStudyLayout from '@/components/case-study/CaseStudyLayout';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SmoothScroll from '@/components/SmoothScroll';
import { getCaseStudy } from '@/data/caseStudies';
import { siteData } from '@/data/siteData';

const CASE_NAV = [
  { href: '/', label: 'Home' },
  { href: '/#profile', label: 'Profile' },
  { href: '/#contact', label: 'Contact' },
];

const study = getCaseStudy('in2ai-ai');

export const metadata = {
  title: `${study.title} — Michael Kare`,
  description: study.description,
};

export default function In2aiCaseStudyPage() {
  return (
    <>
      <SmoothScroll />
      <Header links={CASE_NAV} />
      <main>
        <CaseStudyLayout study={study} />
      </main>
      <Footer data={siteData.footer} />
    </>
  );
}
