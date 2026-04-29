import React, { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../app/reduxHooks";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";
import CommunitiesSwiper from "../../features/Communities/CommunitiesSwiper/CommunitiesSwiper";
import { useNavigate, createSearchParams, useParams, NavLink, useSearchParams, useLocation } from "react-router-dom";
import { searchBtnVar, searchPostsFormVar, searchPostsFieldVar } from "./headerFMVariants";
import { selectSavedPosts } from "../../features/Posts/postsSlice";


interface RouteParams extends Record<string, string | undefined> {
    communityId: string
}
export default function Header(): React.ReactElement {
    const isBelow900px = useMediaQuery({ query: "(max-width: 900px)" });

    const savedPosts = useAppSelector(selectSavedPosts);

    const navigate = useNavigate();
    const { communityId } = useParams<RouteParams>();
    const location = useLocation();
    const path = location.pathname;

    const [searchBtn, setSearchBtn] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [, setSearchParams] = useSearchParams();
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const handleSavedPostsBtnClick = (): void => {
        setSearchBtn(false);
        setSearchInput("");
    };

    const handleSearchBtnClick = (): void => {
        setSearchBtn(!searchBtn);
        const query = { title: "" };
        const queryString = createSearchParams(query).toString();
        if (communityId) {
            navigate({
                pathname: `/${communityId}`,
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
        if (communityId) navigate(communityId);
        if (path === "/saved") navigate("/saved");
    };

    const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchInput(value);
        setSearchParams({ title: value });
        if (communityId && !value) {
            navigate(communityId);
        }
        if (path === "/saved" && !value) {
            navigate("/saved");
        }
    };

    useEffect(() => {
        if (path === "/saved" && savedPosts.length === 0) {
            setSearchBtn(false);
        }
    }, [path, savedPosts.length]);

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
                        <svg role="img" aria-labelledby="logotitle" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <title id="logotitle">Lemmy logo pink</title>
                            <path fill="currentColor" d="M2.96 4.223a4 4 0 0 0-.333.019A2.84 2.84 0 0 0 .474 5.628c-.475.8-.593 1.68-.35 2.497c.242.816.83 1.558 1.698 2.145l.016.011c.746.45 1.492.743 2.288.9c-.02.332-.028.669-.006 1.018c.063 1.043.436 2 .996 2.85l-2.006.818a.42.42 0 0 0-.228.224a.42.42 0 0 0 .088.455a.42.42 0 0 0 .294.123a.4.4 0 0 0 .16-.031l2.209-.904c.408.486.87.932 1.372 1.318q.03.02.06.043l-1.291 1.71a.416.416 0 0 0 .664.5l1.314-1.738a9.3 9.3 0 0 0 2.229 1.025c.383.72 1.138 1.187 2.02 1.187c.89 0 1.644-.501 2.024-1.207a9.4 9.4 0 0 0 2.208-1.027l1.332 1.76a.416.416 0 0 0 .744-.193a.42.42 0 0 0-.08-.307l-1.31-1.735c.008-.007.018-.01.026-.018c.497-.38.955-.818 1.362-1.294l2.155.88a.416.416 0 0 0 .541-.228a.415.415 0 0 0-.227-.544l-1.944-.792c.577-.854.97-1.819 1.05-2.87c.027-.35.025-.691.009-1.026a7 7 0 0 0 2.273-.897l.017-.012c.868-.587 1.456-1.328 1.698-2.145c.242-.816.125-1.697-.35-2.497a2.84 2.84 0 0 0-2.155-1.386a3 3 0 0 0-.332-.019c-.786-.015-1.623.23-2.429.694c-.593.342-1.125.867-1.543 1.439c-1.17-.67-2.693-1.048-4.564-1.078a16 16 0 0 0-.51 0c-2.086.034-3.755.43-5.015 1.144c-.003-.003-.005-.011-.008-.015C6.55 5.815 6 5.27 5.389 4.917c-.805-.465-1.643-.708-2.428-.694Zm.285.736c.557.042 1.17.236 1.779.588c.485.28.976.755 1.346 1.27a6 6 0 0 0-.497.408c-.92.852-1.461 1.96-1.668 3.233a6.2 6.2 0 0 1-1.984-.794C1.466 9.15 1.005 8.54.821 7.919C.636 7.295.713 6.648 1.098 6c.375-.63.928-.953 1.612-1.032a3 3 0 0 1 .535-.007Zm17.51 0a3 3 0 0 1 .535.008c.684.078 1.237.402 1.612 1.032c.385.648.462 1.296.277 1.92c-.184.622-.645 1.231-1.4 1.744a6.2 6.2 0 0 1-1.96.789c-.194-1.297-.737-2.434-1.666-3.302a6 6 0 0 0-.47-.392c.364-.49.828-.943 1.293-1.212c.61-.351 1.222-.545 1.779-.587m-8.749 1.045a15 15 0 0 1 .487 0c2.39.039 4.085.67 5.163 1.678c1.15 1.075 1.642 2.6 1.5 4.467c-.132 1.707-1.221 3.228-2.653 4.324a9 9 0 0 1-2.225 1.229c.003-.045.014-.089.014-.135c.003-1.196-.932-2.213-2.292-2.213s-2.322 1.015-2.292 2.221c.001.05.014.097.018.147a8.9 8.9 0 0 1-2.278-1.245c-1.423-1.095-2.5-2.613-2.603-4.322c-.113-1.857.378-3.339 1.521-4.397s2.986-1.711 5.64-1.754m-3.642 6.829a1.096 1.096 0 1 0 0 2.192a1.096 1.096 0 0 0 0-2.192m7.282.011a1.086 1.086 0 1 0 0 2.173a1.086 1.086 0 0 0 0-2.173M12 16.084c1.024 0 1.565.638 1.563 1.482c-.001.785-.672 1.485-1.563 1.485c-.917 0-1.54-.562-1.563-1.493c-.022-.834.54-1.474 1.563-1.474"></path>
                        </svg>
                    </figure>
                    <h1> <span>Lemmy</span>see</h1>
                </div>
                <nav id={styles.middleCon} aria-label="Communities swiper navigation">
                    <CommunitiesSwiper setSearchBtn={setSearchBtn} setSearchInput={setSearchInput} />
                </nav>
                <nav className={styles.rightCon} aria-label="User Actions">
                    <NavLink
                        to="/communities"
                        className={({ isActive }) => (isActive ? styles.activeCommunitiesManagerBtn : styles.inactiveCommunitiesManagerBtn)}
                        onClick={() => setSearchBtn(false)}
                        aria-label="Manage communities"
                    >
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.3 7.3 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5"/></svg>
                    </NavLink>
                    <NavLink
                        to="/saved"
                        className={({ isActive }) => (isActive ? styles.activeSavedPostsBtn : styles.inactiveSavedPostsBtn)}
                        onClick={handleSavedPostsBtnClick}
                        aria-label="Saved posts"
                    >
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M410.9 0H85.1C72.3 0 61.8 10.4 61.8 23.3V512L248 325.8L434.2 512V23.3c0-12.9-10.4-23.3-23.3-23.3"/></svg>
                        <p className={styles.savedBtnNum} aria-label={`The number of your saved posts is: ${savedPosts.length}`}>{savedPosts.length}</p>
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
                        ) : communityId || (path === "/saved" && savedPosts.length > 0) ? (
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
                        className={styles.searchPostsForm}
                        id="searchPostsForm"
                        aria-label="search posts bar"
                        variants={searchPostsFormVar(isBelow900px)}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        role="search"
                    >
                        <motion.input
                            className={styles.searchField}
                            onChange={handleSearchFieldChange}
                            id="searchPostsField"
                            value={searchInput}
                            ref={searchInputRef}
                            placeholder="Search posts"
                            maxLength={60}
                            pattern="[A-Za-z0-9\s]+"
                            title="Alphanumeric characters only"
                            aria-label="Search posts by keywords"
                            variants={searchPostsFieldVar}
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
