import React from 'react';
import { PROJECTS } from '../data/portfolio';

export default function Projects() {
  if (!PROJECTS || PROJECTS.length === 0) return null;

  return (
    <section className="mb-16">
      <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-2">Projects</h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <a key={index} href={project.link} className="group block p-4 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors bg-gray-900/30">
            <h4 className="text-white font-medium mb-2 group-hover:text-accent transition-colors">{project.title}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
