import { useEffect, useRef, useState } from 'react';
import { ArcadeRenderer } from 'pacman-contribution-graph';
import { ExternalLink, GitCommit } from 'lucide-react';
import type { GitHubStats } from '../config/interfaces/github';

type Props = {
  data: GitHubStats | null;
};

export default function GitHubContributions({ data }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderRef = useRef<ArcadeRenderer | null>(null);

  useEffect(() => {
    const username = data?.user?.login;
    if (!username || typeof window === 'undefined') {
      return;
    }

    setLoading(true);

    const rawContributions = data.contributions || [];

    const formattedContributions = rawContributions.map((item) => ({
      date: item.date,
      count: item.count,
      intensity: Math.min(4, Math.max(0, item.level ?? 0)),
    }));

    const renderer = new ArcadeRenderer({
      game: 'breakout',
      username: username,
      ...(formattedContributions.length > 0
        ? {
            platform: 'scenario',
            customData: formattedContributions,
          }
        : {
            platform: 'github',
          }),
      gameTheme: 'github-dark',
      svgCallback: (svg) => {
        setLoading(false);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl) {
            if (!svgEl.getAttribute('viewBox')) {
              const w = svgEl.getAttribute('width');
              const h = svgEl.getAttribute('height');
              if (w && h) {
                svgEl.setAttribute('viewBox', `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
              }
            }
          }
        }
      },
      gameOverCallback: () => {
        console.log('Bomberman contribution game finished');
      },
    });

    renderRef.current = renderer;
    renderer.start();

    return () => {
      if (renderRef.current) {
        const instance = renderRef.current as unknown as Record<string, unknown>;
        if (typeof instance.destroy === 'function') {
          (instance.destroy as () => void)();
        } else if (typeof instance.stop === 'function') {
          (instance.stop as () => void)();
        }
      }
      renderRef.current = null;
    };
  }, [data]);

  if (!data || !data.user) return null;

  return (
    <section id='github'>
      <div className='relative w-full max-w-full rounded-lg pb-4'>
        {loading && (
          <div className='absolute inset-0 flex items-center justify-center bg-surface/80 text-sm text-muted'>
            Loading contributions
          </div>
        )}
        <div
          ref={containerRef}
          className='w-full max-w-full mt-7 [&_svg]:rounded-md [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-full [&_svg]:block'
        />
      </div>

      <a
        href={data.user.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-1.5 text-base'
      >
        <GitCommit className='h-5 w-5' />

        <span className='relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100'>
          View all contributions on GitHub
        </span>

        <ExternalLink className='h-4 w-5' />
      </a>
    </section>
  );
}
