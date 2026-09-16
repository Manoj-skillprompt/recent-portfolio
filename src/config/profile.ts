// src/config/profile.ts - TypeScript version with type safety
import type { ProfileInfo, SocialLink } from './interfaces/profile';

export const PROFILE_INFO: ProfileInfo = {
    name: 'Manoj Chaudhary',
    role: 'Software Developer',
    email: 'manoj.tharu34@gmail.com',
    location: 'Butwal, Nepal',
    quote: 'Turning ideas into meaningful digital experiences.',
};

export const SOCIALS: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/Manoj-skillprompt' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/manoj-tharu' },
    { name: 'Portfolio Website', url: 'http://localhost:4321' },
    { name: 'Resume', url: '/files/resume.pdf' }
];