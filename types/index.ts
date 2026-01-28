
export interface User {
    name: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface Department {
    _id: string;
    department: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AddDepartmentRequest {
    dept_name: string;
    description: string;
}

export interface ApiError {
    message: string;
    statusCode?: number;
}
