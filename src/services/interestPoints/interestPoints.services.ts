import AxiosService from "../api";
import { InterestPoint } from "../types/interestPoints/interestPoints.type";

// GET
export const getInterestPoints = async () =>
  await AxiosService.getInstance().get(`/interestPoint`);

// POST
export const postInterestPoint = async (newInterestPoint: InterestPoint) => {
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
  formData.append(
    "tags",
    JSON.stringify(newInterestPoint.tags.map((tag) => tag.tag))
  );

  return await AxiosService.getInstance().post("/interestPoint", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
