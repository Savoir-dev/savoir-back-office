export interface InterestPoint {
  image: File;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  tags: { tag: string }[];
  geolocation: {
    latitude: number;
    longitude: number;
  };
  color: string;
  audio: string;
  audioDescription: string;
  duration: string;
  guide: string;
  isWalkingTour: boolean;
  information: string;
  type: string;
}
