import axiosInstance from '@/lib/axios.config';
import type { Department, AddDepartmentRequest } from '@/types';

export const getDepartments = async (): Promise<Department[]> => {
    const response = await axiosInstance.get<Department[]>('/departments');
    return response.data;
};

export const getDepartment = async (deptId: string): Promise<Department> => {
    const response = await axiosInstance.get<Department>(`/department/${deptId}`);
    return response.data;
};

export const addDepartment = async (data: AddDepartmentRequest): Promise<Department> => {
    const response = await axiosInstance.post<Department>('/add-department', data);
    return response.data;
};

export const deleteDepartment = async (deptId: string): Promise<void> => {
    await axiosInstance.delete(`/delete-department/${deptId}`);
};
