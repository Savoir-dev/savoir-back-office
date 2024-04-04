import axios, { AxiosInstance } from "axios";

type SuccessResponse<T> = {
  status: "success";
  data: T;
};

type ErrorResponse = {
  status: "error";
  error: {
    message: string;
    code: number;
  };
};

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;
class AxiosService {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!AxiosService.instance) {
      AxiosService.instance = axios.create({
        baseURL: import.meta.env.VITE_API_SERVER_URL,
      });
    }

    return AxiosService.instance;
  }

  public static updateToken(token: string | null): void {
    if (token) {
      AxiosService.getInstance().defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete AxiosService.getInstance().defaults.headers.common[
        "Authorization"
      ];
    }
  }
}

export default AxiosService;
