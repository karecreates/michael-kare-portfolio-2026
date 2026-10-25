const asset = (file) =>
  `/${['CASE STUDIES', 'Portfolio', file].map(encodeURIComponent).join('/')}`;

const walkthrough = {
  src: asset('sami_portfolio.mp4'),
  poster: asset('sami_portfolio-poster.jpg'),
  alt: 'Samantha Block portfolio walkthrough, from the typographic hero through campaign work and motion',
  width: 1920,
  height: 994,
  autoPlay: true,
  muted: true,
  loop: true,
  seamless: true,
  lead: true,
  priority: true,
  preload: 'auto',
};

export const portfolioCaseStudy = {
  id: 'portfolio-website',
  slug: 'portfolio-website',
  title: 'Portfolio',
  label: 'Case Study',
  projectType: 'Web Design & Development',
  videoFirst: true,
  leadMedia: walkthrough,
  description:
    'A custom digital portfolio for brand marketing specialist Samantha Block, bringing creative campaigns, strategic thinking, and personal storytelling into one cohesive experience. The design pairs refined editorial typography with soft gradients, playful interactions, and a distinctive visual personality.',
  disciplines: ['Web Design', 'Web Development', 'UI/UX'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'A personal brand, brought to life online.',
      body: "An interactive portfolio experience that moves beyond the traditional résumé. Fluid transitions, curated campaign visuals, and thoughtful motion bring Samantha's creative work into focus, creating an engaging journey through her marketing experience.",
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'native',
      video: walkthrough,
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'section',
      frame: 'native',
      image: {
        src: asset('portfolio-hero.png'),
        alt: 'Samantha Block portfolio hero with oversized serif type, a soft blue field, and images embedded in the headline',
        width: 1905,
        height: 1080,
      },
      caption:
        'Oversized serif typography meets a soft blue palette and playful imagery embedded directly into the headline. The result is an expressive introduction that transforms a personal positioning statement into a memorable digital first impression.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'section',
      frame: 'wide',
      image: {
        src: asset('portfolio-mock.png'),
        alt: 'Laptop mockup of the Samantha Block portfolio hero on a pale surface',
        width: 1920,
        height: 1080,
      },
      caption:
        'A clean, considered presentation balances editorial elegance with approachable design. Generous negative space, subtle visual details, and a restrained interface let the content take center stage while maintaining a cohesive personal identity.',
    },
  ],
};
