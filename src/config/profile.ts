// src/config/profile.ts - TypeScript version with type safety
import type { ProfileInfo, SocialLink } from './interfaces/profile';

export const PROFILE_INFO: ProfileInfo = {
    name: import.meta.env.PUBLIC_FULL_NAME || 'Jane Doe',
    role: import.meta.env.PUBLIC_ROLE || 'Full-Stack Developer',
    email: import.meta.env.PUBLIC_EMAIL || 'jane.doe@example.com',
    phone: import.meta.env.PUBLIC_PHONE || '+1-555-555-5555',
    location: import.meta.env.PUBLIC_LOCATION || 'San Francisco, CA',
    quote: import.meta.env.PUBLIC_QUOTE || "your quoute here",
};

export const SOCIALS: SocialLink[] = [
    { name: 'GitHub', url: `https://github.com/${import.meta.env.PUBLIC_GITHUB_USERNAME || 'your-github-username'}` },
    { name: 'LinkedIn', url: `https://linkedin.com/in/${import.meta.env.PUBLIC_LINKEDIN_USERNAME || 'your-linkedin-username'}` },
    { name: 'Twitter', url: `https://twitter.com/${import.meta.env.PUBLIC_TWITTER_USERNAME || 'your-twitter-username'}` },
    { name: 'Portfolio Website', url: import.meta.env.PUBLIC_SITE_URL || 'https://yourwebsite.com' },
    { name: 'Resume', url: import.meta.env.PUBLIC_RESUME_URL || '/files/resume.pdf' }
];