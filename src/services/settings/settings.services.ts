import api from "../api";
import { ISettings } from "../types/settings.type";

// GET
export const getSettings = async () => await api.get(`/settings`);

// PUT
export const putSettings = async (settings: ISettings) => {
  const formData = new FormData();
  formData.append("welcomePageImage", settings.welcomePageImage);
  formData.append("latitude", settings.latitude);
  formData.append("longitude", settings.longitude);

  console.log("formData", formData);

  return await api.put(`/settings/${settings.uid}`, formData);
};
