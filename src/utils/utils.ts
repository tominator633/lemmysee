import type { Community } from "../features/Communities/communitiesSlice";


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



export const initialCommunitiesSelection: Community[] = [
 {
  id: "3106",
  name: "asklemmy",
  subscribers: 39093,
  headerTitle: "Ask Lemmy",
  iconImg: "https://lemmy.world/pictrs/image/44bf11eb-4336-40eb-9778-e96fc5223124.png",
  bannerImg: "https://lemmy.world/pictrs/image/dd1aec6c-fae4-4f82-a503-cd23504845c3.png",
  description: "## A Fediverse community for open-ended, thought provoking questions\n\n***\n\n## **Rules: (interactive)**\n\n***\n\n::: spoiler 1) Be nice and; have fun\nDoxxing, trolling, sealioning, racism, toxicity and dog-whistling are not welcomed in AskLemmy. Remember what your mother said: if you can't say something nice, don't say anything at all. In addition, the site-wide Lemmy.world terms of service also apply here. [Please familiarize yourself with them](https://legal.lemmy.world/tos/) \n:::\n\n***\n\n::: spoiler 2) All posts must end with a '?'\nThis is sort of like Jeopardy. Please phrase all post titles in the form of a proper question ending with ?\n:::\n\n***\n\n::: spoiler 3) No spam\nPlease do not flood the community with nonsense. Actual suspected spammers will be banned on site.   No astroturfing.\n:::\n\n***\n\n::: spoiler 4) NSFW is okay, within reason\nJust remember to tag posts with either a content warning or a [NSFW] tag. Overtly sexual posts are not allowed, please direct them to either [!asklemmyafterdark@lemmy.world](https://lemmy.world/c/asklemmyafterdark) or [!asklemmynsfw@lemmynsfw.com](https://lemmynsfw.com/c/asklemmynsfw).\nNSFW comments should be restricted to posts tagged [NSFW].\n:::\n\n***\n\n::: spoiler 5) This is not a support community.  \nIt is not a place for 'how do I?', type questions.\nIf you have any questions regarding the site itself or would like to report a community, please direct them to [Lemmy.world Support](https://lemmy.world/c/support) or email info@lemmy.world.  For other questions check our partnered communities list, or use the search function.\n:::\n\n***\n\n::: spoiler 6) No US Politics.  \nPlease don't post about current US Politics.  If you need to do this, try !politicaldiscussion@lemmy.world or !askusa@discuss.online\n:::\n\n***\n\nReminder: The [terms of service](https://legal.lemmy.world/tos/) apply here too.\n\n## Partnered Communities:\n\n[Tech Support](/c/techsupport@lemmy.world)\n\n[No Stupid Questions](/c/nostupidquestions@lemmy.world)\n\n[You Should Know](/c/youshouldknow@lemmy.world)\n\n[Reddit](/c/reddit@lemmy.world)\n\n[Jokes](/c/jokes@lemmy.world)\n\n[Ask Ouija](/c/askouija@lemmy.world)\n\n***\n\nLogo design credit goes to:\n[tubbadu](/u/tubbadu@lemmy.world)\n\n***\n![](https://img.shields.io/lemmy/asklemmy%40lemmy.world?logo=lemmy&amp%3Blabel=Total+Subscribers)\n\n",
  isHidden: false,
  isBlocked: false,
},
    {
        id: "12",
        name: "technology",
        subscribers: 42363,
        headerTitle: "Technology",
        iconImg: "https://lemmy.ml/pictrs/image/2QNz7bkA1V.png",
        bannerImg: null,
        description: "This is the official technology community of Lemmy.ml for all news related to creation and use of technology, and to facilitate civil, meaningful discussion around it.\n\n---\n\nAsk in DM before posting product reviews or ads. All such posts otherwise are subject to removal.\n\n---\n\nRules:\n\n1: All Lemmy rules apply\n\n2: Do not post low effort posts\n\n3: NEVER post naziped*gore stuff\n\n4: Always post article URLs or their archived version URLs as sources, NOT screenshots. Help the blind users.\n\n5: personal rants of Big Tech CEOs like Elon Musk are unwelcome (does not include posts about their companies affecting wide range of people)\n\n6: no advertisement posts unless verified as legitimate and non-exploitative/non-consumerist\n\n7: crypto related posts, unless essential, are disallowed",
        isHidden: false,
        isBlocked: false
    },
      {
    id: "1322",
    name: "worldnews",
    subscribers: 5598,
    headerTitle: "worldnews",
    iconImg: "https://lemmy.world/pictrs/image/6c247e53-0717-4d17-82b3-2ff4bd4e954b.png",
    bannerImg: "https://lemmy.world/pictrs/image/89c07149-5b12-41ee-a0f8-08dd45620e0d.jpeg",
    description: "Rules: \n\n1. Be civil. Disagreements happen, that does not give you the right to personally insult each other.\n\n2. No racism or bigotry. \n\n3. Posts from sources that aren't known to be incredibly biased for either side of the spectrum are preferred. If this is not an option, you may post from whatever source you have as long as it is relevant to this community. \n\n4. Post titles should be the same as the article title. \n\n5. No spam, self-promotion, or trolling. \n\nInstance-wide rules always apply.",
    isHidden: false,
    isBlocked: false,
  },
  {
    id: "11684",
    name: "linuxmemes",
    subscribers: 31038,
    headerTitle: "linuxmemes",
    iconImg: "https://lemmy.world/pictrs/image/4271bdc6-5114-4749-a5a9-afbc82a99c78.png",
    bannerImg: "https://lemmy.world/pictrs/image/4701d6d0-a080-461e-8a33-5927dd1809e6.png",
    description: "Hint: `:q!`\n\n----\n\n\n::: spoiler Sister communities:\n* !tech_memes@lemmy.world\n* !memes@lemmy.world\n* !lemmyshitpost@lemmy.world\n* !risa@startrek.website\n:::\n\n---\n\nCommunity rules (click to expand)\n:::spoiler 1. Follow the site-wide rules\n- Instance-wide TOS: https://legal.lemmy.world/tos/\n- Lemmy code of conduct: https://join-lemmy.org/docs/code_of_conduct.html\n:::\n:::spoiler 2. Be civil\n- Understand the difference between a joke and an insult.\n- Do not harrass or attack users *for any reason*. This includes using blanket terms, like \"every user of *thing*\".\n- Don't get baited into back-and-forth insults. We are not animals.\n- Leave remarks of \"peasantry\" to the PCMR community. If you dislike an OS/service/application, attack the *thing* you dislike, not the individuals who use it. Some people may not have a choice.\n- Bigotry will not be tolerated.\n:::\n::: spoiler 3. Post Linux-related content\n- Including Unix and BSD.\n- Non-Linux content is acceptable as long as it makes a reference to Linux. For example, the poorly made mockery of `sudo` in Windows.\n- No porn, no politics, no trolling or ragebaiting.\n- Don't come looking for advice, this is not the right community.\n:::\n:::spoiler 4. No recent reposts\n- Everybody uses Arch btw, can't quit Vim, <loves/tolerates/hates> systemd, and wants to interject for a moment. You can stop now.\n:::\n:::spoiler 5. 🇬🇧 Language/язык/Sprache\n- **This is primarily an English-speaking community.** 🇬🇧🇦🇺🇺🇸\n- Comments written in other languages are allowed.\n- The substance of a post should be comprehensible for people who only speak English.\n- Titles and post bodies written in other languages will be allowed, but only as long as the above rule is observed.\n:::\n:::spoiler 6. (NEW!) Regarding public figures\nWe all have our opinions, and certain public figures can be divisive. Keep in mind that **this is a community for memes and light-hearted fun**, not for airing grievances or leveling accusations.\n- Keep discussions polite and free of disparagement.\n- We are never in possession of all of the facts. Defamatory comments will not be tolerated.\n- Discussions that get too heated will be locked and offending comments removed.\n:::\n&nbsp;\n\nPlease report posts and comments that break these rules!\n\n---\n**Important: never execute code or follow advice that you don't understand or can't verify**, especially here. The word of the day is *credibility*. This is a meme community -- even the most helpful comments might just be shitposts that can damage your system. Be aware, be smart, don't remove France.",
    isHidden: false,
    isBlocked: false,
  },
  {
    id: "761207",
    name: "europe",
    subscribers: 10943,
    headerTitle: "Europe",
    iconImg: "https://feddit.org/pictrs/image/e3e6e3d4-239b-4246-a585-381ebdd17bd1.jpeg",
    bannerImg: "https://feddit.org/pictrs/image/1c9eab7d-ba65-4d6c-b11a-566b29daff00.jpeg",
    description: "News and information from Europe 🇪🇺\n\n(Current banner: La Mancha, Spain. Feel free to post submissions for banner images.)\n\n### Rules (2024-08-30)\n\n1. This is an English-language community. Comments should be in English. Posts can link to non-English news sources when providing a full-text translation in the post description. Automated translations are fine, as long as they don't overly distort the content.\n2. No links to misinformation or commercial advertising. When you post outdated/historic articles, add the year of publication to the post title. Infographics must include a source and a year of creation; if possible, also provide a link to the source.\n3. Be kind to each other, and argue in good faith. Don't post direct insults nor disrespectful and condescending comments. Don't troll nor incite hatred. Don't look for novel argumentation strategies at Wikipedia's List of fallacies.\n4. No bigotry, sexism, racism, antisemitism, islamophobia, dehumanization of minorities, or glorification of National Socialism. We follow German law; don't question the statehood of Israel.\n5. Be the signal, not the noise: Strive to post insightful comments. Add \"/s\" when you're being sarcastic.\n6. If you link to paywalled information, please provide also a link to a freely available archived version.\n7. Light-hearted content, memes, and posts about your European everyday belong in other communities.\n8. Don't evade bans.\n9. No posts linking to speculative reporting about ongoing events with unclear backgrounds.\n10. Always provide context with posts.\n\n(This list may get expanded as necessary.)",
    isHidden: false,
    isBlocked: false,
  },
  {
    id: "2475",
    name: "travelphotography",
    subscribers: 2313,
    headerTitle: "Travel Photography ",
    iconImg: "https://lemmy.world/pictrs/image/b52d6ddb-28a6-4a5d-8346-7dce9ca91b4b.jpeg",
    bannerImg: null,
    description: null,
    isHidden: false,
    isBlocked: false,
  },
  {
  id: "12915",
  name: "recipes",
  subscribers: 2654,
  headerTitle: "Recipes and Cooking Tips",
  iconImg: "https://lemmy.world/pictrs/image/c8c7e6bb-3974-4033-bebf-44eef1250347.png",
  bannerImg: null,
  description: "![Lemmy](https://img.shields.io/lemmy/recipes%40lemmy.world?style=for-the-badge&amp;logo=lemmy&amp;label=Total%20Subscribers&amp;color=%23c33c9c)\n\n## Welcome to !recipes, a place to share recipes and cooking tips of your own or those that you've found and loved.  Share  your favorite tips and meals.\n\n\nTaken a nice photo of your creation? We highly encourage sharing with us and our friends over at [!foodporn@lemmy.world](https://lemmy.world/c/foodporn).\n\n---\n\n### Other Cooking Communities:\n\n[!cooking@lemmy.world](https://lemmy.world/c/cooking)  - A general communty about all things cooking.\n\n[!foodporn@lemmy.world](https://lemmy.world/c/foodporn)  - Showcasing the best cooking creations.\n\n[!sousvide@lemmy.world](https://lemmy.world/c/sousvide)  - All about sous vide precision cooking.\n\n[!askculinary@lemmy.world](https://lemmy.world/c/askculinary)  - Have questions about cooking, ask away!\n\n[!koreanfood@lemmy.world](https://lemmy.world/c/koreanfood)  - Celebrating Korean cuisine!\n\n---\n\nWhile posting and commenting in this community, you must abide by the Lemmy.World Terms of Service: \nhttps://legal.lemmy.world/tos/\n\n**Rules**\n\n*Your post must provide an actual recipe or cooking tip*. This can be provided via a link to a website, via a screenshot, or typed out. Original recipes are especially welcomed! If you provide a link to a website, please avoid paywalls. Additionally:\n\n1. Be respectful and inclusive.\n2. No harassment, hate speech, or trolling.\n3. Engage in constructive discussions.\n4. Share relevant content.\n5. Follow guidelines and moderators' instructions.\n6. Use appropriate language and tone.\n7. Report violations.\n8. Foster a continuous learning environment.",
  isHidden: false,
  isBlocked: false,
},
{
  id: "1496",
  name: "cars",
  subscribers: 5480,
  headerTitle: "Cars - For Car Enthusiasts",
  iconImg: "https://lemmy.world/pictrs/image/9f73a3c6-8710-4723-aac2-6f5ae514e680.png",
  bannerImg: "https://lemmy.world/pictrs/image/3aac9ce0-8a26-4d48-8ede-df7783ef465a.jpeg",
  description: "## **About Community**\n\nc/Cars is the largest automotive enthusiast community on Lemmy and the fediverse. We're your central hub for vehicle-related discussion, industry news, reviews, projects, DIY guides, advice, stories, and more.\n\n---\n\n### Rules\n- Stay respectful to the community, hold civil discussions, even when others hold opinions that may differ from yours.\n---\n- This is not an NSFW community, and any such content will not be tolerated.\n---\n- Policy, not politics! Policy discussions revolve around the concept; political discussions revolve around the individual, party, association, etc. We only allow POLICY discussions and political discussions should go to  [c/politics](https://lemmy.world/c/politics).\n---\n- Must be related to cars, anything that does not have connection to cars will be considered spam/irrelevant and is subject to removal.\n---",
  isHidden: false,
  isBlocked: false,
},
{
  id: "5172",
  name: "nyc",
  subscribers: 1090,
  headerTitle: "New York City",
  iconImg: "https://lemmy.ml/pictrs/image/149fdb48-db3f-40fb-a109-9fe901818d56.jpeg",
  bannerImg: "https://lemmy.ml/pictrs/image/787ec1fd-d560-4e71-88d2-04a4dfb2bfbe.jpeg",
  description: "Community for NYC & its residents.\n\n#### Rules\n\n- Be respectful and kind towards others.\n- To Be Announced.\n\n#### Posting guidelines\n\nTo Be Announced.",
  isHidden: false,
  isBlocked: false,
},
{
  id: "31408",
  name: "comicstrips",
  subscribers: 23287,
  headerTitle: "Comic Strips",
  iconImg: "https://lemmy.world/pictrs/image/0130a5eb-ebd6-402a-961b-6dc94d9541ca.jpeg",
  bannerImg: null,
  description: "**Comic Strips** is a community for those who love comic stories.\n\n##### Rules\n\n1. **😇 Be Nice!**\n   - Treat others with respect and dignity. Friendly banter is okay, as long as it is mutual; keyword: **friendly**.\n\n1. **🏘️ Community Standards**\n    - Comics should be a full story, from start to finish, in one post.\n    - Posts should be safe and enjoyable by the majority of community members, both here on lemmy.world and other instances. \n    - Any comic that would qualify as raunchy, lewd, or otherwise draw unwanted attention by nosy coworkers, spouses, or family members should be tagged as NSFW.\n    - Moderators have final say on what and what does not qualify as appropriate. Use common sense, and if need be, err on the side of caution.\n\n1. **🧬 Keep it Real**\n    - Comics should be made and posted by real human beans, not by automated means like bots or AI. This is not the community for that sort of thing.\n\n1. **📽️ Credit Where Credit is Due**\n    - Comics should include the original attribution to the artist(s) involved, and be unmodified. Bonus points if you include a link back to their website. When in doubt, use a [reverse image search](https://tineye.com/) to try to find the original version. Repeat offenders will have their posts removed, be temporarily banned from posting, or if all else fails, be permanently banned from posting.\n    - Attributions include, but are not limited to, watermarks, links, or other text or imagery that artists add to their comics to use for identification purposes. If you find a comic without any such markings, it would be a good idea to see if you can find an original version. If one cannot be found, say so and ask the community for help!\n\n1. **📋 Post Formatting**\n    - Post an image, gallery, or link to a specific comic hosted on another site; e.g., the author's website.\n    - Meta posts about the community should be tagged with \\[Meta\\] either at the beginning or the end of the post title.\n    - When linking to a comic hosted on another site, ensure the link is to the comic itself and not just to the website; e.g., \\\n✅ Correct: https://xkcd.com/386/ \\\n❌ Incorrect: https://xkcd.com/\n\n1. **📬 Post Frequency/SPAM**\n    - Each user (regardless of instance) may post up to five (5 🖐) comics a day. This can be any combination of personal comics you have written yourself, or other author's comics. Any comics exceeding five (5 🖐) will be removed.\n\n1.  **🏴‍☠️ Internationalization (i18n)**\n    - Non-English posts are welcome. Please tag the post title with the original language, and include an English translation in the body of the post; e.g., \\\n`Sí, por favor [Spanish/Español]`\n\n1. **🍿 Moderation**\n    - We are human, just like most everybody else on Lemmy. If you feel a moderation decision was made in error, you are welcome to reach out to anybody on the moderation team for clarification. Keep in mind that moderation decisions may be final.\n    - When reporting posts and/or comments, quote which rule is being broken, and why you feel it broke the rules.\n\n##### Web Accessibility\n\n> Note: This is not a rule, but a helpful suggestion.\n\nWhen posting images, you should strive to add alt-text for screen readers to use to describe the image you're posting:\n\n- [Markdown - Links / Images](https://fedecan.ca/en/guide/lemmy/for-users/markdown#links-images)\n\nAnother helpful thing to do is to provide a transcription of the text in your images, as well as brief descriptions of what's going on. ([example](https://lemmy.world/post/45416843))\n\n##### Web of Links\n\n- !linuxmemes@lemmy.world: \"I use Arch btw\"\n- !memes@lemmy.world: memes (you don't say!)",
  isHidden: false,
  isBlocked: false,
}

]


