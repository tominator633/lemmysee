import React, { useEffect } from "react";
import styles from "./Posts.module.css";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { useParams, Outlet, useSearchParams } from 'react-router-dom';
import Post from "../Post/Post";
import { loadPosts, selectResultPosts, selectIsLoading, selectHasError, filterPosts } from "./postsSlice";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function Posts(): React.ReactElement {
    const dispatch = useAppDispatch();
    const resultPosts = useAppSelector(selectResultPosts);
    const isLoading = useAppSelector(selectIsLoading);
    const hasError = useAppSelector(selectHasError);
    const { communityName } = useParams<{ communityName?: string }>();
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");

    const postsToRender = title ? filterPosts(title, resultPosts) : resultPosts;

    useEffect(() => {
        if (communityName) {
            dispatch(loadPosts(communityName));
        }
    }, [dispatch, communityName]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [communityName]);

    const handleErrorBtnClick = (): void => {
        if (communityName) {
            dispatch(loadPosts(communityName));
        }
    };
    
    if (isLoading) {
        return (
            <Loading loadingText="Loading posts..." />
        );
    } else if (hasError) {
        return (
            <section role="presentation">
                <h2 className={styles.postsH2}>{communityName}</h2>
                <ErrorMessage 
                    message="Request failed" 
                    onClick={handleErrorBtnClick}
                />
            </section>
        );
    } else {
        return (
            <section role="presentation">
                <h2 className={styles.postsH2}>{communityName}</h2>
                <section className={styles.posts}
                        role="region"
                        aria-label={`Posts from ${communityName}`}>
                    {
                        postsToRender.length > 0 ?
                            postsToRender.map((content) => (
                                <Post 
                                    content={content} 
                                    key={content.id} 
                                />
                            ))
                            :
                            <ErrorMessage message="No results" />
                    }
                </section>
                <Outlet />
            </section>
        );
    }
}
