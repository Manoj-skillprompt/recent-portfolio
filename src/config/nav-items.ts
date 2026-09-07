export interface NavItem {
  label: string;
  href: string;
  action?: 'scroll-top' | 'scroll-to-section' | 'navigate';
  sectionId?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'About',
    href: '/#about',
    action: 'scroll-to-section',
    sectionId: 'about',
  },
  {
    label: 'Projects',
    href: '/#projects',
    action: 'scroll-to-section',
    sectionId: 'projects',
  },
  {
    label: 'Blogs',
    href: '/blog',
    action: 'navigate',
  },
  {
    label: 'Consulting',
    href: '/#consulting',
    action: 'scroll-to-section',
    sectionId: 'consulting',
  },
  {
    label: 'Newsletter',
    href: '/#newsletter',
    action: 'scroll-to-section',
    sectionId: 'newsletter',
  },
];
