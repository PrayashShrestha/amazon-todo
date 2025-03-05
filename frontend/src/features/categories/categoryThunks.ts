import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category, CreateCategoryDTO } from './categoryTypes';
import { categoryApi } from '../../api/categoryAPI';

// ✅ Fetch Categories
export const fetchCategories = createAsyncThunk<Category[], void>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategories();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

// ✅ Create Category
export const addCategory = createAsyncThunk<Category, CreateCategoryDTO>(
  'categories/addCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await categoryApi.createCategory(category);
      return { ...category, id: response.data.id }; // ✅ Add ID to newly created category
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create category');
    }
  }
);
