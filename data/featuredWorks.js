const asset = (file) =>
  `/${['FEATURED WORKS', file].map(encodeURIComponent).join('/')}`;

export const FEATURED_WORKS = [
  {
    id: 'sabio',
    title: 'Sabio',
    href: '/projects/sabio',
    image: asset('Sabio.png'),
    pills: ['Branding', 'Logo', 'UI/UX', 'Web Design'],
  },
  {
    id: 'knowi',
    title: 'Knowi',
    href: '/projects/knowi-ai',
    image: asset('Knowi.png'),
    pills: ['Branding', 'Logo', 'Video Animation', 'UI/UX'],
  },
  {
    id: 'sushi-enya',
    title: 'Sushi Enya',
    href: '/projects/sushi-enya',
    image: asset('Sushi Enya.png'),
    pills: ['Web Design', 'UI/UX'],
  },
  {
    id: 'beta-agency',
    title: 'Beta Agency',
    href: '/projects/beta-agency',
    image: asset('Beta Agency.png'),
    pills: ['Web Design', 'Web Development', 'Custom Code', 'UI/UX'],
  },
  {
    id: 'kim-kimble',
    title: 'Kim Kimble',
    href: '/projects/kim-kimble',
    image: asset('Kim_Kimble_Mockup.png'),
    pills: ['Web Design', 'Web Development', 'UI/UX'],
  },
  {
    id: 'solace',
    title: 'Solace',
    href: '/projects/solace',
    image: asset('Solace.png'),
    pills: ['Branding', 'Web Design', 'UI/UX'],
  },
  {
    id: 'teleidoscope',
    title: 'Teleidoscope',
    href: '/projects/teleidoscope',
    image: asset('Teleidoscope.png'),
    pills: ['Web Design', 'UI/UX'],
  },
  {
    id: 'omt',
    title: 'OMT',
    href: '/projects/omt-enterprises',
    image: asset('OMT Enterprises.png'),
    pills: ['Web Design', 'Web Development', 'Branding', 'Logo', 'UI/UX'],
  },
  {
    id: 'in2ai',
    title: 'in2ai',
    href: '/projects/in2ai-ai',
    image: asset('in2ai.png'),
    pills: [
      'Web Design',
      'Web Development',
      'Branding',
      'Logo',
      'Video Animation',
    ],
  },
  {
    id: 'folio',
    title: 'Folio',
    href: '/projects/folio',
    image: asset('Folio.png'),
    pills: ['UI/UX', 'Branding'],
  },
  {
    id: 'gentle-release-care',
    title: 'Gentle Release Care',
    href: '/projects/gentle-release-care',
    image: asset('Gentle Release Care.png'),
    pills: ['Web Design', 'Web Development'],
  },
  {
    id: 'jg-aquatics',
    title: 'JG Aquatics',
    href: '/projects/jg-aquatics',
    image: asset('JG Aquatics.png'),
    pills: ['Web Design', 'Web Development', 'Branding', 'Logo'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    href: '/projects/portfolio-website',
    image: asset('Portfolio.png'),
    pills: ['Web Design', 'Web Development', 'UI/UX'],
  },
  {
    id: 'smile-wellness',
    title: 'Smile Wellness',
    href: '/projects/smile-wellness',
    image: asset('Smile Wellness.png'),
    pills: ['Web Design'],
  },
  {
    id: 'joux',
    title: 'Joux',
    href: '/projects/joux',
    image: asset('Joux_Mockup.png'),
    pills: ['Web Design', 'Web Development', 'UI/UX'],
  },
];

/** The six projects shown on the homepage, in display order. */
export const HOME_FEATURED_IDS = ['beta-agency', 'in2ai', 'solace', 'sabio', 'omt', 'knowi'];

export const HOME_FEATURED_WORKS = HOME_FEATURED_IDS.map((id) =>
  FEATURED_WORKS.find((item) => item.id === id),
).filter(Boolean);

const normalise = (tag) => String(tag).toLowerCase().replace(/[^a-z0-9/]+/g, ' ').trim();

/** Loose match so "Logo Design" relates to "Logo" and "Web Design & Development" to both. */
const tagsOverlap = (a, b) => {
  const x = normalise(a);
  const y = normalise(b);
  return x === y || x.includes(y) || y.includes(x);
};

/**
 * Projects related to the current page, ranked by how many disciplines they
 * share with it (ties keep the featured order). Falls back to the next
 * featured projects so there are always `limit` cards.
 */
export function getRelatedWorks(currentHref, tags = [], limit = 3) {
  const current = FEATURED_WORKS.find((item) => item.href === currentHref);
  const wanted = [...new Set([...(current?.pills ?? []), ...tags])];
  const scored = FEATURED_WORKS.filter((item) => item.href !== currentHref).map((item, index) => ({
    item,
    index,
    score: wanted.reduce(
      (total, tag) => total + (item.pills.some((pill) => tagsOverlap(pill, tag)) ? 1 : 0),
      0,
    ),
  }));
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return scored.slice(0, limit).map(({ item }) => item);
}

export const FEATURED_FILTERS = [
  'All',
  'Web Design',
  'Web Development',
  'Branding',
  'Logo',
  'Video Animation',
  'Custom Code',
  'UI/UX',
];
