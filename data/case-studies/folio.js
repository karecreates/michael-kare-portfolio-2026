const asset = (file) =>
  `/${['CASE STUDIES', 'Folio', file].map(encodeURIComponent).join('/')}`;

export const folioCaseStudy = {
  id: 'folio',
  slug: 'folio',
  title: 'Folio',
  label: 'Case Study',
  projectType: 'Product Design & Prototyping',
  description:
    'Folio is a portfolio-building concept designed to make professional self-presentation simpler. By bringing personal information, experience, and projects into one workflow, the product explores how individuals can create a customized online portfolio and an exportable résumé without starting from scratch.',
  disciplines: ['UI/UX', 'Product Design', 'Prototyping', 'Web Design'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Your work deserves a better introduction.',
      body: 'Building a personal portfolio often means juggling design tools, résumé builders, and multiple versions of the same information. Folio explores a more streamlined approach—one that brings experience, projects, and personal details together to create a cohesive professional presence.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      image: {
        src: asset('Folio_Cover.png'),
        alt: 'Folio wordmark in white on a vivid purple field',
        width: 1920,
        height: 1080,
        priority: true,
      },
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'split',
      spaceBefore: 'section',
      heading: "One place for everything you've done.",
      body: 'Folio is built around a straightforward idea: professional information should only need to be organized once. By bringing experience, skills, and projects into a shared workflow, the concept creates a foundation for multiple ways to present the same body of work.',
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'left',
      spaceBefore: 'section',
      heading: 'One profile. Two ways to present it.',
      body: 'The résumé experience explores how a single set of professional details can adapt to different presentation styles. Light and dark previews preserve structure and readability while giving individuals control over how their experience is presented and exported.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'follow',
      frame: 'wide',
      image: {
        src: asset('Folio_Dualscreen.png'),
        alt: 'Light and dark Folio résumé previews on a purple background, with PDF download and site preview controls',
        width: 1920,
        height: 1080,
      },
      caption: 'Flexible résumé previews designed for clarity, consistency, and export.',
    },
    {
      type: 'asymmetricMedia',
      spaceBefore: 'section',
      frame: 'wide',
      mediaSpan: 8,
      textSide: 'right',
      align: 'start',
      heading: 'From information to identity.',
      body: 'Beyond the résumé, Folio explores how the same professional information can take shape as a personal website. A clear hierarchy, structured project cards, and an understated visual system give individuals a place to showcase not just their experience, but the work behind it.',
      image: {
        src: asset('Folio_Mockup.png'),
        alt: 'Dark Folio portfolio page for a sample profile, with a biography and three featured project cards',
        width: 1920,
        height: 1080,
      },
    },
    {
      type: 'typographicInterlude',
      spaceBefore: 'section',
      heading: 'Less time building. More time being seen.',
      body: 'Folio brings portfolio creation and résumé presentation into a more unified concept. Instead of treating each output as a separate design task, the prototype explores a flexible system that helps individuals focus on the experience and work they want to communicate.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'section',
      frame: 'wide',
      image: {
        src: asset('Folio_Package.png'),
        alt: 'Folio brand lockup with light and dark résumé previews and the line You’ve done the work. We’ll make it look good.',
        width: 1920,
        height: 1080,
      },
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'left',
      spaceBefore: 'follow',
      body: 'Designed as a simpler way to share the work behind the individual, Folio brings personal portfolios and professional résumés into one cohesive experience.',
    },
  ],
};
