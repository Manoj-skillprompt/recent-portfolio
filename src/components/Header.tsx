import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { SOCIALS } from '../config/profile';
import { NAV_ITEMS } from '../config/nav-items';

export default function Header() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const resumeUrl = SOCIALS.find((social) => social.name === 'Resume')?.url || '/files/resume.pdf';

  useEffect(() => {
    document.documentElement.classList.add('dark');

    // Handle hash navigation for sections
    const handleHashNavigation = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    const updateActiveNav = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';

      if (path === '/blog' || path.startsWith('/blog/')) {
        setActiveNav('Blogs');
        return;
      }

      if (path !== '/') {
        setActiveNav(null);
        return;
      }

      const visibleSections = NAV_ITEMS.filter((item) => item.sectionId)
        .map((item) => {
          const section = document.getElementById(item.sectionId!);
          return section ? { item, top: section.getBoundingClientRect().top } : null;
        })
        .filter((section): section is { item: (typeof NAV_ITEMS)[number]; top: number } => section !== null)
        .filter((section) => section.top <= window.innerHeight * 0.45);

      setActiveNav(visibleSections.at(-1)?.item.label ?? 'Home');
    };

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener('scroll', updateActiveNav);
      window.removeEventListener('resize', updateActiveNav);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, action?: string, sectionId?: string) => {
    const isHomePage = typeof window !== 'undefined' && window.location.pathname === '/';

    if (action === 'scroll-top') {
      e.preventDefault();
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = '/';
      }
    } else if (action === 'scroll-to-section' && sectionId) {
      e.preventDefault();
      if (isHomePage) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page with section hash
        window.location.href = `/#${sectionId}`;
      }
    }
    // 'navigate' action lets the default link behavior happen
  };

  return (
    <header className='my-8 flex w-full items-center justify-between gap-5'>
      <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-(--color-border) bg-(--color-surface) shadow-[0_0_24px_rgba(0,0,0,0.2)] ring-1 ring-(--color-border)'>
        <img src='/profile.png' alt='Profile' className='h-full w-full object-cover' />
      </div>

      <nav className='max-w-[calc(100vw-7rem)] overflow-x-auto rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm ring-1 ring-(--color-border) sm:max-w-none sm:px-7 sm:py-3'>
        <div className='flex items-center gap-3 whitespace-nowrap text-sm font-medium text-foreground sm:gap-8 sm:text-lg'>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.action, item.sectionId)}
              aria-current={activeNav === item.label ? 'page' : undefined}
              className={`relative transition-colors duration-200 hover:text-(--color-primary) ${
                activeNav === item.label ? 'text-(--color-primary)' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <a
        href={resumeUrl}
        download
        aria-label='Download resume'
        className='inline-flex items-center gap-2 rounded-full border border-(--color-primary) bg-(--color-primary) px-3 py-2 text-xs font-bold text-[#07130d] shadow-[0_10px_26px_rgba(126,231,198,0.2)] transition-transform duration-200 hover:scale-105'
      >
        <Download className='h-4 w-4' aria-hidden='true' />
        <span className='hidden sm:inline'>Resume</span>
      </a>
    </header>
  );
}
