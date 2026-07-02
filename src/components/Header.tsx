import React from 'react';
import { PERSONAL_INFO } from '../data/portfolio';

export default function Header() {
  return (
    <header className="mb-12 flex items-center justify-between">
      <a href="/" className="text-xl font-bold tracking-tight text-white hover:text-gray-300 transition-colors">
        {PERSONAL_INFO.name.split(' ')[0]}.
      </a>
      <nav className="flex gap-4 sm:gap-6 text-sm text-gray-400">
        {PERSONAL_INFO.socials.map((link) => (
          <a key={link.name} href={link.url} className="hover:text-white transition-colors">
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
