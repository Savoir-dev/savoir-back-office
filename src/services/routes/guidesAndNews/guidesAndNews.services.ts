import api from "../../api";
import {
  Guide,
  GuideFromApi,
  GuidePost,
  News,
  NewsFromApi,
  NewsPost,
} from "./guidesAndNews.type";
import { guideReader, newsReader } from "./readers/guidesAndNewsReader";

// GET
export const getGuides = async (): Promise<Guide[]> => {
  try {
    const response = await api.get<{
      data: GuideFromApi[];
    }>("/guide");

    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map(guideReader);
    }
    throw new Error("No data found or data format is incorrect");
  } catch (error) {
    console.error("Failed to fetch interest points:", error);

    throw new Error(`Error fetching interest points`);
  }
};

export const getNews = async (): Promise<News[]> => {
  try {
    const response = await api.get<{
      data: NewsFromApi[];
    }>("/news");

    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map(newsReader);
    }
    throw new Error("No data found or data format is incorrect");
  } catch (error) {
    console.error("Failed to fetch news:", error);

    throw new Error(`Error fetching news`);
  }
};

export const getGuideByUid = async (uid: string | undefined) => {
  const response = await api.get(`/guide/${uid}`);

  if (response.data) {
    return guideReader(response.data.data);
  }
};
export const getNewsByUid = async (uid: string | undefined) => {
  const response = await api.get(`/news/${uid}`);

  if (response.data) {
    return newsReader(response.data.data);
  }
};

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
  if (newNews.image) {
    formData.append("image", newNews.image);
  }

  return await api.post("/news", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// PUT
export const putGuide = async (uid: string, guide: Guide) => {
  const formData = new FormData();

  const updatedTranslatedGuides = guide.translations.map((guide) => {
    const copyOfGuide = JSON.parse(JSON.stringify(guide));
    return copyOfGuide;
  });

  formData.append("translations", JSON.stringify(updatedTranslatedGuides));
  if (guide.image) {
    formData.append("image", guide.image);
  }

  return await api.put(`/guide/${uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const putNews = async (uid: string, news: News) => {
  const formData = new FormData();

  const updatedTranslatedNews = news.translations.map((news) => {
    const copyOfNews = JSON.parse(JSON.stringify(news));
    return copyOfNews;
  });

  formData.append("translations", JSON.stringify(updatedTranslatedNews));

  if (news.image) {
    formData.append("image", news.image);
  }

  return await api.put(`/news/${uid}`, formData, {
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
