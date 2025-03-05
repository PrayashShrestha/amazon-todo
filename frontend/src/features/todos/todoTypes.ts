import { Category } from "../categories/categoryTypes";

export interface Todo {
  id: number;
  title: string;
  description: string;
  due_date: string; 
  complete: boolean; 
  category: Category; 
  created_at?: string;
}

export type CreateTodoDTO = {
  title: string;
  description: string;
  dueDate: string;
  categoryId: number;
};


export type UpdateTodoDTO = Partial<CreateTodoDTO> & { complete?: boolean };
