import api from "../api";
import { InterestPoint } from "../types/interestPoints.type";

// GET
export const getInterestPoints = async () => await api.get(`/interestPoint`);

export const getInterestPointByInterestPointId = async (
  uid: string | undefined
) => await api.get(`/interestPoint/${uid}`);

export const getInterestPointsByWalkingTour = async () =>
  await api.get(`/interestPoint?type=walkingTour`);

// POST
export const postInterestPoint = async (newInterestPoint: InterestPoint) => {
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

  const updatedTranslatedInterestPoints =
    newInterestPoint.interestPointTranslation.map((interestPoint) => {
      const copyOfInterestPoint = JSON.parse(JSON.stringify(interestPoint));
      delete copyOfInterestPoint.audio;
      delete copyOfInterestPoint.audio_es;
      delete copyOfInterestPoint.audio_en;
      delete copyOfInterestPoint.audio_fr;
      return copyOfInterestPoint;
    });

  formData.append(
    "audio_es",
    newInterestPoint.interestPointTranslation.find(
      (translation) => translation.language === "es"
    )?.audio || ""
  );

  formData.append(
    "audio_en",
    newInterestPoint.interestPointTranslation.find(
      (translation) => translation.language === "en"
    )?.audio || ""
  );

  formData.append(
    "audio_fr",
    newInterestPoint.interestPointTranslation.find(
      (translation) => translation.language === "fr"
    )?.audio || ""
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
export const putInterestPoint = async (updatedInterestPoint: InterestPoint) => {
  const formData = new FormData();

  if (updatedInterestPoint.image) {
    formData.append("image", updatedInterestPoint.image);
  }

  formData.append("latitude", updatedInterestPoint.latitude);
  formData.append("longitude", updatedInterestPoint.longitude);
  formData.append("duration", updatedInterestPoint.duration);
  formData.append("guide", updatedInterestPoint.guide);
  formData.append("type", updatedInterestPoint.type);
  formData.append("color", updatedInterestPoint.color);

  const updatedTranslatedInterestPoints =
    updatedInterestPoint.interestPointTranslation.map((interestPoint) => {
      const copyOfInterestPoint = JSON.parse(JSON.stringify(interestPoint));
      delete copyOfInterestPoint.audio;
      delete copyOfInterestPoint.audio_es;
      delete copyOfInterestPoint.audio_en;
      delete copyOfInterestPoint.audio_fr;
      return copyOfInterestPoint;
    });

  formData.append(
    "audio_es",
    updatedInterestPoint.interestPointTranslation.find(
      (translation) => translation.language === "es"
    )?.audio || ""
  );

  formData.append(
    "audio_en",
    updatedInterestPoint.interestPointTranslation.find(
      (translation) => translation.language === "en"
    )?.audio || ""
  );

  formData.append(
    "audio_fr",
    updatedInterestPoint.interestPointTranslation.find(
      (translation) => translation.language === "fr"
    )?.audio || ""
  );

  formData.append(
    "translations",
    JSON.stringify(updatedTranslatedInterestPoints)
  );

  return await api.put(`/interestPoint/${updatedInterestPoint.uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteInterestPointByInterestPointId = async (uid: string) =>
  await api.delete(`/interestPoint/${uid}`);
