import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../features/categories/categoryThunks';
import { selectCategories } from '../features/categories/categorySelectors';
import { RootState, AppDispatch } from '../store/store';

export const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Selectors
  const categories = useSelector(selectCategories);
  const loading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);

  return { categories, loading, error };
};
