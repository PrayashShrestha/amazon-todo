import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './todoTypes';
import { addTodo, deleteTodo, fetchTodos, filterTodosByStatus, markTodoComplete, markTodoIncomplete, fetchTodosByCategory, updateTodo } from './todoThunks';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  isFetched: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  isFetched: false
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
        state.isFetched = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch todos';
        state.loading = false;
        state.isFetched = true;
      })

      // Add a Todo
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })

      // Update a Todo
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })

      // Delete a Todo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })

      // Mark as Complete
      .addCase(markTodoComplete.fulfilled, (state, action: PayloadAction<number>) => {
        const todo = state.todos.find((t) => t.id === action.payload);
        if (todo) {
          todo.complete = true;
        }
      })

      // Mark as Incomplete
      .addCase(markTodoIncomplete.fulfilled, (state, action: PayloadAction<number>) => {
        const todo = state.todos.find((t) => t.id === action.payload);
        if (todo) {
          todo.complete = false;
        }
      })

      // Filter Todos by Status
      .addCase(filterTodosByStatus.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
      })

      // Search Todos by Category
      .addCase(fetchTodosByCategory.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
      });
  },
});

export default todoSlice.reducer;
