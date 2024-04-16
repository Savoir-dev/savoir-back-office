export interface Itinerary {
  uid: string;
  guide: string;
  duration: string;
  color: string;
  interestPoints: {
    uid: string;
    order: number;
  }[];
  translations: ItineraryTranslations[];
}

export interface ItineraryTranslations {
  language: string;
  title: string;
  subtitle: string;
}

export type PostItinerary = Omit<Itinerary, "uid">;
