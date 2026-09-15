// src/config/experience.ts - TypeScript version with type safety
import type { ExperienceItem } from './interfaces/experience';

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'SkillPrompt Pvt Ltd.',
    role: 'Software Developer',
    duration: 'July 2024 - Present',
    location: 'Butwal Nepal',
    description: 'Led development of new features, mentored junior developers, and optimized application performance.',
    points: [
      'Design and build Pro components/blocks, from Figma to production-ready React.',
      'Build and maintain the @shadcncraft registry.',
      'Build and enhance features for the marketing website.',
    ],
    techStack: [
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'Shadcn/ui',
      'Flowbite',
      'Prisma',
      'Tanstack',
      'Node.js',
      'Mysql',
      'Yarn',
    ],
  },
];
