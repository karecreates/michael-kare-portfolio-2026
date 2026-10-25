const asset = (file) =>
  `/${['CASE STUDIES', 'Sushi Enya', file].map(encodeURIComponent).join('/')}`;

export const sushiEnyaCaseStudy = {
  id: 'sushi-enya',
  slug: 'sushi-enya',
  title: 'Sushi Enya',
  label: 'Case Study',
  projectType: 'Web Design & Digital Experience',
  description:
    "An immersive digital experience for Sushi Enya, capturing the artistry and atmosphere of Japanese dining. The design combines dramatic food photography, expressive typography, and cinematic storytelling to create a sophisticated online presence that celebrates the restaurant's culinary identity.",
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
      heading: 'A feast for the eyes, before the first bite.',
      body: 'A cinematic journey through Japanese cuisine, where oversized editorial typography, immersive food imagery, and fluid transitions bring the dining experience to life. Every interaction is designed to reflect the artistry and attention to detail behind the menu.',
    },
    {
      type: 'scrollableScreenshot',
      spaceBefore: 'follow',
      image: {
        src: asset('Sushi_Enya_Figma_Frame_Full.png'),
        alt: 'Full Sushi Enya website, from the nigiri hero through story, menu, reviews, and reservations',
        width: 1920,
        height: 8910,
      },
      ariaLabel: 'Sushi Enya website design',
      caption:
        'A striking visual narrative moves from intimate culinary storytelling to beautifully presented nigiri, sashimi, and sushi. High-contrast compositions and elegant typography establish a distinct atmosphere, while menu exploration, guest reviews, and streamlined ordering create a seamless experience beyond the visuals.',
    },
  ],
};
