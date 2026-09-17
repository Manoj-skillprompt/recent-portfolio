import React, { useState } from 'react';
import { EXPERIENCE } from '../config/experience';
import type { ExperienceItem } from '../config/interfaces/experience';

const CodeIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='16 18 22 12 16 6' />
    <polyline points='8 6 2 12 8 18' />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='2' y='7' width='20' height='14' rx='2' ry='2' />
    <path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='6 9 12 15 18 9' />
  </svg>
);

const ExperienceCard = ({ exp, isCurrent, isLast }: { exp: ExperienceItem; isCurrent: boolean; isLast: boolean }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasPoints = exp.points && exp.points.length > 0;

  return (
    <div className='relative flex gap-5 sm:gap-7'>
      {/* Left: icon + line */}
      <div className='relative flex flex-col items-center shrink-0 w-7'>
        {/* Icon badge */}
        <div
          className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border ${
            isCurrent
              ? 'border-[#7ee7c6]/30 bg-[#7ee7c6]/10 text-[#7ee7c6]'
              : 'border-(--color-border) bg-(--color-surface) text-muted'
          } shadow-sm`}
        >
          {isCurrent ? <CodeIcon /> : <BriefcaseIcon />}
        </div>

        {/* Connecting line */}
        <div
          className={`absolute top-7 left-1/2 w-px -translate-x-1/2 ${
            isLast ? 'bottom-0 bg-linear-to-b from-white/15 to-transparent' : '-bottom-4 bg-white/15'
          }`}
        />
      </div>

      {/* Right: content */}
      <div className={`min-w-0 flex-1 ${!isLast ? 'pb-10' : 'pb-2'}`}>
        <div className='pt-0.5'>
          <div className='flex flex-wrap items-start justify-between gap-3'>
            {/* Left side: Company & Role */}
            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <h4 className='text-lg font-semibold text-foreground'>{exp.company}</h4>
                {isCurrent && (
                  <span className='inline-flex items-center gap-1.5 rounded-full border border-[#7ee7c6]/25 bg-[#7ee7c6]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7ee7c6]'>
                    <span className='h-1.5 w-1.5 rounded-full bg-[#7ee7c6] animate-pulse' />
                    Working
                  </span>
                )}
              </div>
              <p className='mt-1 text-sm text-muted'>{exp.role}</p>
            </div>

            {/* Right side: Duration & Location */}
            <div className='flex flex-col items-start sm:items-end sm:text-right w-full sm:w-auto mt-2 sm:mt-0'>
              <span className='text-lg text-foreground'>{exp.location}</span>
              <span className='text-xs font-medium text-muted mb-1 mt-1'>{exp.duration}</span>
            </div>
          </div>

          <div
            className={`mt-4 flex items-start justify-between gap-4 ${hasPoints ? 'cursor-pointer group' : ''}`}
            onClick={() => hasPoints && setIsOpen(!isOpen)}
          >
            {exp.description && (
              <p
                className={`text-sm leading-relaxed text-muted flex-1 transition-colors ${hasPoints ? 'group-hover:text-foreground' : ''}`}
              >
                {exp.description}
              </p>
            )}
            {!exp.description && hasPoints && (
              <p className='text-sm font-medium text-muted flex-1 transition-colors group-hover:text-foreground'>
                View responsibilities
              </p>
            )}

            {hasPoints && (
              <div className='mt-0.5 shrink-0'>
                <ChevronDownIcon
                  className={`text-muted transition-all duration-300 group-hover:text-foreground ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
            )}
          </div>

          {hasPoints && (
            <div
              className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
            >
              <div className='min-h-0'>
                {/* Points */}
                <ul className='space-y-3 mb-1'>
                  {exp.points!.map((point, i) => (
                    <li key={i} className='flex items-start gap-3 text-sm text-muted leading-relaxed'>
                      <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)' />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tech Stack - Always Visible */}
          {exp.techStack && exp.techStack.length > 0 && (
            <div className='mt-5 flex flex-wrap gap-2'>
              {exp.techStack.map((tech, i) => (
                <span
                  key={i}
                  className='tech-stack-chip'
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  if (!EXPERIENCE || EXPERIENCE.length === 0) return null;

  return (
    <section id='experience' className='mt-10 sm:mt-22'>
      {/* Section Header */}
      <h3 className='text-xl font-bold text-foreground mb-8'>Experience</h3>

      {/* Timeline */}
      <div className='relative'>
        {EXPERIENCE.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} isCurrent={index === 0} isLast={index === EXPERIENCE.length - 1} />
        ))}
      </div>
    </section>
  );
}
