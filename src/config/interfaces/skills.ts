/** Skill interface */
export interface Skill {
    name: string;
    category?: string;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}