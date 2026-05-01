
import { type ApiPersonResponse } from "./creatorApiTypes";
import { type Creator } from "./creatorTypes";


export const mapApiPersonResponseToCreatorDomain = (json: ApiPersonResponse): Creator => {
  const person = json.person_view.person;
  const counts = json.person_view.counts;

  return {
    id: String(person.id),
    name: person.name,
    displayName: person.display_name ?? null,
    iconImg: person.avatar ?? null,
    bannerImg: person.banner ?? null,
    description: person.bio ?? null,
    isBanned: person.banned,
    timePublished: person.published,
    counts: {
      posts: counts.post_count,
      comments: counts.comment_count,
    },
  };
};