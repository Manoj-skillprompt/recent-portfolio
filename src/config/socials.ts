// When using Astro, environment variables are accessed via import.meta.env
// For frontend code, variables must be prefixed with PUBLIC_

const githubUsername = import.meta.env.PUBLIC_GITHUB_USERNAME || 'your-github-username';
const linkedinUsername = import.meta.env.PUBLIC_LINKEDIN_USERNAME || 'your-linkedin-username';
const twitterUsername = import.meta.env.PUBLIC_TWITTER_USERNAME || 'your-twitter-username';
const email = import.meta.env.PUBLIC_EMAIL || 'your-email@example.com';

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

export const SOCIALS: SocialLink[] = [
  {
    name: 'GitHub',
    icon: 'Github',
    url: `https://github.com/${githubUsername}`,
    color: 'hover:bg-black',
  },
  {
    name: 'LinkedIn',
    icon: 'Linkedin',
    url: `https://linkedin.com/in/${linkedinUsername}`,
    color: 'hover:bg-[#0077b5]',
  },
  {
    name: 'Twitter',
    icon: 'Twitter',
    url: `https://twitter.com/${twitterUsername}`,
    color: 'hover:bg-gray-800',
  },
  {
    name: 'Email',
    icon: 'Mail',
    url: `https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=${email}`,
    color: 'hover:bg-yellow-900',
  },
];
