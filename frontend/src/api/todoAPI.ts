import api from './axiosInstance';
import { AxiosResponse } from 'axios';
import { Todo, CreateTodoDTO, UpdateTodoDTO } from '../features/todos/todoTypes';

export const todoApi = {
  getTodos: (): Promise<AxiosResponse<Todo[]>> => api.get('/todo'),

  createTodo: (todo: CreateTodoDTO): Promise<AxiosResponse<{ id: number }>> =>
    api.post('/todo', {
      ...todo,
    }),

  updateTodo: (id: number, todo: UpdateTodoDTO): Promise<AxiosResponse<Todo>> =>
    api.put(`/todo/${id}`, todo),

  deleteTodo: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/todo/${id}`),

  markComplete: (id: number): Promise<AxiosResponse<void>> =>
    api.get(`/todo/${id}/complete`),

  markIncomplete: (id: number): Promise<AxiosResponse<void>> =>
    api.get(`/todo/${id}/incomplete`),

  filterByStatus: (status: 'complete' | 'incomplete'): Promise<AxiosResponse<Todo[]>> =>
    api.get(`/todo/filter/?status=${status}`),

  searchByCategory: (catId: number): Promise<AxiosResponse<Todo[]>> =>
    api.get(`/todo/search/${catId}`),
};
