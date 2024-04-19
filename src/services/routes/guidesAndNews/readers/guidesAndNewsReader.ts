import { Guide, GuideFromApi, News, NewsFromApi } from "../guidesAndNews.type";

export const guideReader = (json: GuideFromApi): Guide => ({
  uid: json.uid,
  image: null,
  imageUrl: json.image,
  translations: json.translations.map((t) => ({
    language: t.language,
    title: t.title,
    subtitle: t.subtitle,
    shortDesc: t.shortDesc,
    longDesc: t.longDesc,
  })),
});

export const newsReader = (json: NewsFromApi): News => ({
  uid: json.uid,
  image: null,
  imageUrl: json.image,
  translations: json.translations.map((t) => ({
    language: t.language,
    title: t.title,
    subtitle: t.subtitle,
    shortDesc: t.shortDesc,
    longDesc: t.longDesc,
  })),
});
