import React, {useState, useEffect} from "react";
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./PostDetailWindow.module.css";
import Comment from "../../components/Comment/Comment";
import { useParams, useNavigate } from "react-router-dom";
import { selectCurrentPost,loadComments, selectComments, emptyComments, selectIsCommentsLoading, selectHasCommentsError } from "./commentsSlice";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { epochToAgo, formatNumberWithSpaces} from "../../utils/utils";
import {windowBarrierVar, postDetailWindowVar, commentVar} from "./commentsFMVariants";



/* this interface must be specific for each call of useParams hook. 
in this file the situation orders postId to be string for sure, 
so it is save to get types of the entire object with params specified with
the Record utility type and put additional constraint that postId is string,
not string | undefined.*/
interface RouteParams extends Record<string, string | undefined> {
    postId: string
}

export default function PostDetailWindow (): React.ReactElement {

    const [isVisible, setIsVisible] = useState<boolean>(true);
    const {postId} = useParams<RouteParams>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentPost = useAppSelector(selectCurrentPost);
    const comments = useAppSelector(selectComments);
    const isCommentsLoading = useAppSelector(selectIsCommentsLoading);
    const hasCommentsError = useAppSelector(selectHasCommentsError);

    const handleCloseButtonClick = (): void => {
        setIsVisible(false);
    };

    const handleErrorCommentsReloadBtn = (): void => {
        if (currentPost) {
            dispatch(loadComments(currentPost.permalink));
        }
    }

    useEffect((): (() => void) => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") handleCloseButtonClick();
        };
        if (isVisible) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isVisible]);

    if (!currentPost) {
        return (
            <AnimatePresence>
                <motion.div className={styles.windowBarrier} role="presentation">
                    <motion.section className={styles.postDetailWindow} role="dialog" aria-label="post window with comments" aria-modal="true" tabIndex={-1}>
                        <Loading loadingText="Loading post details..." />
                    </motion.section>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence onExitComplete={(): void => {
            dispatch(emptyComments());
            navigate(-1);
        }}>
            {
            isVisible &&
            <motion.div id={postId} 
                        className={styles.windowBarrier} 
                        role="presentation"
                        variants={windowBarrierVar}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
            >
            <motion.section className={styles.postDetailWindow} 
                    role="dialog" 
                    aria-label="post window with comments"
                    aria-modal="true"
                    tabIndex={-1}
                    variants={postDetailWindowVar}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    >
                <button onClick={handleCloseButtonClick} 
                        className={`${styles.closeBtn} ${styles.clearfix}`}
                        aria-label="close this window"
                        tabIndex={0}>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496"/></svg>
                </button>
                <div className={styles.postDetail} 
                    aria-label="post info">
                    <div className={styles.postInfoLine} 
                            role="presentation">
                        <div className={styles.scoreDiv}
                            role="presentation">
                            <figure className={styles.arrowUp}
                                    role="presentation">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.586 3L4 9.586a2 2 0 0 0-.434 2.18l.068.145A2 2 0 0 0 5.414 13H8v7a2 2 0 0 0 2 2h4l.15-.005A2 2 0 0 0 16 20l-.001-7h2.587A2 2 0 0 0 20 9.586L13.414 3a2 2 0 0 0-2.828 0"></path></svg>
                            </figure>
                            <p className={styles.votes} 
                                aria-label={`The score of this post is ${currentPost.score}`}>{formatNumberWithSpaces(currentPost.score)}</p>
                        </div>
                        <a className={styles.postUser}
                            target="_blank"
                            rel="noreferrer noopener" 
                            href={`https://www.post.com/user/${currentPost.user}/`}
                            aria-label={`View ${currentPost.user}'s profile on Post in a new tab`}>{currentPost.user}</a>
                        <p className={styles.postTimePosted}
                            aria-label={`Posted ${epochToAgo(currentPost.created)}`}>{epochToAgo(currentPost.created)}</p>

                    </div>
                    <div className={styles.postTitle} 
                        role="presentation">
                        <h4>{currentPost.title}</h4>
                    </div>
                </div>
                <h2 className={styles.commentsH2}>{`Comments (${comments.length})`}</h2>
                <div className={styles.commentsSection}
                    aria-live="polite">
                    <AnimatePresence>
                    {isCommentsLoading ? 
                    <Loading loadingText="Loading comments..."/> 
                    :
                    hasCommentsError ?
                    <ErrorMessage message="Request failed."
                                    onClick={handleErrorCommentsReloadBtn}/>
                    :
                    comments.length === 0 ?
                    <p className={styles.noComments}>This post has no comments</p>
                    :
                    comments.map((content, index) => {
                            return <motion.div  variants={commentVar}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden" 
                                                
                                                role="presentation">
                            
                                            <Comment content={content} 
                                                    key={index}
                                                        />
                                    </motion.div>
                    }) }
                    </AnimatePresence>
                    
                </div>
            </motion.section>
        </motion.div>
            }
        </AnimatePresence>
    )
}