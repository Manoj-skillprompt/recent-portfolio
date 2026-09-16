// src/config/experience.ts - TypeScript version with type safety
import type { ExperienceItem } from './interfaces/experience';

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'SkillPrompt Pvt Ltd.',
    role: 'Software Developer',
    duration: 'July 2024 - Present',
    location: 'Butwal Nepal',
    description:
      'Working on YourOSHC, an insurance platform, where I turn real business requirements into reliable, user-friendly workflows used by agencies, administrators, and customers.',

    points: [
      'Built end-to-end workflows for applications, payments, invoices, commissions, and agency management.',
      'Improved payment and communication flows, including payment links, email notifications, OTP verification, and reconciliation.',
      'Turned complex Figma designs and business requirements into polished, production-ready experiences across the platform.',
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
