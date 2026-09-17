import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { PROJECTS } from '../config/projects';

export default function Projects() {
  const [preview, setPreview] = useState({ visible: false, x: 0, y: 0, image: '' });

  if (!PROJECTS || PROJECTS.length === 0) return null;

  return (
    <section id='projects' className='mt-10 sm:mt-22'>
      <h3 className='text-xl font-bold text-foreground'>Projects</h3>
      <p className='mt-2 mb-8 text-base text-muted'>A few things I've built, worked on, and learned from.</p>
      <div className='relative'>
        {PROJECTS.map((project, index) => {
          const isLast = index === PROJECTS.length - 1;

          return (
            <div key={project.title} className='relative flex gap-5 sm:gap-7'>
              <div className='relative flex w-7 shrink-0 flex-col items-center'>
                <div
                  className='relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-[#7ee7c6]/30 bg-[#7ee7c6]/10 text-[10px] font-bold tracking-wider text-[#7ee7c6] shadow-sm'
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div
                  className={`absolute top-7 left-1/2 w-px -translate-x-1/2 ${
                    isLast ? 'bottom-0 bg-linear-to-b from-white/15 to-transparent' : '-bottom-4 bg-white/15'
                  }`}
                />
              </div>

              <div className={`min-w-0 flex-1 ${isLast ? 'pb-2' : 'pb-10'}`}>
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group block pt-0.5'
                  onPointerEnter={(event) => {
                    if (project.image) {
                      setPreview({ visible: true, x: event.clientX, y: event.clientY, image: project.image });
                    }
                  }}
                  onPointerMove={(event) => {
                    if (project.image) {
                      setPreview((current) => ({ ...current, x: event.clientX, y: event.clientY }));
                    }
                  }}
                  onPointerLeave={() => setPreview((current) => ({ ...current, visible: false }))}
                >
                  <div className='flex flex-wrap items-start justify-between gap-3'>
                    <div>
                      <h4 className='flex items-center gap-2 text-lg font-semibold text-foreground transition-colors group-hover:text-(--color-primary)'>
                        {project.title}
                        <ArrowUpRight
                          className='h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--color-primary)'
                          aria-hidden='true'
                        />
                      </h4>
                    </div>
                    <span className='hidden text-xs font-medium text-muted sm:block'>View project</span>
                  </div>

                  <p className='mt-4 max-w-2xl text-base leading-relaxed text-muted transition-colors group-hover:text-foreground'>
                    {project.description}
                  </p>
                </a>

                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <div className='mt-5'>
                    <p className='mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted'>Key features</p>
                    <ul className='grid gap-2 sm:grid-cols-2'>
                      {project.keyFeatures.map((feature) => (
                        <li key={feature} className='flex items-start gap-2 text-sm leading-relaxed text-muted'>
                          <span
                            className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)'
                            aria-hidden='true'
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.techStack && project.techStack.length > 0 && (
                  <div className='mt-5'>
                    <p className='mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted'>Built with</p>
                    <div className='flex flex-wrap gap-2'>
                      {project.techStack.map((tech) => (
                        <span key={tech} className='tech-stack-chip'>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {preview.image && (
        <div
          className={`project-preview ${preview.visible ? 'project-preview--visible' : ''}`}
          style={{ left: preview.x, top: preview.y }}
          aria-hidden='true'
        >
          <img src={preview.image} alt='' />
        </div>
      )}
    </section>
  );
}
