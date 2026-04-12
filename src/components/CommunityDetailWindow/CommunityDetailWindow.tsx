import React, { useState, useEffect } from "react";
import styles from "./CommunityDetailWindow.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from "react-router-dom";
import { addCommunity, selectSwiperCommunities, selectCurrentCommunity, type Community } from "../../features/Communities/communitiesSlice";
import { useAppSelector, useAppDispatch } from "../../app/reduxHooks";
import { windowBarrierVar, communityDetailWindowVar, communityAddedMessageVar } from "./communityDetailWindowFMVariants";
import { formatNumberWithSpaces } from "../../utils/utils";


/* this interface must be specific for each call of useParams hook. 
in this file the situation orders communityId to be string for sure, 
so it is safe to get types of the entire object with params specified with
the Record utility type and put additional constraint that communityId is string,
not string | undefined.*/
interface RouteParams extends Record<string, string | undefined> {
    communityId: string;
}

export default function CommunityDetailWindow(): React.ReactElement {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isAddToSelectionBtnClicked, setIsAddToSelectionBtnClicked] = useState<boolean>(false);

    const { communityId } = useParams<RouteParams>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentCommunity = useAppSelector(selectCurrentCommunity);
    const swiperCommunities = useAppSelector(selectSwiperCommunities);

    const isSwiperCommunity = typeof currentCommunity === "object" && "id" in currentCommunity
        ? swiperCommunities.some(community => community.id === (currentCommunity as Community).id)
        : false;

    const handleCloseButtonClick = (): void => {
        setIsVisible(false);
    };

    const handleAddCommunityClick = (): void => {
        if (typeof currentCommunity === "object" && "id" in currentCommunity) {
            dispatch(addCommunity(currentCommunity as Community));
            setIsAddToSelectionBtnClicked(true);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") handleCloseButtonClick();
        };
        if (isVisible) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isVisible]);

    const community = currentCommunity as Community | undefined;

    return (
        <AnimatePresence onExitComplete={() => { navigate(-1); }}>
            {isVisible && (
                <motion.div
                    id={communityId}
                    className={styles.windowBarrier}
                    role="presentation"
                    variants={windowBarrierVar}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.section
                        className={styles.communityDetailWindow}
                        role="dialog"
                        tabIndex={-1}
                        aria-label={`${community?.name ?? "community"} community information window`}
                        aria-modal="true"
                        variants={communityDetailWindowVar}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <button
                            onClick={handleCloseButtonClick}
                            className={`${styles.closeBtn} ${styles.clearfix}`}
                            aria-label="close this window"
                            tabIndex={0}
                        >
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496"/></svg>
                        </button>

                        <div className={styles.communityDetail} role="presentation">
                            <figure className={styles.communityBanner} role="presentation">
                                {community?.bannerImg && <img src={community.bannerImg} alt="banner image" />}
                            </figure>

                            <figure className={styles.communityIcon}>
                                {community?.iconImg ? (
                                    <img src={community.iconImg} alt="community icon" />
                                ) : community?.headerImg ? (
                                    <img src={community.headerImg} alt="community icon" />
                                ) : (
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M10.75 13.04c0-.57-.47-1.04-1.04-1.04c-.57 0-1.04.47-1.04 1.04a1.04 1.04 0 1 0 2.08 0m3.34 2.37c-.45.45-1.41.61-2.09.61s-1.64-.16-2.09-.61a.26.26 0 0 0-.38 0a.26.26 0 0 0 0 .38c.71.71 2.07.77 2.47.77c.4 0 1.76-.06 2.47-.77a.26.26 0 0 0 0-.38c-.1-.1-.27-.1-.38 0m.2-3.41c-.57 0-1.04.47-1.04 1.04c0 .57.47 1.04 1.04 1.04s1.04-.47 1.04-1.04c0-.57-.46-1.04-1.04-1.04"/>
                                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5.8 11.33c.02.14.03.29.03.44c0 2.24-2.61 4.06-5.83 4.06s-5.83-1.82-5.83-4.06c0-.15.01-.3.03-.44c-.51-.23-.86-.74-.86-1.33a1.455 1.455 0 0 1 2.47-1.05c1.01-.73 2.41-1.19 3.96-1.24l.74-3.49c.01-.07.05-.13.11-.16c.06-.04.13-.05.2-.04l2.42.52a1.04 1.04 0 1 1 .93 1.5c-.56 0-1.01-.44-1.04-.99l-2.17-.46l-.66 3.12c1.53.05 2.9.52 3.9 1.24a1.455 1.455 0 1 1 1.6 2.38"/>
                                    </svg>
                                )}
                            </figure>

                            <h3 className={styles.communityName}>{community?.name}</h3>
                            {community?.headerTitle && <p className={styles.communityHeaderTitle}>{community.headerTitle}</p>}
                            <p className={styles.communityPublicDescription}>{community?.publicDescription}</p>
                            <p className={styles.communitySubscribers}>{`Subscribers: ${formatNumberWithSpaces(community?.subscribers ?? 0)}`}</p>

                            {!isSwiperCommunity && !isAddToSelectionBtnClicked ? (
                                <button
                                    className={styles.addThisCommunityToYourSelectionBtn}
                                    id="CommunityDetailPlusBtn"
                                    onClick={handleAddCommunityClick}
                                    aria-label="Add this community to your selection"
                                >
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                                        <defs>
                                            <mask id="ipSAddOne0">
                                                <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                                                    <path fill="#fff" stroke="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
                                                    <path stroke="#000" strokeLinecap="round" d="M24 16v16m-8-8h16" />
                                                </g>
                                            </mask>
                                        </defs>
                                        <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSAddOne0)" />
                                    </svg>
                                </button>
                            ) : (
                                <motion.p
                                    className={styles.communityAddedMessage}
                                    id="communityAddedMessage"
                                    aria-live="polite"
                                    variants={communityAddedMessageVar}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    Community added to your selection
                                </motion.p>
                            )}
                        </div>
                    </motion.section>
                </motion.div>
            )}
        </AnimatePresence>
    );
}