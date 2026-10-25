const asset = (file) =>
  `/${['CASE STUDIES', 'Solace', file].map(encodeURIComponent).join('/')}`;

export const solaceCaseStudy = {
  id: 'solace',
  slug: 'solace',
  title: 'Solace',
  label: 'Case Study',
  projectType: 'Brand Identity & Web Design',
  liveUrl: 'https://solace-landing-page-hero-assignment.webflow.io/',
  description:
    'A healthcare advocacy landing page concept designed to bring clarity and reassurance to families navigating complex care decisions. The work combines elegant typography, a calming visual identity, and human-centered imagery to create an approachable digital experience rooted in trust and empathy.',
  disciplines: ['Branding', 'Visual Identity', 'Web Design', 'UI/UX', 'Responsive Design'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Making room for peace of mind.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      image: {
        src: asset('Solace_logo_brand_1.png'),
        alt: 'Solace serif wordmark in white on a deep forest green field',
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
        src: asset('Solace_logo_brand_2.png'),
        alt: 'Solace serif wordmark in forest green on a soft sage field',
        width: 1920,
        height: 1080,
      },
      caption:
        'An elegant serif wordmark pairs delicate curves with expressive letterforms, creating an identity that feels both sophisticated and approachable. Deep forest green and soft sage establish a versatile visual language inspired by calm, balance, and reassurance.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'section',
      frame: 'wide',
      image: {
        src: asset('Solace_Mock.png'),
        alt: 'Desktop and mobile mockups of the Solace landing page hero, with editorial type and a portrait of an advocate',
        width: 1920,
        height: 1080,
      },
      caption:
        'A responsive landing page that puts human connection at the forefront. Oversized editorial typography, warm portraiture, and clear calls to action simplify the introduction to healthcare advocacy, creating an experience that feels personal, accessible, and reassuring across devices.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'section',
      frame: 'native',
      image: {
        src: asset('Solace_photography_inspo.png'),
        alt: 'A woman and an older woman sitting together on a sofa with coffee, sharing a candid conversation',
        width: 2889,
        height: 2673,
      },
      caption:
        'Candid, intergenerational photography brings warmth and authenticity to the visual direction. Natural expressions and everyday moments shift the focus away from clinical environments and toward the personal relationships at the heart of care.',
    },
  ],
};
