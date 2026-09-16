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
    url: 'https://github.com/Manoj-skillprompt',
    color: 'hover:bg-black',
  },
  {
    name: 'LinkedIn',
    icon: 'Linkedin',
    url: 'https://www.linkedin.com/in/manoj-kumar-chaudhary-a19913219',
    color: 'hover:bg-[#0077b5]',
  },
  {
    name: 'Twitter',
    icon: 'Twitter',
    url: 'https://x.com/manojtharu34',
    color: 'hover:bg-gray-800',
  },
  {
    name: 'Email',
    icon: 'Mail',
    url: 'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=manoj.tharu34@gmail.com',
    color: 'hover:bg-yellow-900',
  },
];
