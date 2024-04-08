import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
});

baseApi.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error :", error);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await localStorage.getItem("refreshToken");
        const response = await baseApi.post("/auth/refreshToken", {
          refreshToken,
        });

        await localStorage.setItem(
          "accessToken",
          response.data.jwtAuthenticated
        );
        await localStorage.setItem("refreshToken", response.data.refreshToken);

        baseApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return baseApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default baseApi;
