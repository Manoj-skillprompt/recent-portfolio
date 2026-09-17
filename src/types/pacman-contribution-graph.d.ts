declare module 'pacman-contribution-graph' {
  export type PlayerStyle = 'conservative' | 'aggressive' | 'opportunistic';
  export type Platform = 'github' | 'gitlab' | 'scenario';
  export type GameTheme = 'github' | 'github-dark' | 'gitlab' | 'gitlab-dark';

  export interface ArcadeRendererOptions {
    game: string;
    username: string;
    platform?: Platform;
    gameTheme?: GameTheme;
    playerStyle?: PlayerStyle;
    svgCallback?: (svg: string) => void;
    gameOverCallback?: () => void;
    pointsIncreasedCallback?: (points: number) => void;
    gameStatsCallback?: (stats: { totalScore: number; steps: number; ghostsEaten: number }) => void;
    githubSettings?: {
      accessToken?: string;
    };
    scenario?: string;
  }

  export class ArcadeRenderer {
    constructor(options: ArcadeRendererOptions);
    start(): void;
  }
}
