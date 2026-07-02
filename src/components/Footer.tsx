import React from 'react';
import { PROFILE_INFO } from '../config/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-card pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-sm text-muted gap-4">
      <p>&copy; {year} {PROFILE_INFO.name}. All rights reserved.</p>
      <p className="italic">"{PROFILE_INFO.quote}"</p>
    </footer>
  );
}
