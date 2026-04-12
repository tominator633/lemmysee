import React, { useEffect } from "react";
import styles from "./Reddits.module.css";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { useParams, Outlet, useSearchParams } from 'react-router-dom';
import Reddit from "../Reddit/Reddit";
import { loadReddits, selectResultReddits, selectIsLoading, selectHasError, filterReddits } from "./redditsSlice";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function Reddits(): React.ReactElement {
    const dispatch = useAppDispatch();
    const resultReddits = useAppSelector(selectResultReddits);
    const isLoading = useAppSelector(selectIsLoading);
    const hasError = useAppSelector(selectHasError);
    const { communityName } = useParams<{ communityName?: string }>();
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");

    const redditsToRender = title ? filterReddits(title, resultReddits) : resultReddits;

    useEffect(() => {
        if (communityName) {
            dispatch(loadReddits(communityName));
        }
    }, [dispatch, communityName]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [communityName]);

    const handleErrorBtnClick = (): void => {
        if (communityName) {
            dispatch(loadReddits(communityName));
        }
    };
    
    if (isLoading) {
        return (
            <Loading loadingText="Loading reddits..." />
        );
    } else if (hasError) {
        return (
            <section role="presentation">
                <h2 className={styles.redditsH2}>{communityName}</h2>
                <ErrorMessage 
                    message="Request failed" 
                    onClick={handleErrorBtnClick}
                />
            </section>
        );
    } else {
        return (
            <section role="presentation">
                <h2 className={styles.redditsH2}>{communityName}</h2>
                <section className={styles.reddits}
                        role="region"
                        aria-label={`Reddits from ${communityName}`}>
                    {
                        redditsToRender.length > 0 ?
                            redditsToRender.map((content) => (
                                <Reddit 
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
