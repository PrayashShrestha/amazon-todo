export interface ApiResponse<T> {
    data: T;
    message?: string;
  }
  
  export interface ApiError {
    message: string;
    status?: number;
    details?: string;
  }
  