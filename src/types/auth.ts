// Auth types matching Spring Boot JWT contract

/**
 * LoginRequest - matches backend LoginRequest.java
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * RegisterRequest - matches backend registration contract
 */
export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

/**
 * AuthResponse - matches backend AuthResponse.java
 * Contains JWT tokens and user info
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
}

/**
 * AuthUser - user info returned in auth response
 */
export interface AuthUser {
  id: number | string;
  email: string;
  fullName: string;
  role?: string;
  avatarUrl?: string;
}

/**
 * Token refresh request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Verify email request
 */
export interface VerifyEmailRequest {
  email: string;
  code: string;
}
