
import { communitiesHandlers } from "./handlers/communitiesHandlers";
import { commentsHandlers } from "./handlers/commentsHandlers";
import { creatorHandlers } from "./handlers/creatorHandlers";
import { postsHandlers } from "./handlers/postsHandlers";

export const handlers = [
  ...communitiesHandlers,
  ...commentsHandlers,
  ...creatorHandlers,
  ...postsHandlers

];