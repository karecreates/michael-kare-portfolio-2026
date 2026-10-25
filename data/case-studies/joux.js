const asset = (file) =>
  `/${['CASE STUDIES', 'Joux', file].map(encodeURIComponent).join('/')}`;

const walkthrough = {
  src: asset('jouxart.mp4'),
  poster: asset('jouxart-poster.jpg'),
  alt: 'Joux website walkthrough, from the monochrome hero through mural galleries, shop, and commission paths',
  width: 1920,
  height: 1080,
  autoPlay: true,
  muted: true,
  loop: true,
  seamless: true,
  lead: true,
  priority: true,
  preload: 'auto',
};

export const jouxCaseStudy = {
  id: 'joux',
  slug: 'joux',
  title: 'Joux',
  label: 'Case Study',
  projectType: 'Web Design & E-Commerce',
  videoFirst: true,
  leadMedia: walkthrough,
  liveUrl: 'https://joux-co-artwork.myshopify.com/pages/about',
  description:
    "A digital portfolio and storefront for Joux, a multidisciplinary artist specializing in murals, graffiti, prints, and merchandise. The experience brings his distinctive creative identity online, combining bold visual storytelling with intuitive navigation, artwork discovery, and commission inquiries.",
  disciplines: ['Web Design', 'Web Development', 'E-Commerce', 'UI/UX'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Art that goes beyond the canvas.',
      body: "Built to let the artwork speak for itself. An immersive digital experience pairs vibrant mural galleries with a restrained interface, connecting the artist's story, creative portfolio, and custom commissions in one cohesive destination.",
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      video: walkthrough,
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'section',
      frame: 'wide',
      image: {
        src: asset('Joux_mockup.png'),
        alt: 'Laptop mockup of the Joux homepage, with a monochrome portrait, teal backdrop, and Get a Quote action',
        width: 1920,
        height: 1080,
      },
      caption:
        "A striking monochromatic portrait, atmospheric teal backdrop, and expressive typography establish the artist's identity from the first impression. Clean navigation and subtle turquoise accents create a balance between creative expression and functional design.",
    },
  ],
};
