import api from './axiosInstance';
import { AxiosResponse } from 'axios';
import { Category, CreateCategoryDTO } from '../features/categories/categoryTypes';

export const categoryApi = {
  getCategories: (): Promise<AxiosResponse<Category[]>> => api.get('/category'),

  createCategory: (category: CreateCategoryDTO): Promise<AxiosResponse<{ id: number }>> =>
    api.post('/category', category),
};
