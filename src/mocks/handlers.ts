
import { communitiesHandlers } from "./handlers/communitiesHandlers";
import { commentsHandlers } from "./handlers/commentsHandlers";

export const handlers = [
  ...communitiesHandlers,
  ...commentsHandlers,

];