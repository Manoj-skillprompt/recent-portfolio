import React from 'react';
import { PROJECTS } from '../config/projects';

export default function Projects() {
  if (!PROJECTS || PROJECTS.length === 0) return null;

  return (
    <section id='projects' className='mb-16'>
      <h3 className='text-lg font-bold text-foreground mb-6 border-b border-card pb-2'>Projects</h3>
      <div className='grid gap-6 sm:grid-cols-2'>
        {PROJECTS.map((project, index) => (
          <a
            key={index}
            href={project.link}
            className='group block rounded-2xl border border-white/10 bg-[rgba(29,25,23,0.72)] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors duration-200 hover:border-[#d8a977]/60 hover:bg-[rgba(35,31,28,0.8)]'
          >
            <h4 className='mb-2 font-medium text-foreground group-hover:text-[#f8d9b5]'>{project.title}</h4>
            <p className='text-sm leading-relaxed text-muted'>{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
