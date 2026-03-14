export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
  };
}
