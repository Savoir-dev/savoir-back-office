export interface Guide {
  uid: string;
  imageUrl: string;
  image: File | null;
  translations: GuideTranslation[];
}

export interface GuideFromApi {
  image: string;
  imageUrl: string;
  translations: GuideTranslation[];
  uid: string;
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
  image: File | null;
  imageUrl: string;
  translations: NewsTranslation[];
}

export interface NewsFromApi {
  image: string;
  imageUrl: string;
  translations: NewsTranslation[];
  uid: string;
}

export interface NewsTranslation {
  language: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
}

export type NewsPost = Omit<News, "uid">;
