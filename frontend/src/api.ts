import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  errors?: string[];
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const register = async (payload: RegisterPayload) => {
  const response = await api.post<AuthResponse>('/auth/register', payload);
  return response.data;
};
