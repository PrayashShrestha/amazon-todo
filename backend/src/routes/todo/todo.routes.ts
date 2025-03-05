import { Router } from "express";

import { asyncWrapper, pathParamsValidator, queryParamsValidator, validator } from "@middlewares";
import { todoController } from "../../modules/todo/todo.controller";
import { catIdValidatorSchema, filterSchema, todoIdValidatorSchema, createTodoSchema, updateTodoSchema } from "@modules/todo/schema";

export const todoRouter  = Router();


todoRouter.post("/", validator(createTodoSchema), asyncWrapper(todoController.createTodo));
todoRouter.get("/", asyncWrapper(todoController.getAllTodo));

todoRouter.get("/search/:catId", pathParamsValidator(catIdValidatorSchema), asyncWrapper(todoController.searchByCategory));
todoRouter.get("/filter/", queryParamsValidator(filterSchema), asyncWrapper(todoController.filterByStatus));

todoRouter.get("/:todoId", pathParamsValidator(todoIdValidatorSchema), asyncWrapper(todoController.getTodo));
todoRouter.put("/:todoId", pathParamsValidator(todoIdValidatorSchema),validator(updateTodoSchema), asyncWrapper(todoController.updateTodo));
todoRouter.delete("/:todoId", pathParamsValidator(todoIdValidatorSchema), asyncWrapper(todoController.deleteTodo));

todoRouter.get("/:todoId/complete", pathParamsValidator(todoIdValidatorSchema), asyncWrapper(todoController.markTodoComplete));
todoRouter.get("/:todoId/incomplete", pathParamsValidator(todoIdValidatorSchema), asyncWrapper(todoController.markTodoInComplete));
// todoRouter.put("/:todoId/:catId", pathParamsValidator(todoCatIdValidatorSchema), asyncWrapper(todoController.addCategory));

