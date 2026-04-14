import React from "react";
import styles from "./ReplyComment.module.css";
import { epochToAgo, formatNumberWithSpaces } from "../../utils/utils";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import type { Reply } from "../../features/Comments/commentsSlice";

const md = new MarkdownIt();

interface ReplyCommentProps {
    replyContent: Reply;
}

export default function ReplyComment({ replyContent }: ReplyCommentProps): React.ReactElement {
    const renderSelfText = (): { __html: string } | null => {
        if (replyContent.rBody) {
            const sanitizedHtml = DOMPurify.sanitize(md.render(replyContent.rBody));
            return { __html: sanitizedHtml };
        }
        return null;
    };

    return (
        <article className={styles.replyComment} aria-label={`Reply by ${replyContent.rAuthor ?? "unknown"}`}>
            <header className={styles.replyCommentInfo}>
                <a
                    className={styles.replyAuthor}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://www.post.com/user/${replyContent.rAuthor ?? ""}/`}
                    aria-label={`Visit profile of ${replyContent.rAuthor ?? "unknown"}`}
                >
                    {replyContent.rAuthor}
                </a>
                <time
                    className={styles.replyTimePosted}
                    aria-label={`Posted ${epochToAgo(replyContent.rCreated ?? 0)}`}
                >
                    {epochToAgo(replyContent.rCreated ?? 0)}
                </time>
            </header>
            <section className={styles.commentContent} aria-live="polite" aria-atomic="true">
                <p
                    className={styles.replyCommentText}
                    dangerouslySetInnerHTML={renderSelfText() ?? undefined}
                />
            </section>
            <footer className={styles.infoLine}>
                <figure className={styles.arrowUp} role="presentation">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M10.586 3L4 9.586a2 2 0 0 0-.434 2.18l.068.145A2 2 0 0 0 5.414 13H8v7a2 2 0 0 0 2 2h4l.15-.005A2 2 0 0 0 16 20l-.001-7h2.587A2 2 0 0 0 20 9.586L13.414 3a2 2 0 0 0-2.828 0"></path>
                    </svg>
                </figure>
                <p className={styles.score} aria-label={`the score of this comment is: ${replyContent.rScore ?? 0}`}>
                    {formatNumberWithSpaces(replyContent.rScore ?? 0)}
                </p>
            </footer>
        </article>
    );
}