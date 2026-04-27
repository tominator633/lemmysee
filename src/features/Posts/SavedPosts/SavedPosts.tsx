import React, {useEffect} from "react";
import styles from "./SavedPosts.module.css";
import { useAppSelector } from "../../../app/reduxHooks";
import { selectSavedPosts, filterPosts, type Post } from "../postsSlice";
import { Outlet, useSearchParams } from 'react-router-dom';
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import PostComponent from "../Post/Post";
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { savedPostVar } from "./savedPostsFMVariants";


export default function SavedPosts (): React.ReactElement {

    const savedPosts = useAppSelector(selectSavedPosts);
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");

    const postsToRender = title ? filterPosts(title, savedPosts) : savedPosts;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
        <h2 className={styles.savedPostsH2}>{`Saved posts (${savedPosts.length})`}</h2>
        <section className={styles.savedPosts}
                role="region"
                aria-label="Saved posts section">
            <AnimatePresence> 
            {
            postsToRender.length > 0 ?
            postsToRender.map((content: Post) => {
                return (
                    <LayoutGroup key={content.id}>
                        <motion.article className={styles.savedPostWrapper}
                                    variants={savedPostVar}
                                    layout
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    role="presentation">
                            <PostComponent content={content} 
                                    key={content.id} />
                        </motion.article>
                            
                    </LayoutGroup>
                )
            } )
            :
            <ErrorMessage message={title ? "No posts found for the given input" : "No posts saved"} />
            }
            </AnimatePresence> 
        </section>
        <Outlet/>
        </>
    )
}