import api from "../../api";

export const getAllUsers = async () => await api.get(`/api/users`);

export const deleteUserById = async (id: string | undefined) =>
  await api.delete(`/api/users/${id}`);
