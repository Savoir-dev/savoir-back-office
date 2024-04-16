import { InterestPointFromApi } from "./interestPoints.type";

export interface Itinerary {
  uid: string;
  guide: string;
  duration: string;
  color: string;
  interestPoints: InterestPointFromApi[];
  translations: ItineraryTranslations[];
}

export interface ItineraryTranslations {
  language: string;
  title: string;
  subtitle: string;
}

export type PostItinerary = Omit<Itinerary, "uid">;
