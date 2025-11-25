import axios from "axios";
import { storage } from "@/lib/utils/storage";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080", // Đảm bảo đúng port backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Gắn token vào mọi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    
    // DEBUG: Log URL chuẩn bị gọi
    console.group(`🚀 AXIOS REQUEST: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Bỏ qua các API Auth (Login/Register)
    if (config.url?.includes("/auth/")) {
        console.log("Skip Auth Token for Login/Register");
        console.groupEnd();
        return config;
    }

    if (token && config.headers) {
      // Logic xử lý Bearer: Nếu token chưa có chữ Bearer thì thêm vào
      const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      config.headers["Authorization"] = authHeader;
      
      console.log("Token sent:", authHeader.substring(0, 20) + "..."); // Log 20 ký tự đầu
    } else {
      console.warn("⚠️ Warning: Request gửi đi KHÔNG có Token!");
    }
    
    console.groupEnd();
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Xử lý lỗi phản hồi
axiosClient.interceptors.response.use(
  (response) => {
    // console.log("✅ API Response Success:", response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosClient;