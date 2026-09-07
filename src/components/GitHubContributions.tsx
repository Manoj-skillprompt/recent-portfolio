import { Star, GitFork, ExternalLink, BookOpen, Users, GitCommit, Activity } from 'lucide-react';
import type { GitHubContribution, GitHubStats } from '../config/interfaces/github';

type Props = {
  data: GitHubStats | null;
};

export default function GitHubContributions({ data }: Props) {
  if (!data || !data.user) return null;

  const { user, repos, totalStars, totalForks } = data;
  const contributions = data.contributions.slice(-371);
  const contributionTotal = contributions.reduce((sum, day) => sum + day.count, 0);
  const paddedContributions = Array.from({ length: 371 }, (_, index) => contributions[index] ?? null);
  const cellSize = 12;
  const gap = 2;
  const gridWidth = 53 * (cellSize + gap) - gap;
  const gridHeight = 7 * (cellSize + gap) - gap;

  return (
    <section id='github'>
      {/* <h3 className='text-lg font-bold text-foreground mb-6 border-b border-card pb-2'>GitHub</h3> */}

      {/*
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6'>
        <StatCard icon={<BookOpen className='h-4 w-4' />} label='Repos' value={user.public_repos} />
        <StatCard icon={<Star className='h-4 w-4' />} label='Stars' value={totalStars} />
        <StatCard icon={<GitFork className='h-4 w-4' />} label='Forks' value={totalForks} />
        <StatCard icon={<Users className='h-4 w-4' />} label='Followers' value={user.followers} />
      </div>
      */}

      <div className='mb-4 rounded-lg bg-surface p-4 sm:p-5'>
        <div className='mb-4 flex items-start justify-between gap-4'>
          <div>
            {/* <p className='flex items-center gap-2 text-sm font-medium text-foreground'>
              <Activity className='h-4 w-4 text-accent' />
              Contribution activity
            </p> */}
            <p className='mt-1 text-lg text-muted'>{contributionTotal} contributions in the last year</p>
          </div>
          <span className='shrink-0 text-lg text-muted'>
            Less{' '}
            <span className='mx-1 inline-flex gap-1 align-middle'>
              {[0, 1, 2, 3, 4].map((level) => (
                <i key={level} className={`inline-block h-2.5 w-2.5 rounded-sm contribution-level-${level}`} />
              ))}
            </span>{' '}
            More
          </span>
        </div>

        <div className='overflow-x-auto pb-1'>
          <div className='relative min-w-170' style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}>
            <div className='grid grid-flow-col grid-rows-7 gap-0.5'>
              {paddedContributions.map((day, index) => (
                <span
                  key={day?.date ?? `empty-${index}`}
                  title={day ? `${day.count} contributions on ${day.date}` : undefined}
                  className={`h-3 w-3 rounded-sm contribution-level-${day?.level ?? 0}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* {repos.length > 0 && (
        <div>
          <p className='text-sm text-muted mb-3 font-medium'>Top Repositories</p>
          <div className='space-y-2'>
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center justify-between p-3 border border-card rounded-lg hover:border-accent bg-surface transition-colors'
              >
                <div className='flex items-center gap-2 min-w-0'>
                  <span className='text-foreground font-medium text-sm truncate group-hover:text-accent transition-colors'>
                    {repo.name}
                  </span>
                  {repo.language && <span className='text-xs text-muted hidden sm:inline'>· {repo.language}</span>}
                  {repo.description && (
                    <span className='text-xs text-muted truncate hidden md:inline max-w-40'>{repo.description}</span>
                  )}
                </div>
                <div className='flex items-center gap-3 text-xs text-muted shrink-0 ml-2'>
                  <span className='flex items-center gap-1'>
                    <Star className='h-3 w-3' /> {repo.stargazers_count}
                  </span>
                  <span className='flex items-center gap-1'>
                    <GitFork className='h-3 w-3' /> {repo.forks_count}
                  </span>
                  <ExternalLink className='h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
              </a>
            ))}
          </div>
        </div>
      )} */}

      <a
        href={user.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-1.5 text-lg text-accent hover:underline'
      >
        <GitCommit className='h-4 w-4' />
        View all contributions on GitHub
        <ExternalLink className='h-3 w-3' />
      </a>
    </section>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className='flex flex-col items-center p-3 border border-card rounded-lg bg-surface'>
      <div className='text-accent mb-1'>{icon}</div>
      <span className='text-lg font-bold text-foreground'>{value}</span>
      <span className='text-xs text-muted'>{label}</span>
    </div>
  );
}
