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
    action: 'scroll-top',
  },
  {
    label: 'Projects',
    href: '/#projects',
    action: 'scroll-to-section',
    sectionId: 'projects',
  },
  {
    label: 'Blog',
    href: '/blog',
    action: 'navigate',
  },
];
