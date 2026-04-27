import React, { useState, useEffect } from "react";
import styles from "./CommunityDetailWindow.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from "react-router-dom";
import { addCommunity, selectSwiperCommunities, selectCurrentCommunity, type Community } from "../../features/Communities/communitiesSlice";
import { useAppSelector, useAppDispatch } from "../../app/reduxHooks";
import { windowBarrierVar, communityDetailWindowVar, communityAddedMessageVar } from "./communityDetailWindowFMVariants";
import { formatNumberWithSpaces } from "../../utils/utils";
import { tr } from "framer-motion/client";


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
    const [iconImgError, setIconImgError] = useState<boolean>(false);
    const [bannerImgError, setBannerImgError] = useState<boolean>(false);
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

                        <div className={styles.communityDetail} 
                                role="presentation">
                            <figure className={styles.communityBanner} 
                                    role="presentation">
                                {community?.bannerImg && !bannerImgError &&
                                <img src={community.bannerImg} 
                                    alt="banner image" 
                                    onError={() => {setBannerImgError(true)}}/>}
                            </figure>

                            <figure className={styles.communityIcon}>
                                {community?.iconImg && !iconImgError ? (
                                    <img src={community.iconImg} 
                                        alt="community icon"
                                        onError={() => {setIconImgError(true)}}/>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M2.96 4.223a4 4 0 0 0-.333.019A2.84 2.84 0 0 0 .474 5.628c-.475.8-.593 1.68-.35 2.497c.242.816.83 1.558 1.698 2.145l.016.011c.746.45 1.492.743 2.288.9c-.02.332-.028.669-.006 1.018c.063 1.043.436 2 .996 2.85l-2.006.818a.42.42 0 0 0-.228.224a.42.42 0 0 0 .088.455a.42.42 0 0 0 .294.123a.4.4 0 0 0 .16-.031l2.209-.904c.408.486.87.932 1.372 1.318q.03.02.06.043l-1.291 1.71a.416.416 0 0 0 .664.5l1.314-1.738a9.3 9.3 0 0 0 2.229 1.025c.383.72 1.138 1.187 2.02 1.187c.89 0 1.644-.501 2.024-1.207a9.4 9.4 0 0 0 2.208-1.027l1.332 1.76a.416.416 0 0 0 .744-.193a.42.42 0 0 0-.08-.307l-1.31-1.735c.008-.007.018-.01.026-.018c.497-.38.955-.818 1.362-1.294l2.155.88a.416.416 0 0 0 .541-.228a.415.415 0 0 0-.227-.544l-1.944-.792c.577-.854.97-1.819 1.05-2.87c.027-.35.025-.691.009-1.026a7 7 0 0 0 2.273-.897l.017-.012c.868-.587 1.456-1.328 1.698-2.145c.242-.816.125-1.697-.35-2.497a2.84 2.84 0 0 0-2.155-1.386a3 3 0 0 0-.332-.019c-.786-.015-1.623.23-2.429.694c-.593.342-1.125.867-1.543 1.439c-1.17-.67-2.693-1.048-4.564-1.078a16 16 0 0 0-.51 0c-2.086.034-3.755.43-5.015 1.144c-.003-.003-.005-.011-.008-.015C6.55 5.815 6 5.27 5.389 4.917c-.805-.465-1.643-.708-2.428-.694Zm.285.736c.557.042 1.17.236 1.779.588c.485.28.976.755 1.346 1.27a6 6 0 0 0-.497.408c-.92.852-1.461 1.96-1.668 3.233a6.2 6.2 0 0 1-1.984-.794C1.466 9.15 1.005 8.54.821 7.919C.636 7.295.713 6.648 1.098 6c.375-.63.928-.953 1.612-1.032a3 3 0 0 1 .535-.007Zm17.51 0a3 3 0 0 1 .535.008c.684.078 1.237.402 1.612 1.032c.385.648.462 1.296.277 1.92c-.184.622-.645 1.231-1.4 1.744a6.2 6.2 0 0 1-1.96.789c-.194-1.297-.737-2.434-1.666-3.302a6 6 0 0 0-.47-.392c.364-.49.828-.943 1.293-1.212c.61-.351 1.222-.545 1.779-.587m-8.749 1.045a15 15 0 0 1 .487 0c2.39.039 4.085.67 5.163 1.678c1.15 1.075 1.642 2.6 1.5 4.467c-.132 1.707-1.221 3.228-2.653 4.324a9 9 0 0 1-2.225 1.229c.003-.045.014-.089.014-.135c.003-1.196-.932-2.213-2.292-2.213s-2.322 1.015-2.292 2.221c.001.05.014.097.018.147a8.9 8.9 0 0 1-2.278-1.245c-1.423-1.095-2.5-2.613-2.603-4.322c-.113-1.857.378-3.339 1.521-4.397s2.986-1.711 5.64-1.754m-3.642 6.829a1.096 1.096 0 1 0 0 2.192a1.096 1.096 0 0 0 0-2.192m7.282.011a1.086 1.086 0 1 0 0 2.173a1.086 1.086 0 0 0 0-2.173M12 16.084c1.024 0 1.565.638 1.563 1.482c-.001.785-.672 1.485-1.563 1.485c-.917 0-1.54-.562-1.563-1.493c-.022-.834.54-1.474 1.563-1.474"></path></svg>
                                )}
                            </figure>

                            <h3 className={styles.communityName}>{community?.name}</h3>
                            {community?.headerTitle && <p className={styles.communityHeaderTitle}>{community.headerTitle}</p>}
                            <p className={styles.communityPublicDescription}>{community?.description}</p>
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