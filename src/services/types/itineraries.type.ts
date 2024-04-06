import { InterestPointFromApi } from "./interestPoints.type";

export interface Itinerary {
  uid: string;
  name: string;
  duration: string;
  interestPoints: InterestPointFromApi[];
}

export type PostItinerary = Omit<Itinerary, "uid">;
