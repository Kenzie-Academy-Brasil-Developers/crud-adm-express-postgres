import { Router } from "express";
import {
  createUsersController,
  listUsersController,
} from "../controllers/users.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureOwnerMiddleware from "../middlewares/ensureOwner.middlewares";
import ensureEmailExistMiddleware from "../middlewares/ensureEmailExist.middleware"
const userRoutes: Router = Router();

userRoutes.post("", ensureEmailExistMiddleware, createUsersController);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureOwnerMiddleware,
  listUsersController
);

export default userRoutes;
