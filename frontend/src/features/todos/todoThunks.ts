import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo, CreateTodoDTO, UpdateTodoDTO } from './todoTypes';
import { todoApi } from '../../api/todoAPI';

// Fetch All Todos (Includes Category Object)
export const fetchTodos = createAsyncThunk<Todo[], void>(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoApi.getTodos();
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch todos');
    }
  }
);

// Create a New Todo (Category as Object)
export const addTodo = createAsyncThunk<Todo, CreateTodoDTO>(
  'todos/addTodo',
  async (todo, { rejectWithValue }) => {
    try {
      const response = await todoApi.createTodo(todo);
      console.log("TodoID created:: ",response.data)
      return { ...todo, id: response.data.id, complete: false }; 
      // Adds missing fields to match backend response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create todo');
    }
  }
);

// Update a Todo (Handles Full Category Object)
export const updateTodo = createAsyncThunk<Todo, { id: number; todo: UpdateTodoDTO }>(
  'todos/updateTodo',
  async ({ id, todo }, { rejectWithValue }) => {
    try {
      const response = await todoApi.updateTodo(id, todo);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update todo');
    }
  }
);

// Delete a Todo
export const deleteTodo = createAsyncThunk<number, number>(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await todoApi.deleteTodo(id);
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete todo');
    }
  }
);

// Mark Todo as Complete
export const markTodoComplete = createAsyncThunk<number, number>(
  'todos/markComplete',
  async (id, { rejectWithValue }) => {
    try {
      await todoApi.markComplete(id);
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark todo complete');
    }
  }
);

// Mark Todo as Incomplete
export const markTodoIncomplete = createAsyncThunk<number, number>(
  'todos/markIncomplete',
  async (id, { rejectWithValue }) => {
    try {
      await todoApi.markIncomplete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark todo incomplete');
    }
  }
);

// Filter Todos by Status (Complete / Incomplete)
export const filterTodosByStatus = createAsyncThunk<Todo[], 'complete' | 'incomplete'>(
  'todos/filterByStatus',
  async (status, { rejectWithValue }) => {
    try {
      const response = await todoApi.filterByStatus(status);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to filter todos');
    }
  }
);

// Search Todos by Category
export const fetchTodosByCategory = createAsyncThunk<Todo[], number>(
  'todos/searchByCategory',
  async (catId, { rejectWithValue }) => {
    try {
      const response = await todoApi.searchByCategory(catId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch todos by category');
    }
  }
);
