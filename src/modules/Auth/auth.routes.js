import { Router } from "express";
import { validateUserName } from "../../middleware/auth/usernameValidation.js";
import { hashPassword } from "../../middleware/auth/hashPassword.js";
import { login, register } from "./auth.controller.js";

const authRouter = Router()


authRouter.post("/register", validateUserName, hashPassword, register)
authRouter.post("/login", login)

export default authRouter;