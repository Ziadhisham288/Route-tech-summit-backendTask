import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "./tasks.controller.js";
import { authMiddleware } from "../../middleware/auth/authMiddleware.js";

const tasksRouter = Router();

tasksRouter.post("/", authMiddleware, createTask);
tasksRouter.get("/", authMiddleware, getTasks);
tasksRouter.patch("/:taskId", authMiddleware, updateTask);
tasksRouter.delete("/:taskId", authMiddleware, deleteTask);

export default tasksRouter;
