import { InterestPointFromApi } from "./interestPoints.type";

export interface Itinerary {
  uid: string;
  guide: string;
  color: string;
  duration: string;
  translations: ItineraryTranslations[];
  interestPoints: InterestPointFromApi[];
}

export interface ItineraryTranslations {
  language: string;
  title: string;
  subtitle: string;
}

export type PostItinerary = Omit<Itinerary, "uid">;
