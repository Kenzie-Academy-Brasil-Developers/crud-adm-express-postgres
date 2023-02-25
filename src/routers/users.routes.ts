import { Router } from "express";
import { createUsersController, listUsersController } from "../controllers/users.controllers";
import ensureUserExistMiddleware from "../middlewares/ensureUserExist.middleware"
const userRoutes: Router = Router();

userRoutes.post("", createUsersController);
userRoutes.get("", listUsersController);

export default userRoutes;
