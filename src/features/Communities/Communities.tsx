import React, { useState, useRef, useEffect } from "react";
import styles from "./Communities.module.css";
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { submitBtnVar, myCommunityVar, searchedCommunityVar } from "./communitiesFMVariants";
import Community from "../../components/Community/Community";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import { selectSwiperCommunities, selectSearchedCommunities, searchCommunities, selectIsSearchCommunitiesLoading, selectHasSearchCommunitiesError } from "./communitiesSlice";

export default function Communities(): React.ReactElement {

    const dispatch = useAppDispatch();

    const swiperCommunities = useAppSelector(selectSwiperCommunities);
    const searchedCommunities = useAppSelector(selectSearchedCommunities);
    const isSearchCommunitiesLoading = useAppSelector(selectIsSearchCommunitiesLoading);
    const hasSearchCommunitiesError = useAppSelector(selectHasSearchCommunitiesError);

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

    const handleSubmitSearchCommunitiesBtnClick = (): void => {
        const sanitizedInput = sanitizeInput(searchInput);
        const encodedInput = encodeURIComponent(sanitizedInput);
        dispatch(searchCommunities(encodedInput));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
        if (event.key === 'Enter' && searchInput) {
            event.preventDefault();
            const sanitizedInput = sanitizeInput(searchInput);
            const encodedInput = encodeURIComponent(sanitizedInput);
            dispatch(searchCommunities(encodedInput));
        }
    };

    const handleErrorSearchSubmitReloadClick = (): void => {
        const sanitizedInput = sanitizeInput(searchInput);
        const encodedInput = encodeURIComponent(sanitizedInput);
        dispatch(searchCommunities(encodedInput));
    };

    return (
        <>
            <div className={styles.srManagerCon}
                role="presentation">
                <section className={styles.myCommunitiesCon}
                        aria-label="My communities selection section">
                    <h2 className={styles.myCommunitiesH2}>My Communities selection</h2>
                    <div className={styles.myCommunities}
                        role="presentation">
                        <AnimatePresence> 
                            {swiperCommunities.length > 0 ?
                                swiperCommunities.map((community) => {
                                    return (
                                        <LayoutGroup key={community.id}>
                                            <motion.div 
                                                variants={myCommunityVar}
                                                layout
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 0.2 }}
                                                role="presentation">
                                                <Community content={community} 
                                                            key={community.id}
                                                            isSwiperCommunity={true}/>
                                            </motion.div>
                                        </LayoutGroup>
                                    );
                                })
                                :
                                <ErrorMessage message="You have no communities in your selection." />
                            }
                        </AnimatePresence>
                    </div>
                </section>
                <section className={styles.searchCommunitiesCon}
                        aria-label="Explore communities section">
                    <h2 className={styles.searchCommunitiesH2}>Explore communities</h2>
                    <search className={styles.searchCommunitiesSection}
                            onKeyDown={handleKeyDown}
                            role="search"
                            aria-label="Search communities in Reddit database based on keywords">
                        <input className={styles.searchField} 
                                aria-label="search field for your query"
                                aria-required="true"
                                onChange={handleSearchFieldChange}
                                id="searchCommunitiesField"
                                value={searchInput}
                                ref={searchInputRef}
                                placeholder="Search communities here"
                                maxLength={60}
                                pattern="[A-Za-z0-9\s]+"
                                title="Alphanumeric characters only"/>
                    </search>
                    <AnimatePresence>
                        {searchInput &&
                            <motion.button 
                                className={styles.submitSearchCommunitiesBtn}
                                onClick={handleSubmitSearchCommunitiesBtnClick}
                                aria-label="Submit community search"
                                variants={submitBtnVar}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
                            </motion.button>
                        }
                    </AnimatePresence>
                    <div className={styles.searchedCommunities}
                        aria-label="Search results"
                        role="region" 
                        aria-live="polite">
                        <AnimatePresence> 
                            {isSearchCommunitiesLoading ?
                                <Loading loadingText="Loading communities..."/>
                                : hasSearchCommunitiesError ?
                                <ErrorMessage message="Request failed."
                                                onClick={handleErrorSearchSubmitReloadClick} />
                                : searchedCommunities.length === 0 ?
                                <p>No communities found</p>
                                :
                                searchedCommunities.map((community) => {
                                    return (
                                        <LayoutGroup key={community.id}>
                                            <motion.div 
                                                variants={searchedCommunityVar}
                                                layout
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 0.2 }}
                                                role="presentation">
                                                <Community content={community} 
                                                            key={community.id}
                                                            isSwiperCommunity={false}/>
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

