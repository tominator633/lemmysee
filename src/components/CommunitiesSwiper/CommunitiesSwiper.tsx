import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Mousewheel, FreeMode } from 'swiper/modules';
// If the CSS error persists despite the d.ts file, you can uncomment the line below
//@ts-ignore
import "swiper/css/bundle";
import styles from "./CommunitiesSwiper.module.css";
import { useAppSelector } from "../../app/reduxHooks";
import { NavLink } from 'react-router-dom';
import { selectSwiperCommunities } from "../../features/Communities/communitiesSlice";

interface CommunitiesSwiperProps {
    setSearchBtn: (value: boolean) => void;
    setSearchInput: (value: string) => void;
}

interface LinkClassNameProps {
    isActive: boolean;
    isPending: boolean;
}

export default function CommunitiesSwiper({ setSearchBtn, setSearchInput }: CommunitiesSwiperProps): React.ReactElement {

    const swiperCommunities = useAppSelector(selectSwiperCommunities);

    const handleSwiperCommunityClick = (): void => {
        setSearchBtn(false);
        setSearchInput("");
    };

    const getLinkClassName = ({ isActive }: LinkClassNameProps): string => {
        return isActive ? styles.activeCommunity : styles.inactiveCommunity;
    };

    // Note: getAriaCurrentValue was removed. 
    // NavLink automatically applies aria-current="page" when active.

    return (
        <Swiper 
            className={styles.swiper}
            modules={[FreeMode, Mousewheel, Navigation, A11y]}
            freeMode={true}
            grabCursor={true}
            mousewheel={true}
            navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }}
            breakpoints={{
                0: {
                    slidesPerView: 4,
                    spaceBetween: 3
                },
                800: {
                    slidesPerView: 4,
                    spaceBetween: 3
                },
                1070: {
                    slidesPerView: 5,
                    spaceBetween: 3,
                },
                1250: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                },
            }}
        >
            <button 
                className="swiper-button-prev" 
                id={styles.btnPrev}
                aria-label="go left on the swiper"
            />

            <SwiperSlide 
                className={styles.swiperSlide}
                aria-label="popular posts"
            >
                <div role="presentation">
                    <NavLink 
                        to="/popular" 
                        className={getLinkClassName}
                        onClick={handleSwiperCommunityClick}
                        // aria-current is handled automatically by NavLink
                    >
                        <figure 
                            id={styles.iconPopular} 
                            aria-hidden="true"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10.75 13.04c0-.57-.47-1.04-1.04-1.04c-.57 0-1.04.47-1.04 1.04a1.04 1.04 0 1 0 2.08 0m3.34 2.37c-.45.45-1.41.61-2.09.61s-1.64-.16-2.09-.61a.26.26 0 0 0-.38 0a.26.26 0 0 0 0 .38c.71.71 2.07.77 2.47.77c.4 0 1.76-.06 2.47-.77a.26.26 0 0 0 0-.38c-.1-.1-.27-.1-.38 0m.2-3.41c-.57 0-1.04.47-1.04 1.04c0 .57.47 1.04 1.04 1.04s1.04-.47 1.04-1.04c0-.57-.46-1.04-1.04-1.04"/>
                                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5.8 11.33c.02.14.03.29.03.44c0 2.24-2.61 4.06-5.83 4.06s-5.83-1.82-5.83-4.06c0-.15.01-.3.03-.44c-.51-.23-.86-.74-.86-1.33a1.455 1.455 0 0 1 2.47-1.05c1.01-.73 2.41-1.19 3.96-1.24l.74-3.49c.01-.07.05-.13.11-.16c.06-.04.13-.05.2-.04l2.42.52a1.04 1.04 0 1 1 .93 1.5c-.56 0-1.01-.44-1.04-.99l-2.17-.46l-.66 3.12c1.53.05 2.9.52 3.9 1.24a1.455 1.455 0 1 1 1.6 2.38"/>
                            </svg>
                        </figure>
                        <h3>popular</h3>
                    </NavLink>
                </div>
            </SwiperSlide>

            {swiperCommunities.map((community) => (
                <SwiperSlide 
                    key={community.id}
                    id={community.id}
                    className={styles.swiperSlide}
                    role="group"
                    aria-label={`Community: ${community.name}`}
                >
                    <NavLink 
                        to={`${community.name}`} 
                        className={getLinkClassName}
                        onClick={handleSwiperCommunityClick}
                        // aria-current is handled automatically by NavLink
                    >
                        <figure 
                            id={styles.icon} 
                            aria-hidden="true"
                        >
                            {community.iconImg ? 
                                <img 
                                    src={community.iconImg} 
                                    alt={community.name}
                                />
                            : community.headerImg ?
                                <img 
                                    src={community.headerImg} 
                                    alt={community.name}
                                />
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M10.75 13.04c0-.57-.47-1.04-1.04-1.04c-.57 0-1.04.47-1.04 1.04a1.04 1.04 0 1 0 2.08 0m3.34 2.37c-.45.45-1.41.61-2.09.61s-1.64-.16-2.09-.61a.26.26 0 0 0-.38 0a.26.26 0 0 0 0 .38c.71.71 2.07.77 2.47.77c.4 0 1.76-.06 2.47-.77a.26.26 0 0 0 0-.38c-.1-.1-.27-.1-.38 0m.2-3.41c-.57 0-1.04.47-1.04 1.04c0 .57.47 1.04 1.04 1.04s1.04-.47 1.04-1.04c0-.57-.46-1.04-1.04-1.04"/>
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5.8 11.33c.02.14.03.29.03.44c0 2.24-2.61 4.06-5.83 4.06s-5.83-1.82-5.83-4.06c0-.15.01-.3.03-.44c-.51-.23-.86-.74-.86-1.33a1.455 1.455 0 0 1 2.47-1.05c1.01-.73 2.41-1.19 3.96-1.24l.74-3.49c.01-.07.05-.13.11-.16c.06-.04.13-.05.2-.04l2.42.52a1.04 1.04 0 1 1 .93 1.5c-.56 0-1.01-.44-1.04-.99l-2.17-.46l-.66 3.12c1.53.05 2.9.52 3.9 1.24a1.455 1.455 0 1 1 1.6 2.38"/>
                                </svg>
                            }
                        </figure>
                        <h3>{community.name}</h3>
                    </NavLink>
                </SwiperSlide>
            ))}

            <button 
                className="swiper-button-next" 
                id={styles.btnNext}
                aria-label="go right on the swiper"
            />
        </Swiper>
    );
}