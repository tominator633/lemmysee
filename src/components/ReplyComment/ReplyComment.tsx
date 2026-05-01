import React, {useState} from "react";
import styles from "./ReplyComment.module.css";
import { isoToAgo, formatNumberWithSpaces } from "../../utils/utils";
import { motion, AnimatePresence } from 'framer-motion';
import {replyCommentVar} from "../../features/Comments/Comment/commentFMVariants";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import type { Comment } from "../../features/Comments/commentsTypes";

const md = new MarkdownIt();

interface ReplyCommentProps {
    replyContent: Comment;
}

export default function ReplyComment({ replyContent }: ReplyCommentProps): React.ReactElement {
    
    const [repliesButton, setRepliesButton] = useState<boolean>(false);

    const handleRepliesButtonClick = (): void => {
        setRepliesButton(!repliesButton);
    };
    
    const renderSelfText = (): { __html: string } | null => {
        if (replyContent.content) {
            const sanitizedHtml = DOMPurify.sanitize(md.render(replyContent.content));
            return { __html: sanitizedHtml };
        }
        return null;
    };

    return (
        <article className={styles.replyComment} 
                aria-label={`Reply by ${replyContent.author ?? "unknown"}`}>
            <header className={styles.replyCommentInfo}>
                <a
                    className={styles.replyAuthor}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://www.post.com/user/${replyContent.author ?? ""}/`}
                    aria-label={`Visit profile of ${replyContent.author ?? "unknown"}`}
                >
                    {replyContent.author}
                </a>
                <time
                    className={styles.replyTimePosted}
                    aria-label={`Posted ${isoToAgo(replyContent.timePublished ?? 0)}`}
                >
                    {isoToAgo(replyContent.timePublished ?? 0)}
                </time>
            </header>
            <section className={styles.commentContent} 
                        aria-live="polite" 
                        aria-atomic="true">
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
                <p className={styles.score} 
                    aria-label={`the score of this comment is: ${replyContent.score ?? 0}`}>
                    {formatNumberWithSpaces(replyContent.score ?? 0)}
                </p>
                {replyContent.replies.length > 0 && 
                <button onClick={handleRepliesButtonClick} 
                        className={styles.repliesButton}
                        style={repliesButton ? {backgroundColor: "#FF6B6B", color: "white"}:{backgroundColor: "#005792", color: "white"}}
                        aria-expanded={repliesButton} 
                        aria-controls="replies-section"
                        aria-label={repliesButton ? "Collapse replies" : "Expand replies"}>
                            <span>Replies </span>
                            <span>{`(${replyContent.replies.length}) `}</span>
                            {repliesButton && 
                            <span className={styles.closeCross}><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496"/></svg></span>}
                    
                </button>}
            </footer>
            <AnimatePresence>
                {repliesButton && (
                    <section id="replies-section" 
                            aria-label="Replies">
                        {replyContent.replies.map((reply: Comment, index: number) => (
                            <motion.div
                                key={index}
                                variants={replyCommentVar}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                aria-live="polite"
                                aria-atomic="true">
                                <ReplyComment replyContent={reply}
                                                key={index} />
                            </motion.div>
                        ))}
                    </section>
                )}
            </AnimatePresence>
        </article>
    );
}