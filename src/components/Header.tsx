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
    <header className="my-8 flex items-center justify-between">
      <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.action, item.sectionId)}
            className="text-muted hover:text-accent transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </nav>
       <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-surface text-current hover:bg-accent-soft focus:outline-none focus:ring-0 transition-colors duration-200"
        >
          <ThemeIcon theme={theme} />
        </button>
    </header>
  );
}
