import AxiosService from "../api";
import {
  InterestPoint,
  InterestPointFromApi,
} from "../types/interestPoints/interestPoints.type";

// GET
export const getInterestPoints = async () =>
  await AxiosService.getInstance().get(`/interestPoint`);

export const getInterestPointsByWalkingTour = async () =>
  await AxiosService.getInstance().get(`/interestPoint/walkingTour`);

// POST
export const postInterestPoint = async (newInterestPoint: InterestPoint) => {
  console.log("newInterestPoint", newInterestPoint);
  const formData = new FormData();

  formData.append("image", newInterestPoint.image);
  formData.append("title", newInterestPoint.title);
  formData.append("subtitle", newInterestPoint.subtitle);
  formData.append("shortDesc", newInterestPoint.shortDesc);
  formData.append("longDesc", newInterestPoint.longDesc);
  formData.append("audio", newInterestPoint.audio);
  formData.append("duration", newInterestPoint.duration);
  formData.append("guide", newInterestPoint.guide);
  formData.append("information", newInterestPoint.information);
  formData.append("type", newInterestPoint.type);
  formData.append("audioDesc", newInterestPoint.audioDesc);
  formData.append("color", newInterestPoint.color);
  formData.append("latitude", newInterestPoint.latitude);
  formData.append("longitude", newInterestPoint.longitude);
  formData.append(
    "tags",
    JSON.stringify(newInterestPoint.tags.map((tag: string) => tag.tag))
  );

  return await AxiosService.getInstance().post("/interestPoint", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// PUT
export const putInterestPoint = async (interestPoint: InterestPointFromApi) => {
  const formData = new FormData();

  formData.append("image", interestPoint.image);
  formData.append("title", interestPoint.title);
  formData.append("subtitle", interestPoint.subtitle);
  formData.append("shortDesc", interestPoint.shortDesc);
  formData.append("longDesc", interestPoint.longDesc);
  formData.append("audio", interestPoint.audio);
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
    JSON.stringify(interestPoint.tags.map((tag: string) => tag.tag))
  );

  return await AxiosService.getInstance().put(
    `/interestPoint/${interestPoint.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// DELETE
export const deleteInterestPoint = async (id: number) =>
  await AxiosService.getInstance().delete(`/interestPoint/${id}`);
