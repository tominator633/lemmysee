import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./Communities.module.css";
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { submitBtnVar} from "./communitiesFMVariants";
import CommunityCard from "./CommunityCard/CommunityCard";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Outlet } from 'react-router-dom';
import { useAppSelector } from "../../app/reduxHooks";
import { selectSwiperCommunities } from "./communitiesSlice";
import { useSearchCommunitiesQuery } from "./communitiesApi";
import type { Community } from "./communitiesTypes";


export default function Communities(): React.ReactElement {
    
    // searchInput ovládá pouze text v inputu (tzv. "draft")
    const [searchInput, setSearchInput] = useState<string>("");
     // confirmedTerm je to, co skutečně posíláme do API (až po Enteru nebo kliku)
    const [confirmedTerm, setConfirmedTerm] = useState<string>("");
    
    // RTK Query hook - automaticky se spustí, když se změní confirmedTerm
    const { 
        data: searchedResults = [], 
        isFetching, // isFetching je true při každém novém požadavku (i při změně termínu)
        isError,
        refetch 
    } = useSearchCommunitiesQuery(confirmedTerm, { 
        skip: confirmedTerm === "" // Nehledej, pokud je termín prázdný
    });

    const swiperCommunities = useAppSelector(selectSwiperCommunities);
    
    const searchInputRef = useRef<HTMLInputElement | null>(null);


 // Industry standard: Filtrujeme výsledky přímo v komponentě (tzv. Derived State)
    // Nechceme v hledání nabízet komunity, které už uživatel má ve výběru.
    const filteredResults = useMemo(() => {
        return searchedResults.filter(
            (searchResult) => !swiperCommunities.some((myCom) => myCom.id === searchResult.id)
        ).sort((a: Community, b: Community) => b.counts.subscribers - a.counts.subscribers);
    }, [searchedResults, swiperCommunities]);

    


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleSearchFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\sěščřžůú]*$/;
        if (regex.test(event.target.value)) {
            setSearchInput(event.target.value); 
        } else {
            alert("Invalid input. Only alphanumeric characters, specific diacritics and spaces are allowed.");
        }
    };

    const triggerSearch = () => {
        if (searchInput.trim()) {
            setConfirmedTerm(searchInput.trim());
        }
        };
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            triggerSearch();
        }
        };

    return (
        <>
        <LayoutGroup>
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
                                            <motion.div
                                            key={community.id}
                                                layout
                                                layoutId={`community-${community.id}`}
                                              
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ duration: 0.2 }}
                                                role="presentation">
                                                <CommunityCard content={community} 
                                                            
                                                            isSwiperCommunity={true}/>
                                            </motion.div>
                  
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
                            aria-label="Search communities in Post database based on keywords">
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
                                onClick={triggerSearch}
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

                    <motion.div className={styles.searchedCommunities}
                        layout
                        aria-label="Search results"
                        role="region" 
                        aria-live="polite">
                        <AnimatePresence mode="popLayout"> 
                            {isFetching ?
                                <Loading loadingText="Searching communities..."/>
                                : isError ?
                                <ErrorMessage key="error"
                                                message="Request failed."
                                                onClick={refetch} />
                                : confirmedTerm && filteredResults.length === 0 ?
                                <motion.p key="empty" 
                                            initial={{ opacity: 0 }} 
                                            animate={{ opacity: 1 }}>
                                        No communities found
                                </motion.p>
                                :
                                filteredResults.map((community: Community) => {
                                    return (
                                            <motion.div 
                                                key={community.id}
                                                layout
                                                layoutId={`community-${community.id}`}
                                            
                                                initial="hidden"
                                                animate="visible"
                                         
                                                transition={{ duration: 0.2 }}
                                                role="presentation">
                                                <CommunityCard content={community} 
                                                         
                                                            isSwiperCommunity={false}/>
                                            </motion.div>
                                    );
                                })
                            }
                        </AnimatePresence>
                    </motion.div>
                </section>
            </div>
        </LayoutGroup>


            <Outlet/>
        </>
    );
}

/* the Outlet is just below the outermost element, in 
order for the backdrop filter to blur everything in behind */

