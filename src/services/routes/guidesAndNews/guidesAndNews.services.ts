import api from "../../api";
import { Guide, GuidePost, NewsPost } from "./guidesAndNews.type";

// GET
export const getGuides = async () => await api.get(`/guide`);
export const getNews = async () => await api.get(`/news`);

export const getGuideByUid = async (uid: string | undefined) =>
  await api.get(`/guide/${uid}`);

export const getNewsByUid = async (uid: string | undefined) =>
  await api.get(`/news/${uid}`);

// POST
export const postGuide = async (newGuide: GuidePost) => {
  const formData = new FormData();
  if (newGuide?.image) {
    formData.append("image", newGuide?.image);
  }

  const updatedTranslatedGuides = newGuide.translations.map((guide) => {
    const copyOfGuide = JSON.parse(JSON.stringify(guide));
    return copyOfGuide;
  });

  formData.append("translations", JSON.stringify(updatedTranslatedGuides));

  return await api.post("/guide", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postNews = async (newNews: NewsPost) => {
  const formData = new FormData();

  const updatedTranslatedNews = newNews.translations.map((news) => {
    const copyOfNews = JSON.parse(JSON.stringify(news));
    return copyOfNews;
  });

  formData.append("translations", JSON.stringify(updatedTranslatedNews));
  formData.append("image", newNews.image);

  return await api.post("/news", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// PUT
export const putGuide = async (guide: Guide) => {
  const formData = new FormData();

  const updatedTranslatedGuides = guide.translations.map((guide) => {
    const copyOfGuide = JSON.parse(JSON.stringify(guide));
    return copyOfGuide;
  });

  formData.append("translations", JSON.stringify(updatedTranslatedGuides));
  if (guide.image) {
    formData.append("image", guide.image);
  }

  return await api.put(`/guide/${guide.uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putNews = async (news: Guide) => {
  const formData = new FormData();

  const updatedTranslatedNews = news.translations.map((news) => {
    const copyOfNews = JSON.parse(JSON.stringify(news));
    return copyOfNews;
  });

  formData.append("translations", JSON.stringify(updatedTranslatedNews));

  if (news.image) {
    formData.append("image", news.image);
  }

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
