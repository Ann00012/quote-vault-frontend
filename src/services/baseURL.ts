import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore"; // Шлях до твого стору

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Додаємо інтерцептор, який перед кожним запитом вставляє токен
api.interceptors.request.use((config) => {
  // Дістаємо токен із Zustand-стору
  const token = useAuthStore.getState().token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;