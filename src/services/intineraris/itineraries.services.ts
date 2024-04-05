import AxiosService from "../api";
import { InterestPointFromApi } from "../types/interestPoints/interestPoints.type";
import { Itinerary } from "./itineraries.type";

// GET
export const getItineraries = async () =>
  await AxiosService.getInstance().get(`/itinerary`);

// POST
export const postItinerary = async (newItinerary: Itinerary) => {
  const itineraryToInterestPoints = newItinerary.interestPoints.map(
    (interestPoint: InterestPointFromApi, index: number) => ({
      uid: interestPoint.id,
      order: index,
    })
  );

  const formData = new FormData();
  formData.append("name", JSON.stringify(newItinerary.name));
  formData.append(
    "itineraryToInterestPoints",
    JSON.stringify(itineraryToInterestPoints)
  );

  return await AxiosService.getInstance().post("/itinerary", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
