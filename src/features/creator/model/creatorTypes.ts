/* Types */
export interface Creator {
    id: string;
    name: string;
    displayName: string | null;
    iconImg: string | null;
    bannerImg: string | null;
    description: string | null;
    isBanned: boolean;
    timePublished: string;
    counts: {
        posts: number;
        comments: number;
    },
}

export interface CreatorState {
    currentCreator: Creator | null;
}