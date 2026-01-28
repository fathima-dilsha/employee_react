import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { User, LoginCredentials } from '@/types';
import { toast } from 'sonner';
import * as authService from '@/app/api/auth';

export const useRegister = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: User) => authService.register(userData),
        onSuccess: () => {
            router.push('/login');
        },
        onError: (error: any) => {
            toast.error('Failed to register', {
                description: error?.response?.data?.message || 'An error occurred',
            });
        },
    });
};

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
        onSuccess: (data) => {
            authService.setToken(data.token);
            router.push('/departments');
        },
        onError: (error: any) => {
            toast.error('Failed to login', {
                description: error?.response?.data?.message || 'An error occurred',
            });
        },
    });
};

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return () => {
        authService.clearToken();
        queryClient.clear();
        router.push('/login');
    };
};
