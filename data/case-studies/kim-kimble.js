const asset = (file) =>
  `/${['CASE STUDIES', 'Kim Kimble', file].map(encodeURIComponent).join('/')}`;

const walkthrough = {
  src: asset('kimkimble.mp4'),
  poster: asset('kimkimble-poster.jpg'),
  alt: 'Kim Kimble website walkthrough, from the salon studio hero through services, collections, and booking',
  width: 1920,
  height: 1090,
  autoPlay: true,
  muted: true,
  loop: true,
  seamless: true,
  lead: true,
  priority: true,
  preload: 'auto',
};

export const kimKimbleCaseStudy = {
  id: 'kim-kimble',
  slug: 'kim-kimble',
  title: 'Kim Kimble',
  label: 'Case Study',
  projectType: 'Web Design & E-Commerce',
  videoFirst: true,
  leadMedia: walkthrough,
  liveUrl: 'https://shopkimkimble.com/pages/salon',
  description:
    'A refined digital experience for Kim Kimble, bringing professional hair services, extensions, and salon booking into one cohesive destination. The website pairs striking beauty photography with a minimalist interface, balancing editorial elegance with intuitive navigation and commerce.',
  disciplines: ['Web Design', 'Web Development', 'UI/UX', 'E-Commerce'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Where beauty meets digital sophistication.',
      body: 'A seamless experience connecting salon services, appointment booking, and hair collections. Clean layouts, intuitive service menus, and thoughtfully organized content make it easy to explore treatments and discover the expertise behind the brand.',
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
      frame: 'wide',
      image: {
        src: asset('Kim_Kimble_Mock.png'),
        alt: 'Laptop mockup of a Kim Kimble product page, with black-and-white portrait photography and booking actions',
        width: 1920,
        height: 1080,
      },
      caption:
        'High-contrast black-and-white photography takes center stage, complemented by refined typography and generous negative space. The minimal design creates a sophisticated backdrop for the hair artistry while keeping service details, pricing, and booking actions clear and accessible.',
    },
  ],
};
