import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  listUserController,
  listUsersController,
  recoverUserController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureOwnerMiddleware from "../middlewares/ensureOwner.middlewares";
import ensureUserExistMiddleware from "../middlewares/ensureUserExist.middleware"
import ensureEmailAlreadyMiddleware from "../middlewares/ensureEmailAlready.middleware"

const userRoutes: Router = Router();

userRoutes.post("", ensureEmailAlreadyMiddleware, createUsersController);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureOwnerMiddleware,
  listUsersController
);
userRoutes.get("/profile", ensureTokenIsValidMiddleware, listUserController);
userRoutes.patch("/:id", ensureTokenIsValidMiddleware, ensureUserExistMiddleware, ensureEmailAlreadyMiddleware, updateUserController);
userRoutes.delete("/:id", ensureTokenIsValidMiddleware, ensureUserExistMiddleware, deleteUserController);
userRoutes.put("/:id/recover", ensureTokenIsValidMiddleware, ensureUserExistMiddleware, recoverUserController);

export default userRoutes;
