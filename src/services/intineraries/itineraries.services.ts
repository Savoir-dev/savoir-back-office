import AxiosService from "../api";
import { InterestPointFromApi } from "../types/interestPoints.type";
import { Itinerary, PostItinerary } from "../types/itineraries.type";

// GET
export const getItineraries = async () =>
  await AxiosService.getInstance().get(`/itinerary`);

// POST
export const postItinerary = async (newItinerary: PostItinerary) => {
  const itineraryToInterestPoints = newItinerary.interestPoints.map(
    (interestPoint: InterestPointFromApi, index: number) => ({
      uid: interestPoint.uid,
      order: index,
    })
  );

  const itinerary = {
    ...newItinerary,
    interestPoints: itineraryToInterestPoints,
  };

  return await AxiosService.getInstance().post("/itinerary", itinerary);
};

// PUT
export const putItinerary = async (itinerary: Itinerary) => {
  const itineraryToInterestPoints = itinerary.interestPoints.map(
    (interestPoint: InterestPointFromApi, index: number) => ({
      uid: interestPoint.uid,
      order: index,
    })
  );

  const updatedItinerary = {
    ...itinerary,
    interestPoints: itineraryToInterestPoints,
  };

  return await AxiosService.getInstance().put(
    `/itinerary/${itinerary.uid}`,
    updatedItinerary
  );
};
