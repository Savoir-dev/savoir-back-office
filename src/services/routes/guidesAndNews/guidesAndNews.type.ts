export interface Guide {
  uid: string;
  image: string | File;
  translations: GuideTranslation[];
}

export interface GuideTranslation {
  language: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
}

export type GuidePost = Omit<Guide, "uid">;

export interface News {
  uid: string;
  image: string | File;
  translations: NewsTranslation[];
}

export interface NewsTranslation {
  language: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
}

export type NewsPost = Omit<News, "uid">;
