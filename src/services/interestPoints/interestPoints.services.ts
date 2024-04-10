import api from "../api";
import { InterestPoint } from "../types/interestPoints.type";

// GET
export const getInterestPoints = async () => await api.get(`/interestPoint`);

export const getInterestPointByInterestPointId = async (uid: string) =>
  await api.get(`/interestPoint/${uid}`);

export const getInterestPointsByWalkingTour = async () =>
  await api.get(`/interestPoint?type=walkingTour`);

// POST
export const postInterestPoint = async (newInterestPoint: InterestPoint) => {
  console.log("newInterestPoint", newInterestPoint);
  const formData = new FormData();

  if (newInterestPoint.image) {
    formData.append("image", newInterestPoint.image);
  }

  formData.append("latitude", newInterestPoint.latitude);
  formData.append("longitude", newInterestPoint.longitude);
  formData.append("duration", newInterestPoint.duration);
  formData.append("guide", newInterestPoint.guide);
  formData.append("type", newInterestPoint.type);
  formData.append("color", newInterestPoint.color);
  formData.append(
    "interestPointTranslation",
    JSON.stringify(newInterestPoint.InterestPointTranslation)
  );

  return await api.post("/interestPoint", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// PUT
export const putInterestPoint = async (interestPoint: InterestPoint) => {
  const formData = new FormData();

  if (interestPoint.image && interestPoint.audio) {
    formData.append("image", interestPoint.image);
    formData.append("audio", interestPoint.audio);
  }

  formData.append("title", interestPoint.title);
  formData.append("subtitle", interestPoint.subtitle);
  formData.append("shortDesc", interestPoint.shortDesc);
  formData.append("longDesc", interestPoint.longDesc);
  formData.append("duration", interestPoint.duration);
  formData.append("guide", interestPoint.guide);
  formData.append("information", interestPoint.information);
  formData.append("type", interestPoint.type);
  formData.append("audioDesc", interestPoint.audioDesc);
  formData.append("color", interestPoint.color);
  formData.append("latitude", interestPoint.latitude);
  formData.append("longitude", interestPoint.longitude);
  formData.append(
    "tags",
    JSON.stringify(
      interestPoint.tags.map((tagObject: { tag: string }) => tagObject.tag)
    )
  );

  return await api.put(`/interestPoint/${interestPoint.uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteInterestPointByInterestPointId = async (uid: string) =>
  await api.delete(`/interestPoint/${uid}`);
