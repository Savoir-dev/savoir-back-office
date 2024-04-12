import api from "../api";
import { InterestPointFromApi } from "../types/interestPoints.type";
import { Itinerary, PostItinerary } from "../types/itineraries.type";

// GET
export const getItineraries = async () => await api.get(`/itinerary`);

// POST
export const postItinerary = async (newItinerary: PostItinerary) => {
  console.log("ici-->", newItinerary);
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

  return await api.post("/itinerary", itinerary);
};

// PUT
export const putItinerary = async (uid: string, itinerary: Itinerary) => {
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

  return await api.put(`/itinerary/${uid}`, updatedItinerary);
};

// DELETE
export const deleteItinerary = async (uid: string | undefined) =>
  await api.delete(`/itinerary/${uid}`);
