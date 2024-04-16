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
  uid: string;
  duration: string;
  type: string;
  image: string;
  color: string;
  latitude: string;
  longitude: string;
  guide: string;
  translations: InterestPointTranslationFromApi[];
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
  interestPointId: string;
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
  interestPointId: string;
}
