import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

// Select all categories
export const selectCategories = (state: RootState) => state.categories.categories;

// Select category by ID
export const selectCategoryById = (categoryId: number) =>
  createSelector([selectCategories], (categories) =>
    categories.find((category) => category.id === categoryId)
  );
