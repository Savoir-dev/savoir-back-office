export interface InterestPoint {
  uid: string;
  duration: string;
  type: string;
  image?: File;
  color: string;
  latitude: string;
  longitude: string;
  guide: string;
  interestPointTranslation: InterestPointTranslation[];
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
  audio: string;
  interestPointId: string;
}

export interface InterestPointTranslationFromApi {}

export interface InterestPointFromApi {
  uid: string;
  duration: string;
  type: string;
  image: string;
  color: string;
  latitude: string;
  longitude: string;
  guide: string;
  translations: InterestPointTranslation[];
}
