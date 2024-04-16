import api from "../../api";
import { interestPointReader } from "../../readers/interestPoints";
import {
  InterestPoint,
  InterestPointFromApi,
} from "../../types/interestPoints.type";

// GET
export const getInterestPoints = async (): Promise<InterestPoint[]> => {
  try {
    const response = await api.get<{
      data: InterestPointFromApi[];
    }>("/interestPoint");

    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map(interestPointReader);
    }
    throw new Error("No data found or data format is incorrect");
  } catch (error) {
    console.error("Failed to fetch interest points:", error);

    throw new Error(`Error fetching interest points`);
  }
};

export const getInterestPointByInterestPointId = async (
  uid: string | undefined
) => {
  const response = await api.get(`/interestPoint/${uid}`);

  if (response.data) {
    return interestPointReader(response.data.data);
  }
};

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

  const updatedTranslatedInterestPoints = newInterestPoint.translations.map(
    (interestPoint) => {
      const copyOfInterestPoint = JSON.parse(JSON.stringify(interestPoint));
      delete copyOfInterestPoint.uid;
      delete copyOfInterestPoint.interestPointId;
      delete copyOfInterestPoint.audio;
      delete copyOfInterestPoint.audioUrl;
      delete copyOfInterestPoint.audio_es;
      delete copyOfInterestPoint.audio_en;
      delete copyOfInterestPoint.audio_fr;
      return copyOfInterestPoint;
    }
  );

  ["es", "en", "fr"].forEach((lang) => {
    const audioFile = newInterestPoint.translations.find(
      (translation) => translation.language === lang
    )?.audio;

    if (audioFile) {
      formData.append(`audio_${lang}`, audioFile);
    }
  });

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
export const putInterestPoint = async (
  updatedInterestPoint: InterestPoint,
  uid?: string
) => {
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

  const updatedTranslatedInterestPoints = updatedInterestPoint.translations.map(
    (interestPoint) => {
      const copyOfInterestPoint = JSON.parse(JSON.stringify(interestPoint));
      delete copyOfInterestPoint.audio;
      delete copyOfInterestPoint.audioUrl;
      delete copyOfInterestPoint.audio_es;
      delete copyOfInterestPoint.audio_en;
      delete copyOfInterestPoint.audio_fr;
      return copyOfInterestPoint;
    }
  );

  ["es", "en", "fr"].forEach((lang) => {
    const audioFile = updatedInterestPoint.translations.find(
      (translation) => translation.language === lang
    )?.audio;

    if (audioFile) {
      formData.append(`audio_${lang}`, audioFile);
    }
  });
  formData.append(
    "translations",
    JSON.stringify(updatedTranslatedInterestPoints)
  );

  return await api.put(`/interestPoint/${uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteInterestPointByInterestPointId = async (uid: string) =>
  await api.delete(`/interestPoint/${uid}`);
