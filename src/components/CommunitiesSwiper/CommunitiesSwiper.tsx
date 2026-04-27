import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Mousewheel, FreeMode } from 'swiper/modules';
// If the CSS error persists despite the d.ts file, you can uncomment the line below
//@ts-ignore
import "swiper/css/bundle";
import styles from "./CommunitiesSwiper.module.css";
import { useAppSelector } from "../../app/reduxHooks";
import { selectSwiperCommunities } from "../../features/Communities/communitiesSlice";
import SwiperCommunity from "../SwiperCommunity/SwiperCommunity";

interface CommunitiesSwiperProps {
    setSearchBtn: (value: boolean) => void;
    setSearchInput: (value: string) => void;
}



export default function CommunitiesSwiper({ setSearchBtn, setSearchInput }: CommunitiesSwiperProps): React.ReactElement {



    const swiperCommunities = useAppSelector(selectSwiperCommunities);

/*     const handleSwiperCommunityClick = (): void => {
        setSearchBtn(false);
        setSearchInput("");
    };

    const getLinkClassName = ({ isActive }: LinkClassNameProps): string => {
        return isActive ? styles.activeCommunity : styles.inactiveCommunity;
    };
 */
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

            {swiperCommunities.map((community) => (
                <SwiperSlide 
                    key={community.id}
                    id={community.id}
                    role="group"
                    aria-label={`Community: ${community.name}`}
                >
                    <SwiperCommunity 
                                    id={community.id}
                                    setSearchBtn={setSearchBtn}
                                    setSearchInput={setSearchInput}
                                    name={community.name}
                                    iconImg={community.iconImg}
                                    />
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