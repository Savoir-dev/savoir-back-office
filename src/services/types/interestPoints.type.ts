export interface InterestPoint {
  uid: string;
  duration: string;
  type: string;
  image: File | null;
  imageUrl: string;
  color: string;
  latitude: string;
  longitude: string;
  guide: string;
  translations: InterestPointTranslation[];
}

export interface InterestPointFromApi {
  color: string;
  duration: string;
  guide: string;
  image: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  translations: InterestPointTranslationFromApi[];
  type: string;
  uid: string;
}

export interface InterestPointTranslation {
  uid: string;
  language: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  audioDesc: string;
  tags: string[];
  information: string;
  audio: File | null;
  audioUrl: string;
}

export interface InterestPointTranslationFromApi {
  uid: string;
  language: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  audioDesc: string;
  tags: string[];
  information: string;
  audio: string;
}
