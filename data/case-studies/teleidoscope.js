const asset = (file) =>
  `/${['CASE STUDIES', 'Teleidoscope', file].map(encodeURIComponent).join('/')}`;

export const teleidoscopeCaseStudy = {
  id: 'teleidoscope',
  slug: 'teleidoscope',
  title: 'Teleidoscope',
  label: 'Case Study',
  projectType: 'Web Design & Digital Experience',
  description:
    'A technology-focused digital experience for Teleidoscope, a company specializing in advanced visual tracking software. The website translates complex computer vision capabilities into a compelling visual narrative through cinematic imagery, bold typography, and a streamlined presentation of its technology.',
  disciplines: ['Web Design', 'UI/UX', 'Digital Experience'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Precision, brought into focus.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      image: {
        src: asset('Teleidoscope_Design.png'),
        alt: 'Laptop mockup of the Teleidoscope hero, with an airplane silhouette against storm clouds and electric-blue actions',
        width: 1920,
        height: 1080,
        priority: true,
      },
      caption:
        "A dramatic aviation-inspired hero establishes the brand's technological focus. Atmospheric imagery, minimal navigation, and electric-blue accents create a striking first impression that reflects the precision and sophistication of the technology.",
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'left',
      spaceBefore: 'section',
      heading: 'Making advanced technology easier to explore.',
      body: 'A visually driven interface transforms complex tracking capabilities into an accessible digital experience. High-contrast layouts, real-world detection imagery, and structured demonstrations of the proprietary RAD model bring clarity to the technology while maintaining a bold, contemporary aesthetic.',
    },
    {
      type: 'scrollableScreenshot',
      spaceBefore: 'follow',
      image: {
        src: asset('Teleidoscope_Figma_Frame_Full.png'),
        alt: 'Full Teleidoscope website, from Track with Confidence through solutions, the RAD model, and a closing aviation hero',
        width: 1920,
        height: 6858,
      },
      ariaLabel: 'Teleidoscope website design',
    },
  ],
};
