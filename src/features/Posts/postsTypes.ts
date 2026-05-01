/* Types */

export interface PostType {
    id: string;
    creator: string;
    creatorId: string;
    creatorAvatar: string | null;
    creatorBanner: string | null;
    creatorBio: string | null;
    timePublished: string;
    community: string;
    title: string;
    text: string | null;
    postUrl: string;
    imgUrl: string | null;
    score: number;
    upvotes: number;
    downvotes: number;
    videoUrl: string | null;
    externalUrl: string | null;
} 


export interface PostsState {
    savedPosts: PostType[];
}
