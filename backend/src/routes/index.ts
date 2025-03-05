import express from "express";
import { todoRouter } from "./todo/todo.routes";
import { categoryRouter } from "./category.routes";

export const router = express();

router.get("/health", (_req, res, _next) => {
  res.status(200).json({
    status: "OK",
  });
});

router.use("/api/todo/",todoRouter);
router.use("/api/category/",categoryRouter);
