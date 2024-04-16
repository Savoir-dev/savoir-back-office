import api from "../../api";

export const getAllUsers = async () => await api.get(`/user`);

// DELETE
export const deleteUserById = async (id: string | undefined) =>
  await api.delete(`/user/${id}`);
