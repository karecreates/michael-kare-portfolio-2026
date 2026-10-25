const asset = (file) =>
  `/${['CASE STUDIES', 'Sabio', file].map(encodeURIComponent).join('/')}`;

const walkthrough = {
  src: asset('scsitesting_ai_sequence.mp4'),
  poster: asset('scsitesting_ai_sequence-poster.jpg'),
  alt: 'SCSI Testing marketing sequence introducing Sabio, from the purple hero through language-testing services',
  width: 1920,
  height: 1080,
  autoPlay: true,
  muted: true,
  loop: true,
  seamless: true,
  preload: 'metadata',
};

const square = (file, alt) => ({
  src: asset(file),
  alt,
  width: 1440,
  height: 1233,
});

export const sabioCaseStudy = {
  id: 'sabio',
  slug: 'sabio',
  title: 'Sabio',
  label: 'Case Study',
  projectType: 'Brand Identity & Product Design',
  liveUrl: 'https://scsitesting.ai/',
  description:
    'A brand identity and digital product design exploration focused on modernizing the experience of online assessments. The work combines bold visual identity concepts with intuitive testing interfaces, transforming complex administrative workflows into clear, structured digital experiences.',
  disciplines: ['Branding', 'Logo Design', 'UI/UX', 'Web Design', 'Prototyping'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Making complex testing feel simple.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      image: {
        src: asset('sabio_case_study_1.png'),
        alt: 'Sabio wordmark in white on a deep purple gradient, with a small triangular mark',
        width: 1920,
        height: 1080,
        priority: true,
      },
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      frame: 'wide',
      image: {
        src: asset('sabio_case_study_4.png'),
        alt: 'Sabio logo explorations, from interconnected S marks to wordmark lockups in purple, white, and monochrome',
        width: 1920,
        height: 1080,
      },
      caption:
        'A contemporary identity built around fluid geometry, expressive typography, and a distinctive purple palette. Explorations of interconnected letterforms, dimensional gradients, and monochromatic variations establish a flexible visual language with a recognizable personality.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'section',
      frame: 'wide',
      image: {
        src: asset('sabio_case_study_2.png'),
        alt: 'Register Candidate screen with a rating-scale menu for CEFR, CLB, HSK, and other proficiency systems',
        width: 1920,
        height: 1080,
      },
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      frame: 'wide',
      image: {
        src: asset('sabio_case_study_3.png'),
        alt: 'Register Candidate step 1 of 4, with test administration fields on a soft purple field',
        width: 1920,
        height: 1080,
      },
      caption:
        'A streamlined interface for candidate registration and assessment configuration. Clear navigation, structured forms, and support for international proficiency rating scales bring clarity to the administrative side of language testing.',
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'left',
      spaceBefore: 'section',
      heading: 'From configuration to creation.',
      body: 'A guided four-step experience simplifies custom exam setup, taking users through test details, language selection, scenario environments, and specialized terminology. Progressive navigation and clearly defined inputs turn a detailed process into a more manageable workflow.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      video: walkthrough,
    },
    {
      type: 'pairedMedia',
      spaceBefore: 'media',
      frame: 'square',
      columns: ['1fr', '1fr'],
      images: [
        square(
          'sabio_case_study_5 (square).png',
          'Create a Test step 1, with company name, test name, and description fields'
        ),
        square(
          'sabio_case_study_6 (square).png',
          'Create a Test step 2, with language, test type, and created-by fields'
        ),
        square(
          'sabio_case_study_7 (square).png',
          'Create a Test step 3, with scenario background options such as courtroom, classroom, and hospital'
        ),
        square(
          'sabio_case_study_8 (square).png',
          'Create a Test step 4, with terminology and exam-creation instructions'
        ),
      ],
    },
  ],
};
