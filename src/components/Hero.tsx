import React from 'react';
import { PERSONAL_INFO } from '../data/portfolio';

export default function Hero() {
  return (
    <section className="mb-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
        {PERSONAL_INFO.name}
      </h1>
      <h2 className="text-xl sm:text-2xl text-gray-400 font-medium mb-6">
        {PERSONAL_INFO.role}
      </h2>
      <p className="text-gray-300 leading-relaxed max-w-xl mb-8">
        {PERSONAL_INFO.quote && <span className="block mb-4 italic text-gray-500">"{PERSONAL_INFO.quote}"</span>}
        Dedicated to building innovative products and web applications with a focus on high-quality, client-centric solutions. I love diving into new technologies and evolving every day 🚀
      </p>
      <div className="flex flex-col sm:flex-row gap-4 text-sm">
        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          {PERSONAL_INFO.email}
        </a>
        <span className="hidden sm:inline text-gray-600">•</span>
        <span className="text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {PERSONAL_INFO.location}
        </span>
      </div>
    </section>
  );
}
