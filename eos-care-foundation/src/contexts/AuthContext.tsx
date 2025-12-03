import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import api, { onUnauthorized } from '../lib/api';
import type { User, LoginForm, RegisterForm, ApiResponse } from '../lib/types';

type UpdateProfilePayload = {
  name?: string;
  photo?: File | null;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginForm) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/me');
      if (response.data.success && response.data.data) {
        setUser(response.data.data);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await refreshUser();
      setIsLoading(false);
    };
    initAuth();
    const handleUnauthorized = () => {
      setUser(null);
    };
    onUnauthorized(handleUnauthorized);
  }, [refreshUser]);

  const login = async (data: LoginForm) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', data);
    if (response.data.success && response.data.data) {
      setUser(response.data.data.user);
    }
  };

  const register = async (data: RegisterForm) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response.data.success && response.data.data) {
      setUser(response.data.data.user);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (data: UpdateProfilePayload) => {
    const formData = new FormData();

    if (typeof data.name === 'string') {
      formData.append('name', data.name);
    }

    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const response = await api.put<ApiResponse<User>>('/auth/profile', formData);
    if (response.data.success && response.data.data) {
      setUser(response.data.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
