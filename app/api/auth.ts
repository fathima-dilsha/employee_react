import axiosInstance from '@/lib/axios.config';
import type { User, LoginCredentials, AuthResponse } from '@/types';

// Token management functions
export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
};

export const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
    }
};

export const clearToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
    }
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};

// API functions
export const register = async (userData: User): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/register', userData);
    return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/login', credentials);
    return response.data;
};
