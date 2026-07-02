import React from 'react';
import { PROJECTS } from '../config/projects';

export default function Projects() {
  if (!PROJECTS || PROJECTS.length === 0) return null;

  return (
    <section id="projects" className="mb-16">
      <h3 className="text-lg font-bold text-foreground mb-6 border-b border-card pb-2">Projects</h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <a key={index} href={project.link} className="group block p-4 border border-card rounded-lg hover:border-accent bg-surface">
            <h4 className="text-foreground font-medium mb-2 group-hover:text-accent">{project.title}</h4>
            <p className="text-sm text-muted leading-relaxed">{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
