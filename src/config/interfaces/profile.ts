/** Profile information interface */
export interface ProfileInfo {
    name: string;
    role: string;
    email: string;
    phone?: string | null;
    location?: string | null;
    quote?: string | null;
}

/** Social link interface */
export interface SocialLink {
    name: string;
    url: string;
}