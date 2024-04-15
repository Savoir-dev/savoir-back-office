export interface Guide {
  uid: string;
  image: string;
  shortDesc: string;
  longDesc: string;
}

export type GuidePost = Omit<Guide, "uid">;

export interface News {
  uid: string;
  image: string;
  shortDesc: string;
  longDesc: string;
}

export type NewsPost = Omit<News, "uid">;
