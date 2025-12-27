import axios from "axios";
import { storage } from "@/lib/utils/storage";
import { ApiError, ValidationError } from "@/types/api";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    
    console.group(`🚀 AXIOS REQUEST: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Skip auth token for public endpoints
    if (config.url?.includes("/auth/")) {
        console.log("Skip Auth Token for Login/Register");
        console.groupEnd();
        return config;
    }

    if (token && config.headers) {
      const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      config.headers["Authorization"] = authHeader;
      
      console.log("Token sent:", authHeader.substring(0, 20) + "..."); 
    } else {
      console.warn("⚠️ Warning: Request gửi đi KHÔNG có Token!");
    }
    
    console.groupEnd();
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - Handle ApiError and ValidationError from Spring Boot
 * Matches GlobalExceptionHandler.java contract
 */
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // ApiError - Business logic errors (400, 404, etc.)
      if (data?.code && data?.message) {
        const apiError: ApiError = {
          code: data.code,
          message: data.message,
        };
        console.error(`❌ API Error [${status}]:`, apiError);
        // Attach structured error to the error object
        error.apiError = apiError;
      }
      
      // ValidationError - Form validation errors (400 with errors map)
      else if (data?.code === "VALIDATION_ERROR" && data?.errors) {
        const validationError: ValidationError = {
          code: data.code,
          errors: data.errors,
        };
        console.error(`❌ Validation Error [${status}]:`, validationError);
        error.validationError = validationError;
      }
      
      // Generic error fallback
      else {
        console.error(`❌ HTTP Error [${status}]:`, data);
      }
    } else {
      console.error("❌ Network Error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;