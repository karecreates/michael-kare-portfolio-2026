const asset = (file) =>
  `/${['CASE STUDIES', 'JG Aquatics', file].map(encodeURIComponent).join('/')}`;

const walkthrough = {
  src: asset('jg_aquatics.mp4'),
  poster: asset('jg_aquatics-poster.jpg'),
  alt: 'JG Aquatics website, from the dusk hero through coaching formats to the inquiry close',
  width: 1920,
  height: 1000,
  autoPlay: true,
  muted: true,
  loop: true,
  seamless: true,
  lead: true,
  priority: true,
  preload: 'auto',
};

export const jgAquaticsCaseStudy = {
  id: 'jg-aquatics',
  slug: 'jg-aquatics',
  title: 'JG Aquatics',
  label: 'Case Study',
  projectType: 'Web Design & Development',
  videoFirst: true,
  leadMedia: walkthrough,
  description:
    'A website for a Westside swim and water polo practice. Dusk photography, a quiet navigation bar, and a direct inquire path give families a clear way to compare coaching formats.',
  disciplines: ['Web Design', 'Web Development', 'Branding', 'Logo'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'Built around the swimmer.',
      body: 'JG Aquatics opens on the pool at dusk, with premier coaching stated in one line. Navy type, a pale blue accent, and a floating bar for Home, About, Coaching, and Inquire keep that first view calm while the next step stays visible.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      frame: 'native',
      video: walkthrough,
      caption:
        'A pass through the full page: the dusk hero, the coaching formats, Jake’s background, and the closing invitation to get in the water.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      frame: 'wide',
      image: {
        src: asset('jg-aquatics-hero.png'),
        alt: 'JG Aquatics homepage at dusk, with lounge chairs, umbrellas, and the coaching headline over the pool',
        width: 1920,
        height: 1080,
        priority: true,
      },
      caption: 'The opening frame pairs the Westside pool at sunset with the practice’s coaching promise.',
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'right',
      spaceBefore: 'section',
      heading: 'Coaching, easy to compare.',
      body: 'Group, semi-private, private, and water polo each get a short description beside photography, so the difference between formats is visible before a family writes in.',
    },
    {
      type: 'editorialText',
      variant: 'section',
      placement: 'split',
      spaceBefore: 'section',
      heading: 'From the deck to a conversation.',
      body: 'The close returns to the water. A monogram, a short question, and a note that Jake follows up keep the inquiry as direct as the rest of the page.',
    },
    {
      type: 'fullBleedMedia',
      spaceBefore: 'media',
      frame: 'wide',
      image: {
        src: asset('jg-aquatics-footer.png'),
        alt: 'JG Aquatics inquiry close on a blue pool texture, with the monogram and a prompt to get in the water',
        width: 1920,
        height: 1080,
      },
    },
    {
      type: 'closingSpread',
      spaceBefore: 'chapter',
      heading: 'A practice, presented with the same clarity as the coaching.',
      body: 'Across the hero, the formats, and the final ask, photography, type, and the path to inquire stay in one calm system.',
    },
  ],
};
