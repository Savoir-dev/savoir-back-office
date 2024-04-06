import { InterestPointFromApi } from "./interestPoints.type";

export interface Itinerary {
  uid: string;
  name: string;
  duration: number;
  interestPoints: InterestPointFromApi[];
}
