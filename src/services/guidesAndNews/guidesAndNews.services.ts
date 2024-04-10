import api from "../api";
import { Guide, GuidePost, NewsPost } from "./guidesAndNews.type";

// GET
export const getGuides = async () => await api.get(`/guide`);
export const getNews = async () => await api.get(`/news`);

// POST
export const postGuide = async (newGuide: GuidePost) => {
  console.log("newGuide", newGuide);
  const formData = new FormData();
  formData.append("image", newGuide.image);
  formData.append("shortDesc", newGuide.shortDesc);
  formData.append("longDesc", newGuide.longDesc);

  console.log("formData", formData);

  return await api.post("/guide", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postNews = async (newNews: NewsPost) => {
  const formData = new FormData();
  formData.append("image", newNews.image);
  formData.append("shortDesc", newNews.shortDesc);
  formData.append("longDesc", newNews.longDesc);

  return await api.post("/news", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// PUT
export const putGuide = async (guide: Guide) => {
  const formData = new FormData();
  formData.append("image", guide.image);
  formData.append("shortDesc", guide.shortDesc);
  formData.append("longDesc", guide.longDesc);

  return await api.put(`/guide/${guide.uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putNews = async (news: Guide) => {
  const formData = new FormData();
  formData.append("image", news.image);
  formData.append("shortDesc", news.shortDesc);
  formData.append("longDesc", news.longDesc);

  return await api.put(`/news/${news.uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteGuide = async (uid: string) =>
  await api.delete(`/guide/${uid}`);

export const deleteNews = async (uid: string) =>
  await api.delete(`/news/${uid}`);
