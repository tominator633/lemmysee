import React, { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../app/reduxHooks";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";
import SubredditsSwiper from "../SubredditsSwiper/SubredditsSwiper";
import { useNavigate, createSearchParams, useParams, NavLink, useSearchParams, useLocation } from "react-router-dom";
import { searchBtnVar, searchRedditsFormVar, searchRedditsFieldVar } from "./headerFMVariants";
import { selectSavedReddits } from "../../features/Reddits/redditsSlice";

export default function Header(): React.ReactElement {
    const isBelow900px = useMediaQuery({ query: "(max-width: 900px)" });

    const savedReddits = useAppSelector(selectSavedReddits);

    const navigate = useNavigate();
    const { subredditName } = useParams<{ subredditName?: string }>();
    const location = useLocation();
    const path = location.pathname;

    const [searchBtn, setSearchBtn] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [, setSearchParams] = useSearchParams();
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const handleSavedRedditsBtnClick = (): void => {
        setSearchBtn(false);
        setSearchInput("");
    };

    const handleSearchBtnClick = (): void => {
        setSearchBtn(!searchBtn);
        const query = { title: "" };
        const queryString = createSearchParams(query).toString();
        if (subredditName) {
            navigate({
                pathname: `/${subredditName}`,
                search: `?${queryString}`,
            });
        }
        if (path === "/saved") {
            navigate({
                pathname: `/saved`,
                search: `?${queryString}`,
            });
        }
    };

    const handleCloseSearchBtnClick = (): void => {
        setSearchBtn(!searchBtn);
        setSearchInput("");
        if (subredditName) navigate(subredditName);
        if (path === "/saved") navigate("/saved");
    };

    const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchInput(value);
        setSearchParams({ title: value });
        if (subredditName && !value) {
            navigate(subredditName);
        }
        if (path === "/saved" && !value) {
            navigate("/saved");
        }
    };

    useEffect(() => {
        if (path === "/saved" && savedReddits.length === 0) {
            setSearchBtn(false);
        }
    }, [path, savedReddits.length]);

    useEffect(() => {
        if (searchBtn && searchInputRef.current) {
            requestAnimationFrame(() => {
                searchInputRef.current?.focus();
            });
        }
    }, [searchBtn]);

    return (
        <header className={styles.appHeader} id="header" aria-label="App header">
            <section className={styles.mainLine} role="presentation">
                <div id={styles.headline} role="presentation">
                    <figure id={styles.logo} aria-hidden="true">
                        <svg role="img" aria-labelledby="logotitle" xmlns="http://www.w3.org/2000/svg" width="1.06em" height="1em" viewBox="0 0 1792 1696">
                            <title id="logotitle">Reddit logo pink</title>
                            <path fill="currentColor" d="M1792 846q0 58-29.5 105.5T1683 1024q12 46 12 96q0 155-106.5 287T1298 1615.5T898 1692t-399.5-76.5t-290-208.5T102 1120q0-47 11-94q-51-25-82-73.5T0 846q0-82 58-140.5T199 647q85 0 145 63q218-152 515-162L975 27q3-13 15-21t26-5l369 81q18-37 54-59.5T1518 0q62 0 106 43.5t44 105.5t-44 106t-106 44t-105.5-43.5T1369 150l-334-74l-104 472q300 9 519 160q58-61 143-61q83 0 141 58.5t58 140.5M418 1045q0 62 43.5 106t105.5 44t106-44t44-106t-44-105.5T567 896q-61 0-105 44t-44 105m810 355q11-11 11-26t-11-26q-10-10-25-10t-26 10q-41 42-121 62t-160 20t-160-20t-121-62q-11-10-26-10t-25 10q-11 10-11 25.5t11 26.5q43 43 118.5 68t122.5 29.5t91 4.5t91-4.5t122.5-29.5t118.5-68m-3-205q62 0 105.5-44t43.5-106q0-61-44-105t-105-44q-62 0-106 43.5t-44 105.5t44 106t106 44"></path>
                        </svg>
                    </figure>
                    <h1> <span>Reddit</span>.to.read</h1>
                </div>
                <nav id={styles.middleCon} aria-label="Subreddits swiper navigation">
                    <SubredditsSwiper setSearchBtn={setSearchBtn} setSearchInput={setSearchInput} />
                </nav>
                <nav className={styles.rightCon} aria-label="User Actions">
                    <NavLink
                        to="/subreddits"
                        className={({ isActive }) => (isActive ? styles.activeSubredditsManagerBtn : styles.inactiveSubredditsManagerBtn)}
                        onClick={() => setSearchBtn(false)}
                        aria-label="Manage subreddits"
                    >
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.3 7.3 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5"/></svg>
                    </NavLink>
                    <NavLink
                        to="/saved"
                        className={({ isActive }) => (isActive ? styles.activeSavedRedditsBtn : styles.inactiveSavedRedditsBtn)}
                        onClick={handleSavedRedditsBtnClick}
                        aria-label="Saved reddits"
                    >
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M410.9 0H85.1C72.3 0 61.8 10.4 61.8 23.3V512L248 325.8L434.2 512V23.3c0-12.9-10.4-23.3-23.3-23.3"/></svg>
                        <p className={styles.savedBtnNum} aria-label={`The number of your saved reddits is: ${savedReddits.length}`}>{savedReddits.length}</p>
                    </NavLink>

                    <AnimatePresence>
                        {searchBtn ? (
                            <motion.button
                                onClick={handleCloseSearchBtnClick}
                                className={styles.closeSearchBtn}
                                aria-label="Close search bar"
                                variants={searchBtnVar}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-4.99-5.58-5.34A6.49 6.49 0 0 0 3.03 9h2.02c.24-2.12 1.92-3.8 4.06-3.98C11.65 4.8 14 6.95 14 9.5c0 2.49-2.01 4.5-4.5 4.5c-.17 0-.33-.03-.5-.05v2.02l.01.01c1.8.13 3.47-.47 4.72-1.55l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49z"/><path fill="currentColor" d="M6.12 11.17L4 13.29l-2.12-2.12c-.2-.2-.51-.2-.71 0s-.2.51 0 .71L3.29 14l-2.12 2.12c-.2.2-.2.51 0 .71s.51.2.71 0L4 14.71l2.12 2.12c.2.2.51.2.71 0s.2-.51 0-.71L4.71 14l2.12-2.12c.2-.2.2-.51 0-.71a.513.513 0 0 0-.71 0"/></svg>
                            </motion.button>
                        ) : subredditName || (path === "/saved" && savedReddits.length > 0) ? (
                            <motion.button
                                className={styles.searchBtn}
                                onClick={handleSearchBtnClick}
                                aria-label="open search bar"
                                variants={searchBtnVar}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"></path></svg>
                            </motion.button>
                        ) : null}
                    </AnimatePresence>
                </nav>
            </section>

            <AnimatePresence>
                {searchBtn && (
                    <motion.form
                        className={styles.searchRedditsForm}
                        id="searchRedditsForm"
                        aria-label="search reddits bar"
                        variants={searchRedditsFormVar(isBelow900px)}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        role="search"
                    >
                        <motion.input
                            className={styles.searchField}
                            onChange={handleSearchFieldChange}
                            id="searchRedditsField"
                            value={searchInput}
                            ref={searchInputRef}
                            placeholder="Search reddits"
                            maxLength={60}
                            pattern="[A-Za-z0-9\s]+"
                            title="Alphanumeric characters only"
                            aria-label="Search reddits by keywords"
                            variants={searchRedditsFieldVar}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        />
                    </motion.form>
                )}
            </AnimatePresence>
        </header>
    );
}
