



export const submitBtnVar = {
    visible: {
        marginTop: "0px",
        opacity: 1,
        transition: {
            duration: 0.3
        }
    },
    hidden: {
        marginTop: "-70px",
        opacity: 0,
        transition: {
            duration: 0.3
        }
    },
    }

    
export const mySubredditVar = {
    hidden: { 
        opacity: 0,
        y: 50 
    }, 
    visible: {
        opacity: 1,
        y: 0 
    }, 
    exit: {
        opacity: 0,
        y: 50,
    } 
    };

export const searchedSubredditVar = {
    hidden: { 
        opacity: 0,
        y: -50 
    }, 
    visible: {
        opacity: 1,
        y: 0 
    }, 
    exit: {
        opacity: 0,
        y: -50,
    } 
    };