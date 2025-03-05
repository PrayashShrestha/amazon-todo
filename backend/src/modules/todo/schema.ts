import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(30).required(),
  dueDate: Joi.date().greater("now").required(),
  categoryId: Joi.number().min(1).required()
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  description: Joi.string().min(3).max(30).optional(),
  dueDate: Joi.date().optional(),
  categoryId: Joi.number().min(1).optional()
});

export const todoIdValidatorSchema = Joi.object({
  todoId: Joi.number().min(1).required()
});

export const catIdValidatorSchema = Joi.object({
  catId: Joi.number().min(1).required()
});

export const filterSchema = Joi.object({
  status: Joi.string().valid("complete", "incomplete").required(),
});

export const todoCatIdValidatorSchema = Joi.object({
  todoId: Joi.number().min(1).required(),
  catId: Joi.number().min(1).required()
});
