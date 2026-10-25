const asset = (file) =>
  `/${['CASE STUDIES', 'Gentle Release Care', file].map(encodeURIComponent).join('/')}`;

export const gentleReleaseCareCaseStudy = {
  id: 'gentle-release-care',
  slug: 'gentle-release-care',
  title: 'Gentle Release Care',
  label: 'Case Study',
  projectType: 'Healthcare Digital Experience',
  description:
    'A welcoming digital experience for a specialized dental practice. Combining accessible treatment information, authentic practice photography, and custom patient video testimonials, the project creates a thoughtful connection between advanced care and the people it serves.',
  disciplines: [
    'Web Design',
    'UI/UX',
    'Web Development',
    'Video Content',
    'Digital Storytelling',
  ],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'A gentler approach to digital healthcare.',
      body: 'Specialized healthcare deserves a digital experience that feels as approachable as the people behind it. Gentle Release Care brings treatment education, patient stories, and practice information together in a welcoming website designed to make finding and understanding care feel more intuitive.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      image: {
        src: asset('Gentle-Release-Mock.png'),
        alt: 'Laptop on a desk showing the Gentle Release Care website, with portrait video cards for Savannah and Taylor',
        width: 1920,
        height: 1080,
        priority: true,
      },
      caption:
        'A patient-centered website that brings specialized care and real experiences into focus.',
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'split',
      spaceBefore: 'section',
      heading: 'Care should feel clear from the first click.',
      body: 'The website brings together specialized clinical information and a more welcoming visual approach. Warm photography, clear navigation, and carefully structured content help patients explore services, understand treatment options, and connect with the practice.',
    },
    {
      type: 'scrollableScreenshot',
      spaceBefore: 'follow',
      image: {
        src: asset('Gentle_Release_Care_Website_Scroll.png'),
        alt: 'Full Gentle Release Care website, from laser and light therapy through patient stories, reviews, and practice information',
        width: 1920,
        height: 6026,
      },
      ariaLabel: 'Gentle Release Care website design',
    },
  ],
};
