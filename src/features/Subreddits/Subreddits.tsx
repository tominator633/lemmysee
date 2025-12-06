import React, { useState, useRef, useEffect } from "react";
import styles from "./Subreddits.module.css";
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { submitBtnVar, mySubredditVar, searchedSubredditVar } from "./subredditsFMVariants";
import Subreddit from "../../components/Subreddit/Subreddit";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { selectSwiperSubreddits, selectSearchedSubreddits, searchSubreddits, selectIsSearchSubredditsLoading, selectHasSearchSubredditsError } from "./subredditsSlice";

export default function Subreddits(): React.ReactElement {

    const dispatch = useAppDispatch();

    const swiperSubreddits = useAppSelector(selectSwiperSubreddits);
    const searchedSubreddits = useAppSelector(selectSearchedSubreddits);
    const isSearchSubredditsLoading = useAppSelector(selectIsSearchSubredditsLoading);
    const hasSearchSubredditsError = useAppSelector(selectHasSearchSubredditsError);

    const [searchInput, setSearchInput] = useState<string>("");
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const sanitizeInput = (input: string): string => {
        const tempElement = document.createElement('div');
        tempElement.textContent = input; // Sanitizes input
        return tempElement.innerHTML;
    };

    const handleSearchFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\sěščřžůú]*$/;
        if (regex.test(event.target.value)) {
            setSearchInput(event.target.value); 
        } else {
            alert("Invalid input. Only alphanumeric characters, specific diacritics and spaces are allowed.");
        }
    };

    const handleSubmitSearchSubredditsBtnClick = (): void => {
        const sanitizedInput = sanitizeInput(searchInput);
        const encodedInput = encodeURIComponent(sanitizedInput);
        dispatch(searchSubreddits(encodedInput));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
        if (event.key === 'Enter' && searchInput) {
            event.preventDefault();
            const sanitizedInput = sanitizeInput(searchInput);
            const encodedInput = encodeURIComponent(sanitizedInput);
            dispatch(searchSubreddits(encodedInput));
        }
    };

    const handleErrorSearchSubmitReloadClick = (): void => {
        const sanitizedInput = sanitizeInput(searchInput);
        const encodedInput = encodeURIComponent(sanitizedInput);
        dispatch(searchSubreddits(encodedInput));
    };

    return (
        <>
            <div className={styles.srManagerCon}
                role="presentation">
                <section className={styles.mySubredditsCon}
                        aria-label="My subreddits selection section">
                    <h2 className={styles.mySubredditsH2}>My Subreddits selection</h2>
                    <div className={styles.mySubreddits}
                        role="presentation">
                        <AnimatePresence> 
                            {swiperSubreddits.length > 0 ?
                                swiperSubreddits.map((subreddit) => {
                                    return (
                                        <LayoutGroup key={subreddit.id}>
                                            <motion.div 
                                                variants={mySubredditVar}
                                                layout
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 0.2 }}
                                                role="presentation">
                                                <Subreddit content={subreddit} 
                                                            key={subreddit.id}
                                                            isSwiperSubreddit={true}/>
                                            </motion.div>
                                        </LayoutGroup>
                                    );
                                })
                                :
                                <ErrorMessage message="You have no subreddits in your selection." />
                            }
                        </AnimatePresence>
                    </div>
                </section>
                <section className={styles.searchSubredditsCon}
                        aria-label="Explore subreddits section">
                    <h2 className={styles.searchSubredditsH2}>Explore subreddits</h2>
                    <search className={styles.searchSubredditsSection}
                            onKeyDown={handleKeyDown}
                            role="search"
                            aria-label="Search subreddits in Reddit database based on keywords">
                        <input className={styles.searchField} 
                                aria-label="search field for your query"
                                aria-required="true"
                                onChange={handleSearchFieldChange}
                                id="searchSubredditsField"
                                value={searchInput}
                                ref={searchInputRef}
                                placeholder="Search subreddits here"
                                maxLength={60}
                                pattern="[A-Za-z0-9\s]+"
                                title="Alphanumeric characters only"/>
                    </search>
                    <AnimatePresence>
                        {searchInput &&
                            <motion.button 
                                className={styles.submitSearchSubredditsBtn}
                                onClick={handleSubmitSearchSubredditsBtnClick}
                                aria-label="Submit subreddit search"
                                variants={submitBtnVar}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
                            </motion.button>
                        }
                    </AnimatePresence>
                    <div className={styles.searchedSubreddits}
                        aria-label="Search results"
                        role="region" 
                        aria-live="polite">
                        <AnimatePresence> 
                            {isSearchSubredditsLoading ?
                                <Loading loadingText="Loading subreddits..."/>
                                : hasSearchSubredditsError ?
                                <ErrorMessage message="Request failed."
                                                onClick={handleErrorSearchSubmitReloadClick} />
                                : searchedSubreddits.length === 0 ?
                                <p>No subreddits found</p>
                                :
                                searchedSubreddits.map((subreddit) => {
                                    return (
                                        <LayoutGroup key={subreddit.id}>
                                            <motion.div 
                                                variants={searchedSubredditVar}
                                                layout
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 0.2 }}
                                                role="presentation">
                                                <Subreddit content={subreddit} 
                                                            key={subreddit.id}
                                                            isSwiperSubreddit={false}/>
                                            </motion.div>
                                        </LayoutGroup>
                                    );
                                })
                            }
                        </AnimatePresence>
                    </div>
                </section>
            </div>
            <Outlet/>
        </>
    );
}

/* the Outlet is just below the outermost element, in 
order for the backdrop filter to blur everything in behind */

