import React from 'react';
import { EXPERIENCE } from '../config/experience';

export default function Experience() {
  if (!EXPERIENCE || EXPERIENCE.length === 0) return null;
  
  return (
    <section className="mb-16">
      <h3 className="text-lg font-bold text-foreground mb-6 border-b border-card pb-2">Experience</h3>
      <div className="space-y-8">
        {EXPERIENCE.map((exp, index) => (
          <div key={index} className="flex flex-col sm:flex-row justify-between items-start gap-2">
            <div>
              <h4 className="text-foreground font-medium">{exp.company}</h4>
              <p className="text-muted text-sm mt-1">{exp.role}</p>
            </div>
            <div className="text-right flex flex-col items-start sm:items-end">
              <span className="text-sm text-muted">{exp.duration}</span>
              <span className="text-xs text-muted mt-1">{exp.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
