import axios from "axios";
import { storage } from "@/lib/utils/storage";

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

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosClient;