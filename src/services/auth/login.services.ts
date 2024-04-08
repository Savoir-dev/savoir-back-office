import { baseApi } from "../api";

// POST
export const login = async (user: { email: string; password: string }) => {
  const response = await baseApi.post("/auth/requestAuthAdmin", {
    ...user,
  });
  return response.data;
};
