import React, { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { SOCIALS } from '../config/profile';
import { NAV_ITEMS } from '../config/nav-items';

export default function Header() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const resumeUrl = SOCIALS.find((social) => social.name === 'Resume')?.url || '/files/resume.pdf';

  useEffect(() => {
    document.documentElement.classList.add('dark');

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
    setMenuOpen(false);

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
        window.location.href = `/#${sectionId}`;
      }
    }
  };

  return (
    <header className='relative z-50 my-8 flex w-full items-center justify-between gap-5'>
      <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-(--color-border) bg-(--color-surface) shadow-[0_0_24px_rgba(0,0,0,0.2)] ring-1 ring-(--color-border)'>
        <img src='/profile.png' alt='Profile' className='h-full w-full object-cover' />
      </div>

      <nav className='hidden max-w-[calc(100vw-7rem)] overflow-x-auto rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm ring-1 ring-(--color-border) lg:flex lg:max-w-none lg:px-7 lg:py-3'>
        <div className='flex items-center gap-3 whitespace-nowrap text-base font-bold lg:gap-8 lg:text-lg'>
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
        className='btn-primary hidden items-center gap-2 px-4 py-3 text-base lg:inline-flex'
      >
        <Download className='h-4 w-4 shrink-0' aria-hidden='true' />
        <span className='hidden sm:inline'>Resume</span>
      </a>

      <button
        type='button'
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-foreground transition-colors duration-200 hover:border-(--color-primary) hover:text-(--color-primary) lg:hidden'
      >
        {menuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
      </button>

      {menuOpen && (
        <div className='absolute left-0 right-0 top-[calc(100%+0.75rem)] overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface)/95 shadow-[0_20px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm ring-1 ring-(--color-border) lg:hidden'>
          <nav className='flex flex-col p-3'>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.action, item.sectionId)}
                aria-current={activeNav === item.label ? 'page' : undefined}
                className={`rounded-xl px-3 py-3 text-base font-medium transition-colors duration-200 ${
                  activeNav === item.label
                    ? 'bg-(--color-primary)/10 text-(--color-primary)'
                    : 'text-foreground hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}

            <a
              href={resumeUrl}
              download
              className='btn-primary mt-2 inline-flex items-center justify-center gap-2 px-3 py-3 text-sm'
            >
              <Download className='h-4 w-4' aria-hidden='true' />
              Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
