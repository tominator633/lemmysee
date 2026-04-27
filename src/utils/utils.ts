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
    id: "2840",
    name: "world",
    subscribers: 55740,
    headerTitle: "World News",
    iconImg: "https://lemmy.world/pictrs/image/0fd47927-ca3a-4d2c-b2e4-a25353786671.png",
    bannerImg: "https://lemmy.world/pictrs/image/d22b2935-f27b-49f0-81e7-c81c21088467.png",
    description: "A community for discussing events around the World\n\n#### Rules:\n\n- **Rule 1**: posts have the following requirements:\n    - Post news articles only\n    - Video links are NOT articles and will be removed.\n    - Title must match the article headline\n    - Not United States Internal News\n    - Recent (Past 30 Days)\n    - Screenshots/links to other social media sites (Twitter/X/Facebook/Youtube/reddit, etc.) are explicitly forbidden, as are link shorteners.\n    \n\n- **Rule 2:** Do not copy the entire article into your post. The key points in 1-2 paragraphs is allowed (even encouraged!), but large segments of articles posted in the body will result in the post being removed. If you have to stop and think \"Is this fair use?\", it probably isn't. Archive links, especially the ones created on link submission, are absolutely allowed but those that avoid paywalls are not.\n\n- **Rule 3:** Opinions articles, or Articles based on misinformation/propaganda may be removed. \n\n- **Rule 4:** Posts or comments that are homophobic, transphobic, racist, sexist, anti-religious, or ableist will be removed. “Ironic” prejudice is just prejudiced.\n\n- Posts and comments must abide by the [lemmy.world terms of service](https://legal.lemmy.world/) **UPDATED AS OF OCTOBER 19 2025**\n\n- **Rule 5:** Keep it civil. It's OK to say the subject of an article is behaving like a (pejorative, pejorative). It's NOT OK to say another USER is (pejorative). Strong language is fine, just not directed at other members.  Engage in good-faith and with respect!  **This includes accusing another user of being a bot or paid actor.** Trolling is uncivil and is grounds for removal and/or a community ban.\n\nSimilarly, if you see posts along these lines, do not engage. Report them, block them, and live a happier life than they do. We see too many slapfights that boil down to \"Mom! He's bugging me!\" and \"I'm not touching you!\" Going forward, slapfights will result in removed comments and temp bans to cool off.\n\n- **Rule 6:** Memes, spam, other low effort posting, reposts, misinformation, advocating violence, off-topic, trolling, offensive, regarding the moderators or meta in content may be removed at any time.\n\n- **Rule 7:** We didn't USED to need a rule about how many posts one could make in a day, then someone posted NINETEEN articles in a single day. Not comments, FULL ARTICLES. If you're posting more than say, 10 or so, consider going outside and touching grass. We reserve the right to limit over-posting so a single user does not dominate the front page.\n\nWe ask that the users report any comment or post that violate the rules, to use critical thinking when reading, posting or commenting. Users that post off-topic spam, advocate violence, have multiple comments or posts removed, weaponize reports or violate the code of conduct will be banned.\n\nAll posts and comments will be reviewed on a case-by-case basis. This means that some content that violates the rules may be allowed, while other content that does not violate the rules may be removed. The moderators retain the right to remove any content and ban users.\n\n---\n\n#### Lemmy World Partners\n\n**News** [!news@lemmy.world](https://lemmy.world/c/news) \n\n**Politics** [!politics@lemmy.world](https://lemmy.world/c/politics) \n\n**World Politics** [!globalpolitics@lemmy.world](https://lemmy.world/c/globalpolitics) \n\n---\n\n#### Recommendations\n\n- [How to spot Misinformation and Propaganda](https://lemmy.world/post/1808282)\n\nFor Firefox users, there is media bias / propaganda / fact check plugin.\n\nhttps://addons.mozilla.org/en-US/firefox/addon/media-bias-fact-check/\n\n- Consider including the article’s mediabiasfactcheck.com/ link",
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
  id: "2508",
  name: "cooking",
  subscribers: 10522,
  headerTitle: "Cooking",
  iconImg: "https://lemmy.world/pictrs/image/4508ce49-c276-4988-8d69-10c582e1bee9.png",
  bannerImg: "https://lemmy.world/pictrs/image/23e923cd-8573-4e1c-9ff6-e520a2d65252.jpeg",
  description: "![Lemmy](https://img.shields.io/lemmy/cooking%40lemmy.world?style=for-the-badge&amp%3Blogo=lemmy&amp%3Blabel=Total+Subscribers&amp%3Bcolor=cyan)\n\n## Welcome to LW Cooking, a community for discussing all things related to food and cooking! We want this to be a place for members to feel safe to discuss and share everything they love about the culinary arts. Please feel free to take part and help our community grow!\n\nTaken a nice photo of your creation? We highly encourage sharing with our friends over at [!foodporn@lemmy.world](https://lemmy.world/c/foodporn).\n\n---\n\nPosts in this community must be food/cooking related. Recipes for dishes you've made and post picture of are encouraged but are not a requirement. Posts of food you are enjoyed or just think like food are welcomed as well. \n\nPosts can optionally be tagged. We would like the use and number of tags to grow organically. Feel free to use a tag that isn't listed if you think it makes sense to do so. We encourage using tags to help organize and make browsing easier, but you don't have to use them if you don't want to. \n\n### TAGS:  \n* [QUESTION] - For questions about cooking.  \n* [RECIPE} - Share a recipe of your own, or link one.  \n* [MEME] - Food related meme or funny post.  \n* [DISCUSSION] - For general culinary discussion.  \n* [TIP] - Helpful cooking tips.  \n\n### FORMAT:\n\n    [QUESTION] What are your favorite spices to use in soups?\n\n---\n\n### Other Cooking Communities:\n\n[!bbq@lemmy.world](https://lemmy.world/c/bbq)  - Lemmy.world's home for BBQ.\n\n[!foodporn@lemmy.world](https://lemmy.world/c/foodporn)  - Showcasing your best culinary creations.\n\n[!sousvide@lemmy.world](https://lemmy.world/c/sousvide)  - All things sous vide precision cooking.\n\n[!koreanfood@lemmy.world](https://lemmy.world/c/koreanfood)  - Celebrating Korean cuisine!\n\n---\n\nWhile posting and commenting in this community, you must abide by the Lemmy.World Terms of Service: \nhttps://legal.lemmy.world/tos/\n\n1) Posts or comments that are homophobic, transphobic, racist, sexist, ableist, or advocating violence will be removed.\n2) Be civil: disagreements happen, but that doesn’t provide the right to personally insult others.\n3) Spam, self promotion, trolling, and bots are not allowed\n4) Shitposts and memes are allowed until they prove to be a problem.\n\nFailure to follow these guidelines will result in your post/comment being removed and/or more severe actions. All posts and comments will be reviewed on a case-by-case basis. This means that some content that violates the rules may be allowed, while other content that does not violate the rules may be removed. The moderators retain the right to remove any content and ban users. We ask that the users report any comment or post that violates the rules, and to use critical thinking when reading, posting or commenting.\n",
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


