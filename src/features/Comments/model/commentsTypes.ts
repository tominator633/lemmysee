export interface Comment {
    id: string;
    author: string | null;
    authorId: string;
    content: string;
    timePublished: string;
    score: number;
    path: string;
    postId: string;
    replies: Comment[];
}

