const asset = (file) =>
  `/${['CASE STUDIES', 'Knowi', file].map(encodeURIComponent).join('/')}`;

const screen = (n, alt, extras = {}) => ({
  src: asset(`iPhone 14 & 15 Pro Max - ${n}.png`),
  alt,
  width: 430,
  height: 932,
  ...extras,
});

export const knowiCaseStudy = {
  id: 'knowi-ai',
  slug: 'knowi-ai',
  title: 'Knowi',
  label: 'Case Study',
  projectType: 'Mobile App Design & Prototyping',
  description:
    'A mobile learning concept designed to make continuing education more accessible for professional interpreters. Knowi combines AI-supported training, interactive exercises, and progress tracking in an intuitive experience that brings specialized learning into one place.',
  disciplines: ['UI/UX', 'Mobile App Design', 'Product Design', 'Prototyping'],
  cta: {
    label: "Let's Talk",
    href: 'mailto:karecreates@gmail.com',
  },
  gallery: [
    {
      type: 'editorialSpread',
      variant: 'feature',
      spaceBefore: 'intro',
      heading: 'A smarter way to stay in practice.',
    },
    {
      type: 'phoneShowcase',
      spaceBefore: 'follow',
      heading: 'Learning starts with a friendly introduction.',
      body: 'A playful robot mascot, vibrant purple gradients, and simplified account flows establish an approachable identity, making a specialized educational platform feel intuitive from the very first interaction.',
      images: [
        screen(26, 'Knowi welcome screen with the robot mascot, Create Account, and Login', {
          priority: true,
        }),
        screen(27, 'Knowi sign up screen'),
        screen(28, 'Knowi sign in screen'),
      ],
    },
    {
      type: 'phoneShowcase',
      spaceBefore: 'section',
      copySide: 'right',
      heading: 'A clearer path from interest to education.',
      body: 'Course discovery, subscription options, and streamlined enrollment screens guide users through choosing the right learning experience, balancing detailed program information with a straightforward interface.',
      images: [
        screen(29, 'Knowi available modules screen for a Criminal course'),
        screen(30, 'Knowi subscription plan screen'),
        screen(31, 'Knowi payment screen'),
      ],
    },
    {
      type: 'phoneShowcase',
      spaceBefore: 'section',
      heading: 'Every step forward, within reach.',
      body: 'Dedicated dashboards bring course progress, saved recordings, and file management into one organized experience, giving learners a clear view of their development and the tools to continue where they left off.',
      images: [
        screen(32, 'Knowi progress dashboard for Criminal, Civil, and Immigration modules'),
        screen(33, 'Knowi recordings library'),
        screen(34, 'Knowi file upload screen'),
      ],
    },
    {
      type: 'phoneShowcase',
      spaceBefore: 'section',
      copySide: 'right',
      heading: 'Built for practice that makes progress.',
      body: 'Scenario-based exercises bring consecutive interpretation, simultaneous interpretation, and sight translation into a focused mobile environment. Adjustable difficulty, video prompts, note-taking, and recording interfaces support a more personalized approach to professional training.',
      images: [
        screen(35, 'Knowi practice category selection'),
        screen(36, 'Knowi difficulty selection'),
        screen(37, 'Knowi interactive practice session with video, notes, and recording'),
      ],
    },
  ],
};
