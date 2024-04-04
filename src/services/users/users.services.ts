import AxiosService from "../api";

export const getAllUsers = async () =>
  await AxiosService.getInstance().get(`/api/users`);

export const deleteUserById = async (id: string | undefined) =>
  await AxiosService.getInstance().delete(`/api/users/${id}`);
