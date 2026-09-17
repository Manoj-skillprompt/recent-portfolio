// src/config/profile.ts - TypeScript version with type safety
import type { ProfileInfo, SocialLink } from './interfaces/profile';

const portfolioUrl = (import.meta.env.SITE_URL ?? import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321').replace(/\/$/, '');

export const PROFILE_INFO: ProfileInfo = {
  name: 'Manoj Chaudhary',
  role: 'Software Developer',
  email: 'manoj.tharu34@gmail.com',
  location: 'Butwal, Nepal',
  description: 'Welcome to my digital world, where I turn ideas into world-class products.',
};

export const SOCIALS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/Manoj-skillprompt' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/manoj-tharu' },
  { name: 'Portfolio Website', url: portfolioUrl },
  { name: 'Resume', url: '/files/resume.pdf' },
];