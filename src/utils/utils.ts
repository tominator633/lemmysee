import type { Community } from "../features/Communities/communitiesSlice";


export const epochToAgo = (epochTime: number): string => {
    const currentTimeMs = Date.now();
    const epochTimeMs = epochTime * 1000;
    const timeDifferenceMs = currentTimeMs - epochTimeMs;
    const timeDifferenceS = Math.floor(timeDifferenceMs / 1000);

    const YEAR_IN_SECONDS = 31556926;
    const MONTH_IN_SECONDS = 2629743;
    const DAY_IN_SECONDS = 86400;
    const HOUR_IN_SECONDS = 3600;
    const MINUTE_IN_SECONDS = 60;

    if (timeDifferenceS >= YEAR_IN_SECONDS) {
        const yearsAgo = Math.floor(timeDifferenceS / YEAR_IN_SECONDS);
        return yearsAgo === 1 ? `${yearsAgo} year ago` : `${yearsAgo} years ago`;
    } else if (timeDifferenceS >= MONTH_IN_SECONDS) {
        const monthsAgo = Math.floor(timeDifferenceS / MONTH_IN_SECONDS);
        return monthsAgo === 1 ? `${monthsAgo} month ago` : `${monthsAgo} months ago`;
    } else if (timeDifferenceS >= DAY_IN_SECONDS) {
        const daysAgo = Math.floor(timeDifferenceS / DAY_IN_SECONDS);
        return daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`;
    } else if (timeDifferenceS >= HOUR_IN_SECONDS) {
        const hoursAgo = Math.floor(timeDifferenceS / HOUR_IN_SECONDS);
        return hoursAgo === 1 ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`;
    } else if (timeDifferenceS >= MINUTE_IN_SECONDS) {
        const minsAgo = Math.floor(timeDifferenceS / MINUTE_IN_SECONDS);
        return minsAgo === 1 ? `${minsAgo} min ago` : `${minsAgo} mins ago`;
    } else {
        return `${timeDifferenceS} s ago`;
    }
};

export const formatNumberWithSpaces = (num: number): string => {
    const numStr = num.toString();
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};



export const initialCommunitiesSelection: Community[] = [
    {
        id: 8,
        name: "asklemmy",
        subscribers: 53944,
        headerTitle: "Asklemmy",
        iconImg: "https://lemmy.ml/pictrs/image/d3d059e3-fa3d-45af-ac93-ac894beba378.png",
        bannerImg: "https://lemmy.ml/pictrs/image/36d2d6b4-9133-43eb-a980-5aa44939b904.png",
        description: "A loosely moderated place to ask open-ended questions\n\n**[Search asklemmy](https://lemmy.ml/search?q=&type=Posts&listingType=All&communityId=8&page=1&sort=TopAll) 🔍**\n\nIf your post meets the following criteria, it's welcome here!\n\n1. Open-ended question\n2. Not offensive: at this point, we do not have the bandwidth to moderate overtly political discussions. Assume best intent and be excellent to each other.\n3. **Not regarding using or support for Lemmy**: [context](https://lemmy.ml/post/1223478), see the list of support communities and tools for finding communities below\n4. Not ad nauseam inducing: please make sure it is a question that would be new to most members\n5. [An actual topic of discussion](https://lemmy.ml/post/1239589)\n\nLooking for support? \n\n* [!lemmy_support@lemmy.ml](https://lemmy.ml/c/lemmy_support) \n* [!fediverse@lemmy.ml](https://lemmy.ml/c/fediverse) \n* [!selfhosted@lemmy.world](https://lemmy.world/c/selfhosted) \n\nLooking for a community? \n\n* [Lemmyverse](https://lemmyverse.net/communities): community search \n* [sub.rehab](https://sub.rehab/): maps old subreddits to fediverse options, marks official as such \n* [!lemmy411@lemmy.ca](https://lemmy.ca/c/lemmy411): a community for finding communities \n\n~Icon~ ~by~ ~@Double_A@discuss.tchncs.de~",
    }
   
];