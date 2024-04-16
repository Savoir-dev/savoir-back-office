import api from "../../api";
import { InterestPointFromApi } from "../../types/interestPoints.type";
import { Itinerary, PostItinerary } from "../../types/itineraries.type";

// GET
export const getItineraries = async () => await api.get(`/itinerary`);

export const getItineraryByUid = async (uid: string | undefined) => {
  return await api.get(`/itinerary/${uid}`);
};
// POST
export const postItinerary = async (newItinerary: PostItinerary) => {
  const formData = new FormData();

  formData.append("guide", newItinerary.guide);
  formData.append("duration", newItinerary.duration);
  formData.append("color", newItinerary.color);

  const updatedTranslatedInterestPoints = newItinerary.translations.map(
    (itinerary) => {
      const copyOfInterestPoint = JSON.parse(JSON.stringify(itinerary));
      return copyOfInterestPoint;
    }
  );

  formData.append(
    "translations",
    JSON.stringify(updatedTranslatedInterestPoints)
  );

  return await api.post("/interestPoint", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
