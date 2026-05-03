
import { type ApiCommentView } from "../api/commentsApiTypes";



const extractParentId = (path: string): number | null => {
  const partsArr = path.split(".");
  if (partsArr.length < 3) return null;
  return Number(partsArr[partsArr.length - 2]);
}




export const mapApiCommentViewToCommentDomain = (apiCommentView: ApiCommentView) => ({
            id: String(apiCommentView.comment.id),
            parentId: extractParentId(apiCommentView.comment.path),
            author: apiCommentView.creator.name,
            authorId: String(apiCommentView.creator.id),
            content: apiCommentView.comment.content,
            timePublished: apiCommentView.comment.published,
            score: apiCommentView.counts.score,
            path: apiCommentView.comment.path,
            postId: String(apiCommentView.comment.post_id),
            replies: [],
          })