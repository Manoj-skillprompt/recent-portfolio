export interface NavItem {
  label: string;
  href: string;
  action?: 'scroll-top' | 'scroll-to-section' | 'navigate';
  sectionId?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    action: 'navigate',
  },
  {
    label: 'Projects',
    href: '/#projects',
    action: 'scroll-to-section',
    sectionId: 'projects',
  },
  {
    label: 'Experience',
    href: '/#experience',
    action: 'scroll-to-section',
    sectionId: 'experience',
  },
  {
    label: 'Blogs',
    href: '/blog',
    action: 'navigate',
    sectionId: 'blog',
  },

  {
    label: 'Newsletter',
    href: '/#newsletter',
    action: 'scroll-to-section',
    sectionId: 'newsletter',
  },
];
