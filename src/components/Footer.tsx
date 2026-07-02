import React from 'react';
import { PERSONAL_INFO } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-gray-800 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
      <p>&copy; {year} {PERSONAL_INFO.name}. All rights reserved.</p>
      <p className="italic">"{PERSONAL_INFO.quote}"</p>
    </footer>
  );
}
