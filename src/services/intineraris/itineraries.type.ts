import { InterestPointFromApi } from "../types/interestPoints/interestPoints.type";

export interface Itinerary {
  name: string;
  interestPoints: InterestPointFromApi[];
}
