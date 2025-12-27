// Standard API response types matching Spring Boot backend contract

/**
 * ApiResponse<T> - Standard success response wrapper
 * Backend: ApiResponse.java
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
}

/**
 * ApiError - Business logic error response
 * Backend: ApiError.java
 */
export interface ApiError {
  code: string;
  message: string;
}

/**
 * ValidationError - Form validation error response
 * Backend: ValidationError.java
 */
export interface ValidationError {
  code: string;
  errors: Record<string, string>; // Map<String, String> in Java
}

/**
 * Pagination request params (optional, for list endpoints)
 */
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

/**
 * Paginated response wrapper (if backend uses Spring Data Page)
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
