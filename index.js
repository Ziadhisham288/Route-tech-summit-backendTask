import express from "express";
import connection from "./Database/connection.js";
import authRouter from "./src/modules/Auth/auth.routes.js";
import categoryRouter from "./src/modules/Categories/category.routes.js";
import { authMiddleware } from "./src/middleware/auth/authMiddleware.js";
import tasksRouter from "./src/modules/Tasks/tasks.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

connection();

app.use("/auth", authRouter);
app.use("/categories", authMiddleware, categoryRouter);
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});




