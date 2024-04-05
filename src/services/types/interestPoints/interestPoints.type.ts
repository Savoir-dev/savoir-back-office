export interface InterestPoint {
  type: string;
  image: null | File;
  audio: null | File;
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
  lattitude: number;
  longitude: number;
}

export interface InterestPointFromApi {
  id: number;
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
  lattitude: number;
  longitude: number;
}
