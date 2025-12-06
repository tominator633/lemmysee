import React from "react";
import styles from "./Subreddit.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/reduxHooks";
import { addSubreddit, deleteSubreddit, setCurrentSubreddit, type Subreddit } from "../../features/Subreddits/subredditsSlice";

interface SubredditProps {
    content: Subreddit;
    isSwiperSubreddit: boolean;
}

export default function Subreddit({ content, isSwiperSubreddit }: SubredditProps): React.ReactElement {
    const dispatch = useAppDispatch();

    const handleAddSubredditClick = (): void => {
        dispatch(addSubreddit(content));
    };

    const handleDeleteSubredditClick = (): void => {
        dispatch(deleteSubreddit({ id: content.id }));
    };

    const handleSrDetailBtnClick = (): void => {
        dispatch(setCurrentSubreddit(content));
    };

    return (
        <section className={styles.srCon} aria-label={content.name}>
            <figure className={styles.srBanner} role="presentation">
                {content.bannerImg && <img src={content.bannerImg} alt={`${content.name} banner`} />}
            </figure>

            <div className={styles.srInfo} role="presentation">
                <figure className={styles.srIcon} role="presentation">
                    {content.iconImg ? (
                        <img src={content.iconImg} alt={`${content.name} icon`} />
                    ) : content.headerImg ? (
                        <img src={content.headerImg} alt={`${content.name} icon`} />
                    ) : (
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10.75 13.04c0-.57-.47-1.04-1.04-1.04c-.57 0-1.04.47-1.04 1.04a1.04 1.04 0 1 0 2.08 0m3.34 2.37c-.45.45-1.41.61-2.09.61s-1.64-.16-2.09-.61a.26.26 0 0 0-.38 0a.26.26 0 0 0 0 .38c.71.71 2.07.77 2.47.77c.4 0 1.76-.06 2.47-.77a.26.26 0 0 0 0-.38c-.1-.1-.27-.1-.38 0m.2-3.41c-.57 0-1.04.47-1.04 1.04c0 .57.47 1.04 1.04 1.04s1.04-.47 1.04-1.04c0-.57-.46-1.04-1.04-1.04"/>
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5.8 11.33c.02.14.03.29.03.44c0 2.24-2.61 4.06-5.83 4.06s-5.83-1.82-5.83-4.06c0-.15.01-.3.03-.44c-.51-.23-.86-.74-.86-1.33a1.455 1.455 0 0 1 2.47-1.05c1.01-.73 2.41-1.19 3.96-1.24l.74-3.49c.01-.07.05-.13.11-.16c.06-.04.13-.05.2-.04l2.42.52a1.04 1.04 0 1 1 .93 1.5c-.56 0-1.01-.44-1.04-.99l-2.17-.46l-.66 3.12c1.53.05 2.9.52 3.9 1.24a1.455 1.455 0 1 1 1.6 2.38"/>
                        </svg>
                    )}
                </figure>
                <div className={styles.srNameTitle} role="presentation">
                    <h3 className={styles.srName}>{content.name}</h3>
                </div>
            </div>

            <div className={styles.srButtons} role="presentation">
                <Link
                    to={`${content.id}`}
                    className={styles.srDetail}
                    onClick={handleSrDetailBtnClick}
                    aria-label="Open information window for this subreddit"
                >
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/>
                    </svg>
                </Link>

                <button
                    className={styles.srDeleteOrAdd}
                    onClick={isSwiperSubreddit ? handleDeleteSubredditClick : handleAddSubredditClick}
                    aria-label={isSwiperSubreddit ? "Remove subreddit from your selection" : "Add subreddit to your selection"}
                >
                    {isSwiperSubreddit ? (
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/>
                        </svg>
                    ) : (
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
                    )}
                </button>
            </div>
        </section>
    );
}
