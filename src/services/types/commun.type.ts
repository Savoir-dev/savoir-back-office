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
