import AxiosService from "../api";

// POST
export const login = async (user: { email: string; password: string }) => {
  const response = await AxiosService.getInstance().post(
    "/auth/requestAuthAdmin",
    {
      ...user,
    }
  );
  return response.data;
};
