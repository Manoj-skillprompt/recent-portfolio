import React from 'react';
import { EXPERIENCE } from '../data/portfolio';

export default function Experience() {
  if (!EXPERIENCE || EXPERIENCE.length === 0) return null;
  
  return (
    <section className="mb-16">
      <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-2">Experience</h3>
      <div className="space-y-8">
        {EXPERIENCE.map((exp, index) => (
          <div key={index} className="flex flex-col sm:flex-row justify-between items-start gap-2">
            <div>
              <h4 className="text-white font-medium">{exp.company}</h4>
              <p className="text-gray-400 text-sm mt-1">{exp.role}</p>
            </div>
            <div className="text-right flex flex-col items-start sm:items-end">
              <span className="text-sm text-gray-500">{exp.duration}</span>
              <span className="text-xs text-gray-500 mt-1">{exp.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
