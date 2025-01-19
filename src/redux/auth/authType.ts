export interface ValidationError {
    isError: boolean;
    message: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ILoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
    };
}

export interface RegistrationPayload {
    username: string;
    password: string;
    email: string;
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
}
