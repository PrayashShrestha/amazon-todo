import axios, {AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ApiError } from './apiTypes';

interface ErrorResponse {
  message?: string;
}

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<ApiError> => {
    const data = error.response?.data as ErrorResponse || {};
    const apiError: ApiError = {
      message: data.message || 'An error occurred',
      status: error.response?.status,
      details: error.message,
    };
    return Promise.reject(apiError);
  }
);

export default api;
