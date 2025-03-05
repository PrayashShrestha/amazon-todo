import { ApiError } from '../api/apiTypes';

// Function to extract error message from API response
export const handleApiError = (error: any): ApiError => {
  return {
    message: error.response?.data?.message || 'An unexpected error occurred',
    status: error.response?.status,
    details: error.message,
  };
};
