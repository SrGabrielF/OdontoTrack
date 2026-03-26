import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'receptionist' | 'dentist';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: 'receptionist' | 'dentist') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, role) => {
        // Mock login
        const user: User = {
          id: '1',
          name: 'Dr Batman',
          email,
          role,
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
