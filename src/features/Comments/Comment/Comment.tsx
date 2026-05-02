import React, { useState } from "react";
import styles from "./Comment.module.css";
import { isoToAgo, formatNumberWithSpaces} from "../../../utils/utils";
import { motion, AnimatePresence } from 'framer-motion';
import {replyCommentVar} from "./commentFMVariants";
import { Link } from "react-router-dom";
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import type { Comment } from "../commentsTypes";

const md = new MarkdownIt();

interface CommentProps {
    content: Comment;
}

export default function Comment ({ content }: CommentProps): React.ReactElement {

    const [repliesButton, setRepliesButton] = useState<boolean>(false);
    
    const handleRepliesButtonClick = (): void => {
        setRepliesButton(!repliesButton);
    };

    // Sanitize and convert selftext markdown to HTML
    const renderSelfText = (): { __html: string } | undefined => {
        if (content.content) {
            const sanitizedHtml = DOMPurify.sanitize(md.render(content.content));
            return { __html: sanitizedHtml };
        }
        return undefined;
    };

    return (
        <article className={styles.comment}
                aria-label={`Comment by ${content.author}`}
                style={repliesButton ? {backgroundColor: "#FEE"} : {backgroundColor: "white"}}>
            <header className={styles.commentInfo}>
                <Link to={`comment_creator/${content.authorId}`}
                        className={styles.commentUser}
                        aria-label={`Visit profile of ${content.author}`}>
                    {content.author}
                </Link>
            
                <time className={styles.commentTimePosted}
                    aria-label={`Posted ${isoToAgo(content.timePublished)}`}>
                        {isoToAgo(content.timePublished)}
                </time>
            </header>
            <section className={styles.commentContent}
                    aria-live="polite" 
                    aria-atomic="true">
                <p  className={styles.commentText}
                    dangerouslySetInnerHTML={renderSelfText()}
                    />
            </section>
            <section className={styles.infoLine}>
                <figure className={styles.arrowUp}
                        role="presentation">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.586 3L4 9.586a2 2 0 0 0-.434 2.18l.068.145A2 2 0 0 0 5.414 13H8v7a2 2 0 0 0 2 2h4l.15-.005A2 2 0 0 0 16 20l-.001-7h2.587A2 2 0 0 0 20 9.586L13.414 3a2 2 0 0 0-2.828 0"></path></svg>
                </figure>
                <p className={styles.score}
                    aria-label={`the score of this comment is: ${content.score}`}>{formatNumberWithSpaces(content.score || 0)}</p>
            
                {content.replies.length > 0 && 
                <button onClick={handleRepliesButtonClick} 
                        className={styles.repliesButton}
                        style={repliesButton ? {backgroundColor: "#FF6B6B", color: "white"}:{backgroundColor: "#005792", color: "white"}}
                        aria-expanded={repliesButton} 
                        aria-controls="replies-section"
                        aria-label={repliesButton ? "Collapse replies" : "Expand replies"}>
                            <span>Replies </span>
                            <span>{`(${content.replies.length}) `}</span>
                            {repliesButton && 
                            <span className={styles.closeCross}><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496"/></svg></span>}
                    
                </button>}
            </section>
            <AnimatePresence>
                {repliesButton && (
                    <section id="replies-section" 
                            aria-label="Replies">
                        {content.replies.map((reply: Comment, index: number) => (
                            <motion.div
                                key={index}
                                variants={replyCommentVar}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                aria-live="polite"
                                aria-atomic="true">
                                <Comment content={reply}
                                        key={index} />
                            </motion.div>
                        ))}
                    </section>
                )}
            </AnimatePresence>
        </article>
    );
}