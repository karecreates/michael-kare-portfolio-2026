// Nine creative disciplines shown in the scroll-driven stacked-tab showcase.
// Files live in /public/showcase. Every panel shares the same background: var(--portfolio-blue). There is
// intentionally no per-discipline colour field.
export const PORTFOLIO_DISCIPLINES = [
  {
    id: 'branding',
    number: '01',
    title: 'Branding',
    description:
      'Creating distinctive visual identities that give brands a recognizable personality and lasting impression.',
    mediaSrc: '/showcase/branding.png',
    mediaType: 'image',
    href: '/projects/scsi-branding',
  },
  {
    id: 'creative-work',
    number: '02',
    title: 'Creative Work',
    description:
      'Exploring ideas through experimentation, visual storytelling, and expressive creative direction.',
    mediaSrc: '/showcase/creative-work.png',
    mediaType: 'image',
    href: '#creative-gallery',
  },
  {
    id: 'custom-coded-solutions',
    number: '03',
    title: 'Custom-Coded Solutions',
    description:
      'Building purpose-driven applications, interactive tools, and digital experiences beyond conventional templates.',
    mediaSrc: '/showcase/custom-coded-solutions.png',
    mediaType: 'image',
    href: '/projects/interactive-mapping',
  },
  {
    id: 'graphic-design',
    number: '04',
    title: 'Graphic Design',
    description:
      'Combining typography, composition, and visual storytelling to communicate ideas with clarity and impact.',
    mediaSrc: '/showcase/graphic-design.png',
    mediaType: 'image',
  },
  {
    id: 'marketing-advertising',
    number: '05',
    title: 'Marketing & Advertising',
    description:
      'Developing creative campaigns and digital content designed to capture attention and inspire action.',
    mediaSrc: '/showcase/marketing-advertising.png',
    mediaType: 'image',
    href: '/projects/beta-agency-marketing-design',
  },
  {
    id: 'print-design',
    number: '06',
    title: 'Print Design',
    description:
      'Transforming visual concepts into thoughtful physical experiences through print and editorial design.',
    mediaSrc: '/showcase/print-design.png',
    mediaType: 'image',
    href: '/projects/knowi-ai-print',
  },
  {
    id: 'ui-ux-design',
    number: '07',
    title: 'UI/UX Design',
    description:
      'Designing intuitive interfaces that balance usability, functionality, and compelling visual experiences.',
    mediaSrc: '/showcase/ui-ux-design.png',
    mediaType: 'image',
    href: '/projects/scsi-ai-platform',
  },
  {
    id: 'video-animation',
    number: '08',
    title: 'Video & Animation',
    description:
      'Bringing ideas and stories to life through motion, animation, and dynamic visual communication.',
    mediaSrc: '/showcase/video-animation-1080p.mp4',
    mediaType: 'video',
    // SCSI Testing AI Video 4K — playback starts here and loops back to this point.
    startTime: 40,
    posterSrc: '/showcase/video-animation-poster.jpg',
    href: '/projects/sabio',
  },
  {
    id: 'web-design-development',
    number: '09',
    title: 'Web Design & Development',
    description:
      'Creating modern digital experiences where thoughtful design, custom development, and seamless interaction meet.',
    mediaSrc: '/showcase/web-design-development.png',
    mediaType: 'image',
    href: '/projects/beta-agency-redesign',
  },
];
