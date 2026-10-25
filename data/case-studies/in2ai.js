const asset = (file) =>
  `/${['CASE STUDIES', 'in2ai', file].map(encodeURIComponent).join('/')}`;

const promoVideo = {
  src: asset('in2ai_promo_video_4k (1080p).mp4'),
  alt: 'in2AI promotional film',
  width: 1920,
  height: 1080,
  autoPlay: true,
  muted: true,
  loop: true,
  seamless: true,
  lazy: true,
  preload: 'auto',
};

const webAnimation = {
  src: asset('A.I. web animation.mp4'),
  alt: 'in2AI web animation',
  width: 1920,
  height: 984,
  autoPlay: true,
  muted: true,
  loop: true,
  seamless: true,
  lazy: true,
  preload: 'auto',
};

export const in2aiCaseStudy = {
  id: 'in2ai-ai',
  slug: 'in2ai-ai',
  title: 'in2AI',
  label: 'Case Study',
  description:
    'in2AI explores the intersection of artificial intelligence, education, and specialized training. The project brings together a contemporary digital experience, intuitive product interfaces, and a cohesive visual identity designed to make complex technology feel more approachable.',
  disciplines: ['Web Design', 'UI/UX', 'Branding', 'Graphic Design'],
  year: '2025',
  client: 'in2AI',
  liveUrl: 'https://in2ai.ai',
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Making intelligence feel intuitive.',
      body: "Artificial intelligence can be complex. The experience surrounding it shouldn't be. The creative direction for in2AI balances a technology-forward visual identity with clarity, accessibility, and a consistent language across digital and physical applications.",
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      frame: 'wide',
      image: {
        src: asset('in2ai_case_study_1.png'),
        alt: 'in2AI marketing website with a dark canvas, electric blue graphic, and specialized AI messaging',
        width: 1920,
        height: 1080,
        priority: true,
      },
      caption:
        "A dark visual environment, expressive typography, and electric blue accents establish a confident first impression while giving the platform's specialized capabilities a clear place to live.",
    },
    {
      type: 'asymmetricMedia',
      spaceBefore: 'section',
      frame: 'wide',
      mediaSpan: 7,
      textSide: 'right',
      heading: 'Complex tools.\nClear experiences.',
      body: 'The product interface takes a lighter, more functional approach. Structured navigation, modular information cards, and clear visual hierarchy make courses, assignments, student progress, and performance data easier to navigate.',
      image: {
        src: asset('in2ai_case_study_2.png'),
        alt: 'in2AI educational dashboard with courses, homework, statistics, and progress indicators',
        width: 1920,
        height: 1080,
      },
    },
    {
      type: 'typographicInterlude',
      spaceBefore: 'section',
      heading: 'One identity. Multiple touchpoints.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      image: {
        src: asset('in2ai_case_study_3.png'),
        alt: 'Abstract blue and white in2AI brand composition',
        width: 1920,
        height: 1080,
      },
      note: 'Geometric forms, layered blue tones, and fluid digital imagery create a recognizable identity that moves naturally between product interfaces, communications, and branded environments.',
    },
    {
      type: 'pairedMedia',
      spaceBefore: 'section',
      frame: 'portrait',
      images: [
        {
          src: asset('in2ai_case_study_4 (vertical).png'),
          alt: 'Knowi continuing education promotional banner',
          width: 882,
          height: 2048,
        },
        {
          src: asset('in2ai_case_study_5 (vertical).png'),
          alt: 'Testing With Knowi promotional banner',
          width: 882,
          height: 2048,
        },
      ],
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      frame: 'square',
      image: {
        src: asset('in2ai_case_study_6 (square).png'),
        alt: 'in2AI roll-up banner stands in a physical presentation',
        width: 1920,
        height: 1654,
      },
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'right',
      spaceBefore: 'section',
      heading: 'Designed to exist beyond the screen.',
      body: 'Large-format graphics translate the brand into a physical setting, pairing clear messaging with recognizable visual elements to create a cohesive exhibition presence.',
    },
    {
      type: 'pairedMedia',
      spaceBefore: 'media',
      frame: 'square',
      images: [
        {
          src: asset('in2ai_case_study_7 (square).png'),
          alt: 'in2AI exhibition backdrop and branded counter mockup',
          width: 1920,
          height: 1440,
        },
        {
          src: asset('in2ai_case_study_8 (square).png'),
          alt: 'Flat artwork for the in2AI exhibition backdrop',
          width: 1920,
          height: 1424,
        },
      ],
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'split',
      spaceBefore: 'section',
      heading: 'An identity in motion.',
      body: "Motion offers another way to explore the brand's technology-led character, extending its visual language through movement and digital storytelling.",
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      frame: 'wide',
      video: promoVideo,
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'tight',
      frame: 'wide',
      video: webAnimation,
    },
    {
      type: 'closingSpread',
      spaceBefore: 'chapter',
      heading: 'A cohesive visual experience across every interaction.',
      body: 'From digital interfaces to promotional campaigns and physical displays, the work demonstrates how a consistent design language can bring clarity and character to a multifaceted technology brand.',
      image: {
        src: asset('white_logo (spin me).png'),
        alt: 'in2AI identity symbol',
        width: 1432,
        height: 1432,
        spin: true,
      },
    },
  ],
};
