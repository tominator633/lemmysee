import React, {useEffect} from "react";
import styles from "./SavedReddits.module.css";
import { useAppSelector } from "../../app/reduxHooks";
import { selectSavedReddits, filterReddits, type Reddit } from "../../features/Reddits/redditsSlice";
import { Outlet, useSearchParams } from 'react-router-dom';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import RedditComponent from "../../features/Reddit/Reddit";
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { savedRedditVar } from "./savedRedditsFMVariants";


export default function SavedReddits (): React.ReactElement {

    const savedReddits = useAppSelector(selectSavedReddits);
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");

    const redditsToRender = title ? filterReddits(title, savedReddits) : savedReddits;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
        <h2 className={styles.savedRedditsH2}>{`Saved reddits (${savedReddits.length})`}</h2>
        <section className={styles.savedReddits}
                role="region"
                aria-label="Saved reddits section">
            <AnimatePresence> 
            {
            redditsToRender.length > 0 ?
            redditsToRender.map((content: Reddit) => {
                return (
                    <LayoutGroup key={content.id}>
                        <motion.article className={styles.savedRedditWrapper}
                                    variants={savedRedditVar}
                                    layout
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    role="presentation">
                            <RedditComponent content={content} 
                                    key={content.id} />
                        </motion.article>
                            
                    </LayoutGroup>
                )
            } )
            :
            <ErrorMessage message={title ? "No reddits found for the given input" : "No reddits saved"} />
            }
            </AnimatePresence> 
        </section>
        <Outlet/>
        </>
    )
}


