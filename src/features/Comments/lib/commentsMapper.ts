
import { type ApiCommentView } from "../api/commentsApiTypes";


export const mapApiCommentViewToCommentDomain = (apiCommentView: ApiCommentView) => ({
            id: String(apiCommentView.comment.id),
            author: apiCommentView.creator.name,
            authorId: String(apiCommentView.creator.id),
            content: apiCommentView.comment.content,
            timePublished: apiCommentView.comment.published,
            score: apiCommentView.counts.score,
            path: apiCommentView.comment.path,
            postId: String(apiCommentView.comment.post_id),
            replies: [],
          })