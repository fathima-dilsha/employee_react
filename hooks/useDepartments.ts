import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as departmentService from "@/app/api/department"
import type { AddDepartmentRequest } from '@/types';
import { toast } from 'sonner';

export const useDepartments = () => {
    return useQuery({
        queryKey: ['departments'],
        queryFn: departmentService.getDepartments,
    });
};

export const useDepartment = (deptId: string) => {
    return useQuery({
        queryKey: ['department', deptId],
        queryFn: () => departmentService.getDepartment(deptId),
        enabled: !!deptId,
    });
};

export const useAddDepartment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AddDepartmentRequest) => departmentService.addDepartment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
        onError: (error: any) => {
            toast.error('Failed to add department', {
                description: error?.response?.data?.message || 'An error occurred',
            });
        },
    });
};

export const useDeleteDepartment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (deptId: string) => departmentService.deleteDepartment(deptId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
        onError: (error: any) => {
            toast.error('Failed to add department', {
                description: error?.response?.data?.message || 'An error occurred',
            });
        },
    });
};
