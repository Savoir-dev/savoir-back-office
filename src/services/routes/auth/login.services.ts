import { baseApi } from "../../api";

// POST
export const login = async (user: { email: string; password: string }) => {
  const response = await baseApi.post("/auth/requestAuthAdmin", {
    ...user,
  });
  return response.data;
};

// POST
export const forgetPassword = async (email: string) => {
  const response = await baseApi.post("/auth/requestResetPassword", {
    email,
  });
  return response.data;
};
