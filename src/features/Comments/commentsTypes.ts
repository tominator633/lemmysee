import { type PostType } from "../Posts/postsTypes";

/* Types */

export interface Comment {
    id: string;
    parentId: number | null;
    author: string | null;
    authorId: string;
    content: string | null;
    timePublished: string;
    score: number | null;
    path: string;
    postId: string;
    replies: Comment[];
}


export interface CommentsState {
    currentPost: PostType | null;
    comments: Comment[];
}