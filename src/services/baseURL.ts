import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: "https://quote-vault-backend.onrender.com",
  withCredentials: true, 
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token && token !== "cookie-token") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const authEndpoints = ["/auth/login", "/auth/register", "/auth/refresh"];
      const isAuthRequest = authEndpoints.some((url) =>
        originalRequest.url?.includes(url)
      );

      if (isAuthRequest) {
        return Promise.reject(error);
      }

      try {
        await api.post("/auth/refresh");

        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;