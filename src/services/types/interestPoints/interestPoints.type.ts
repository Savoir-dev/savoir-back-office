export interface InterestPoint {
  uid: string;
  type: string;
  image?: File;
  audio?: File;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  duration: string;
  information: string;
  guide: string;
  color: string;
  audioDesc: string;
  tags: { tag: string }[];
  latitude: string;
  longitude: string;
}

export interface InterestPointFromApi {
  uid: string;
  type: string;
  image: string;
  audio: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  duration: string;
  information: string;
  guide: string;
  color: string;
  audioDesc: string;
  tags: string[];
  latitude: string;
  longitude: string;
}
