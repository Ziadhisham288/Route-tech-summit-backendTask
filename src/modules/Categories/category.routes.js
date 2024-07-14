import { Router } from "express";
import { createCategory, deleteCategory, getSingleCategory, getUserCategories, updateCategory } from "./category.controller.js";

const categoryRouter = Router()



categoryRouter.post("/", createCategory)
categoryRouter.get("/", getUserCategories)
categoryRouter.get("/:id", getSingleCategory)
categoryRouter.patch("/:id", updateCategory)
categoryRouter.delete("/:id", deleteCategory)

export default categoryRouter;