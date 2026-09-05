export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
  updated_at: string;
}

export interface GitHubStats {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
}
