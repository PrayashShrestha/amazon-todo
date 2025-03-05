import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

// Select all todos
export const selectTodos = (state: RootState) => state.todos.todos;

// Memoized selector for completed todos
export const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => todo.complete)
);

// Memoized selector for active (incomplete) todos
export const selectActiveTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => !todo.complete)
);

// Select todos by category
export const selectTodosByCategory = (categoryId: number) =>
  createSelector([selectTodos], (todos) =>
    todos.filter((todo) => todo.category?.id === categoryId)
  );
