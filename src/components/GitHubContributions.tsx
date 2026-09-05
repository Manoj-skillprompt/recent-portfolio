import { Star, GitFork, ExternalLink, BookOpen, Users, GitCommit } from 'lucide-react';
import type { GitHubStats } from '../config/interfaces/github';

type Props = {
  data: GitHubStats | null;
};

export default function GitHubContributions({ data }: Props) {
  if (!data || !data.user) return null;

  const { user, repos, totalStars, totalForks } = data;

  return (
    <section id='github' className='mb-16'>
      <h3 className='text-lg font-bold text-foreground mb-6 border-b border-card pb-2'>GitHub</h3>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6'>
        <StatCard icon={<BookOpen className='h-4 w-4' />} label='Repos' value={user.public_repos} />
        <StatCard icon={<Star className='h-4 w-4' />} label='Stars' value={totalStars} />
        <StatCard icon={<GitFork className='h-4 w-4' />} label='Forks' value={totalForks} />
        <StatCard icon={<Users className='h-4 w-4' />} label='Followers' value={user.followers} />
      </div>

      {repos.length > 0 && (
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
      )}

      <a
        href={user.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-1.5 text-sm text-accent hover:underline mt-4'
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
