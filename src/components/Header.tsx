import React, { useEffect, useState } from 'react';
import { PROFILE_INFO } from '../config/profile';
import { NAV_ITEMS } from '../config/nav-items';
import ThemeIcon from './ThemeIcon';

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const initialTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme);

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
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(nextTheme);
  };

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
      <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#1b1b1b] shadow-[0_0_24px_rgba(0,0,0,0.45)] ring-1 ring-white/5'>
        <img src='/profile.jpg' alt='Profile' className='h-full w-full object-cover' />
      </div>

      <nav className='flex items-center justify-center rounded-full border border-white/10 bg-[rgba(29,25,23,0.72)] px-5 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm ring-1 ring-white/5 sm:px-7'>
        <div className='flex items-center  gap-5 text-lg font-medium text-white/90 sm:gap-8'>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.action, item.sectionId)}
              className='transition-colors duration-200 hover:text-[#7ee7c6]'
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <button
        type='button'
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className='inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[rgba(30,30,30,0.8)] text-current shadow-[0_10px_26px_rgba(0,0,0,0.22)] transition-colors duration-200 hover:bg-[rgba(48,48,48,0.9)] focus:outline-none focus:ring-0'
      >
        <ThemeIcon theme={theme} />
      </button>
    </header>
  );
}
