import { Router } from "express";
import {
  createUsersController,
  listUserController,
  listUsersController,
} from "../controllers/users.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureOwnerMiddleware from "../middlewares/ensureOwner.middlewares";
const userRoutes: Router = Router();

userRoutes.post("", createUsersController);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureOwnerMiddleware,
  listUsersController
);
userRoutes.get("/profile", ensureTokenIsValidMiddleware, listUserController)

export default userRoutes;
