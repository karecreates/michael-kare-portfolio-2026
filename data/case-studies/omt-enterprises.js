const asset = (file) =>
  `/${['CASE STUDIES', 'OMT Enterprises', file].map(encodeURIComponent).join('/')}`;

export const omtEnterprisesCaseStudy = {
  id: 'omt-enterprises',
  slug: 'omt-enterprises',
  title: 'OMT Enterprises',
  label: 'Case Study',
  projectType: 'Branding & Digital Experience',
  liveUrl: 'https://omtenterprises.com/',
  description:
    'A visual identity and digital experience for OMT Enterprises, showcasing product development and a diverse collection of home, office, and lifestyle goods. The project combines a versatile Loui Michel Cie identity with clean, product-focused web design and a refined visual language.',
  disciplines: ['Branding', 'Logo', 'Web Design', 'UI/UX', 'Web Development'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Bringing everyday products into focus.',
      body: 'A contemporary digital experience that balances product discovery with brand storytelling. Layered imagery, spacious layouts, and deep teal accents create a cohesive environment for showcasing product collections and the brands behind them.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      image: {
        src: asset('BRANDING_MOCKUP.png'),
        alt: 'OMT Enterprises digital mockups on a teal field, with product pages, client logos, and the Loui Michel Cie mark',
        width: 1920,
        height: 1080,
        priority: true,
      },
    },
    {
      type: 'pairedMedia',
      spaceBefore: 'section',
      frame: 'square',
      columns: ['1fr', '1fr', '1fr'],
      images: [
        {
          src: asset('Frame 1321314649.png'),
          alt: 'Loui Michel Cie monogram in teal and ink on white',
          width: 1000,
          height: 1000,
        },
        {
          src: asset('Frame 1321314650.png'),
          alt: 'Loui Michel Cie monogram in white on black',
          width: 1000,
          height: 1000,
        },
        {
          src: asset('Frame 1321314651.png'),
          alt: 'Loui Michel Cie monogram in a metallic silver finish on black',
          width: 1000,
          height: 1000,
        },
      ],
      caption:
        'A distinctive monogram built around the letterforms of Loui Michel Cie. Its interlocking geometry and rounded edges create a recognizable mark, while teal gradients, monochrome, and metallic finishes demonstrate its versatility across different applications.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'section',
      frame: 'wide',
      image: {
        src: asset('OMT_laptop_mockup.png'),
        alt: 'Laptop mockup of the OMT Enterprises homepage, with a serving tray still life and Welcome to OMT',
        width: 1920,
        height: 1080,
      },
      caption:
        'An inviting storefront that places everyday products within a more aspirational lifestyle setting. Warm photography, understated typography, and intuitive navigation bring a sense of simplicity and refinement to the shopping experience.',
    },
  ],
};
