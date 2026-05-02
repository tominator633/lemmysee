import React, { useEffect, useMemo } from "react";
import styles from "./Posts.module.css";
import { useAppSelector } from "../../app/reduxHooks";
import { useParams, Outlet, useSearchParams } from 'react-router-dom';
import Post from "./Post/Post";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { selectSwiperCommunities} from "../Communities/communitiesSlice";
import { type Community  } from "../Communities/communitiesTypes";
import { useGetPostsByCommunityQuery } from "./postsApi";


export default function Posts(): React.ReactElement {

    const { communityId } = useParams<{ communityId?: string }>();
    const swiperCommunities = useAppSelector(selectSwiperCommunities);
    const targetCommunity: Community | undefined = swiperCommunities.find(community => community.id === communityId);
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");

    const {
        data: posts = [],
        isFetching,
        isError,
        refetch,
      } = useGetPostsByCommunityQuery({ communityId: communityId! }, {
        skip: !communityId,
      });

    const postsToRender = useMemo(() => {
        if (!title) return posts;
        return posts.filter((post) =>
        post.title.toLowerCase().includes(title.toLowerCase())
        );
    }, [posts, title]);




/*     useEffect(() => {
        if (targetCommunity) {
            dispatch(loadPosts(targetCommunity.id));
        }
    }, [dispatch, targetCommunity]); */



    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [communityId]);


    
    if (isFetching) {
        return (
            <Loading loadingText="Loading posts..." />
        );
    } else if (isError) {
        return (
            <section role="presentation">
                <h2 className={styles.postsH2}>{targetCommunity?.name}</h2>
                <ErrorMessage 
                    message="Request failed" 
                    onClick={refetch}
                />
            </section>
        );
    } else {
        return (
            <section role="presentation">
                <h2 className={styles.postsH2}>
                    {targetCommunity?.headerTitle || targetCommunity?.name}
                </h2>
                <section className={styles.posts}
                        role="region"
                        aria-label={`Posts from ${targetCommunity?.name}`}>
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
