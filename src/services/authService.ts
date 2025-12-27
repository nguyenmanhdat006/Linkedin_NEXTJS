import axiosClient from "@/lib/axiosClient";
import { API_ENDPOINTS } from "@/constants";
import { LoginRequest, RegisterRequest, AuthResponse, VerifyEmailRequest } from "@/types/auth";
import { ApiResponse } from "@/types/api";

/**
 * Auth service matching Spring Boot JWT contract
 * Backend: AuthController.java
 */
export const authService = {
  /**
   * Login - POST /api/auth/login
   * Returns: AuthResponse with accessToken, refreshToken, user
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const res = await axiosClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return res.data.data;
  },

  /**
   * Register - POST /api/auth/register
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await axiosClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return res.data.data;
  },

  /**
   * Verify email - POST /api/auth/verify
   */
  verifyEmail: async (data: VerifyEmailRequest): Promise<void> => {
    await axiosClient.post(API_ENDPOINTS.AUTH.VERIFY, data);
  },

  /**
   * Logout - clear token client-side (stateless JWT)
   */
  logout: (): void => {
    // JWT is stateless, just clear client storage
    // No need to call backend
  },
};
