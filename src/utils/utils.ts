



export const isoToAgo = (isoString: string): string => {
    const currentTimeMs = Date.now();
    const isoTimeMs = new Date(isoString).getTime();

    if (isNaN(isoTimeMs)) {
        throw new Error("Invalid ISO date string");
    }

    const timeDifferenceMs = currentTimeMs - isoTimeMs;
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









