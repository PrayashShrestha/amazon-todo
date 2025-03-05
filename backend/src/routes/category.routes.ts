import { Router } from "express";
import Joi from "joi";
import { validator, asyncWrapper } from "@middlewares";
import { categoryController } from "../modules/category/category.controller";

export const categoryRouter  = Router();

const categorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
});

categoryRouter.post("/", validator(categorySchema), asyncWrapper(categoryController.createCategory));
categoryRouter.get("/",  asyncWrapper(categoryController.getAllCategories));