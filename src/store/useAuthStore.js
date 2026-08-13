import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, 
      token: null, 
      isLoggedIn: false,
      setAuth: (userData, userToken) => 
        set({ 
          user: userData, 
          token: userToken, 
          isLoggedIn: true 
        }),

      clearAuth: () => 
        set({ 
          user: null, 
          token: null, 
          isLoggedIn: false 
        }),
    }),
    {
      name: 'auth-storage', 
    }
  )
);