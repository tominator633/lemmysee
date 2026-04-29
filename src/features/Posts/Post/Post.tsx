import React , { useEffect, useRef, useState } from "react";
import styles from "./Post.module.css";
import { Link } from "react-router-dom";
import { setCurrentPost, loadComments } from "../../Comments/commentsSlice";
import { savePost, unsavePost, selectSavedPosts } from "../postsSlice";
import { useAppDispatch,  useAppSelector } from "../../../app/reduxHooks";
import {  isoToAgo, formatNumberWithSpaces } from "../../../utils/utils";
import { MediaPlayer } from 'dashjs';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify'; 
import { type PostType } from "../postsSlice";
import { getCreator } from "../../Creator/creatorSlice";
const md = new MarkdownIt(); 

interface PostProps {
    content: PostType;
}

export default function Post ({ content }: PostProps): React.ReactElement {

    const dispatch = useAppDispatch();
    const savedPosts = useAppSelector(selectSavedPosts);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [urlImgError, setUrlImgError] = useState<boolean>(false)

    const handleCreatorClick = (): void => {
        dispatch(getCreator(content.creatorId));
    };
    const handleDetailsClick = (): void => {
        dispatch(setCurrentPost(content));
        dispatch(loadComments(content.id));
    };
    const handleSavePostBtnClick = (): void => {
        dispatch(savePost(content));
    };
    const handleUnsavePostBtnClick = (): void => {
        dispatch(unsavePost({ id: content.id }));
    };

    useEffect(() => {
        if (content.videoUrl && videoRef.current) {
            const player = MediaPlayer().create();
            player.initialize(videoRef.current, content.videoUrl, false);
        }

        return () => {
            if (videoRef.current) {
                const player = MediaPlayer().create();
                player.reset();
            }
        };
    }, [content.videoUrl]);

    const renderSelfText = (): { __html: string } | null => {
        if (content.text) {
            const sanitizedHtml = DOMPurify.sanitize(md.render(content.text));
            return { __html: sanitizedHtml };
        }
        return null;
    };

    return (
        <article className={styles.post} 
            id={content.id}
            aria-label={`A post by ${content.creator}`}>
            <div className={styles.votesColumn} 
                role="presentation">
                <figure className={styles.arrowUp}
                        aria-hidden="true">
                    <span aria-label={`${content.upvotes} upvotes`}>{content.upvotes}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><path fill="currentColor" d="M10 2.5L16.5 9H13v8H7V9H3.5z"></path></svg>
                </figure>
                <p className={styles.votes} 
                    aria-label={`The score of this post is ${content.score}`}>{formatNumberWithSpaces(content.score)}</p>
                <figure className={styles.arrowDown}
                        aria-hidden="true">
                    <span aria-label={`${content.downvotes} upvotes`}>{content.downvotes}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><path fill="currentColor" d="M10 17.5L3.5 11H7V3h6v8h3.5z"></path></svg>
                    
                    
                </figure>
            </div>

            <div className={styles.postColumn} 
                    role="presentation">
                <div className={styles.postInfo} 
                    role="presentation">
                    <Link className={styles.postUser}
                        to={`creator/${content.creatorId}`}
                        aria-label={`The link to user profile of ${content.creator}`}
                        onClick={handleCreatorClick}>
                            {content.creator}
                    </Link>
                    <time className={styles.postTimePosted}>{isoToAgo(content.timePublished)}</time>
                </div>

                <div className={styles.postContent}
                        role="presentation">
                    <h4 className={styles.postTitle}>{content.title}</h4>
                    
                    {/* content has selftext */}
                    {content.text && renderSelfText() && (
                        <p  className={styles.selftextContent}
                            dangerouslySetInnerHTML={renderSelfText() as { __html: string }}  // Use the renderSelfText method
                            aria-label={content.text}
                        />
                    )}

                    {(content.externalUrl && !content.imgUrl) && 
                    <a className={styles.externalContentNoImg} 
                        href={content.externalUrl} 
                        target="_blank" 
                        rel="noreferrer noopener"
                        aria-label={`External link included in this post of title: ${content.title}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 17q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h3q.425 0 .713.288T11 8t-.288.713T10 9H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h3q.425 0 .713.288T11 16t-.288.713T10 17zm2-4q-.425 0-.712-.288T8 12t.288-.712T9 11h6q.425 0 .713.288T16 12t-.288.713T15 13zm5 4q-.425 0-.712-.288T13 16t.288-.712T14 15h3q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-3q-.425 0-.712-.288T13 8t.288-.712T14 7h3q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z"></path></svg>
                    </a>} 

                    {(content.externalUrl && content.imgUrl && !urlImgError) && 
                    <a className={styles.externalContentImg} 
                        href={content.externalUrl} 
                        target="_blank" 
                        rel="noreferrer noopener"
                        aria-label={`External link included in this post of title: ${content.title}`}>
                            <img src={content.imgUrl} 
                                alt={content.title}
                                onError={() => {setUrlImgError(true)}}/>
                        <figure aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 17q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h3q.425 0 .713.288T11 8t-.288.713T10 9H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h3q.425 0 .713.288T11 16t-.288.713T10 17zm2-4q-.425 0-.712-.288T8 12t.288-.712T9 11h6q.425 0 .713.288T16 12t-.288.713T15 13zm5 4q-.425 0-.712-.288T13 16t.288-.712T14 15h3q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-3q-.425 0-.712-.288T13 8t.288-.712T14 7h3q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z"></path></svg>
                        </figure>
                        
                    </a>}
                    {(content.externalUrl && content.imgUrl && urlImgError) && 
                    <a className={styles.externalContentNoImg} 
                        href={content.externalUrl} 
                        target="_blank" 
                        rel="noreferrer noopener"
                        aria-label={`External link included in this post of title: ${content.title}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 17q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h3q.425 0 .713.288T11 8t-.288.713T10 9H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h3q.425 0 .713.288T11 16t-.288.713T10 17zm2-4q-.425 0-.712-.288T8 12t.288-.712T9 11h6q.425 0 .713.288T16 12t-.288.713T15 13zm5 4q-.425 0-.712-.288T13 16t.288-.712T14 15h3q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-3q-.425 0-.712-.288T13 8t.288-.712T14 7h3q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z"></path></svg>
                    </a>}

                     {(content.imgUrl && !content.externalUrl) && 
                        <a className={styles.imgContent}
                            href={content.imgUrl}
                            target="_blank"
                            rel="noreferrer noopener" 
                            aria-label="External link of this post">
                            <img src={content.imgUrl}
                                alt={`The image content of ${content.title}`}/>
                        </a>
                    } 

                    {content.videoUrl && 
                        <video
                            ref={videoRef}
                            className={styles.videoContent} 
                            controls 
                            preload="metadata" 
                            aria-label="Video content"
                        />
                    } 
                </div>
            </div>

            <div className={styles.rightColumn} 
                    role="presentation">
                <Link to={`${content.id}`}  
                      onClick={handleDetailsClick}
                      className={`${styles.commentsButton} ${styles.postRightColumnBtn}`}
                      aria-label="go to post detail window with comments section">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                        <path fill="currentColor" d="M16 11.1c0-1.5-1.5-2.8-3.2-3.3c-1.3 1.5-3.9 2.4-6.4 2.4h-.5c-.1.3-.1.5-.1.8c0 2 2.2 3.6 5 3.6h.6c.4.5 1.7 1.4 3.4 1.4c0 0-.8-.4-.8-1.8c0-.6 2-1.8 2-3.1"></path>
                        <path fill="currentColor" d="M13 4.6C13 2.1 10.2 0 6.6 0S0 2.1 0 4.6c0 1.7 2 3.2 3 4C3 10.4 1.6 11 1.6 11c2.3 0 3.6-1.1 4.2-1.8h.8c3.5.1 6.4-2 6.4-4.6"></path>
                    </svg>
                </Link>
                <a className={`${styles.postLink} ${styles.postRightColumnBtn}`}
                    href={content.postUrl}
                   target="_blank"
                   rel="noreferrer noopener"
                   aria-label="view this post on the official Post platform (link)">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
                    </svg>
                </a>
                {savedPosts.some(post => post.id === content.id) ?
                <button className={`${styles.unsavePostBtn} ${styles.postRightColumnBtn}`}
                        onClick={handleUnsavePostBtnClick}
                        aria-label="unsave this post">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M418.9 0H93.1C80.2 0 69.8 10.4 69.8 23.3V512L256 325.8L442.2 512V23.3c0-12.9-10.4-23.3-23.3-23.3m-46.5 186.2H139.6v-46.5h232.7v46.5z"/></svg>
                </button>
                :
                <button className={`${styles.savePostBtn} ${styles.postRightColumnBtn}`}
                        onClick={handleSavePostBtnClick}
                        aria-label="save this post">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M432.9 0H107.1C94.3 0 83.8 10.4 83.8 23.3V512L270 325.8L456.2 512V23.3c0-12.9-10.4-23.3-23.3-23.3m-46.5 186.2h-93.1v93.1h-46.5v-93.1h-93.1v-46.5h93.1V46.5h46.5v93.1h93.1z"/></svg>                
                </button>
                }
            </div>
        </article>
    );
}