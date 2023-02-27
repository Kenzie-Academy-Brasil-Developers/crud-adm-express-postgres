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


const userRoutes: Router = Router();

userRoutes.post("", createUsersController);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureOwnerMiddleware,
  listUsersController
);
userRoutes.get("/profile", ensureTokenIsValidMiddleware, listUserController);
userRoutes.patch("/:id", ensureTokenIsValidMiddleware, updateUserController);
userRoutes.delete("/:id", ensureTokenIsValidMiddleware, deleteUserController);
userRoutes.put("/:id/recover", ensureTokenIsValidMiddleware, recoverUserController);

export default userRoutes;
