import type { ProjectItem } from './interfaces/projects';

export const PROJECTS: ProjectItem[] = [
  {
    title: 'Basobas',
    description:
      'A smart rental management portal that automates rent, utility calculations, and invoicing while giving landlords and renters a simple way to manage payments and stay connected.',
    link: '/',
    image: '/projects/portfolio-preview.svg',
    keyFeatures: [
      'Automated rent and utility calculations',
      'Scheduled monthly invoice generation',
      'Tenant notifications via email and WhatsApp',
      'Renter portal to view pending and past invoices',
      'Secure renter access using room number and mobile number',
      'Nepali (B.S.) calendar support',
    ],
    techStack: ['Node.js', 'Cron jobs', 'Prisma', 'Next.js', 'React', 'shadcn/ui', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Falcon type',
    description:
      'A modern typing speed test that helps users measure and improve their typing speed, accuracy, consistency, and progress.',
    link: 'https://falcontype.manojkumarchaudhary23.com.np/',
    image: '/projects/falcontype.png',
    keyFeatures: [
      'Multiple typing modes including time, words, quotes, numbers, and custom tests',
      'Real-time WPM, accuracy, consistency, and error tracking',
      'Live WPM chart to visualize typing performance',
      '28-day activity heatmap and typing history',
      'Achievements for speed, accuracy, and typing streaks',
      'Customizable themes, fonts, colors, and test settings',
      'Virtual keyboard with real-time key highlighting',
      'Keyboard shortcuts for a faster testing experience',
      'Responsive and accessible design',
    ],
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'React Router',
      'Recharts',
      'Lucide React',
    ],
  },
];
