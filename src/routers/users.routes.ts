import { Router } from "express";
import { createUsersController, listUserController } from "../controllers/users.controllers";

const userRoutes: Router = Router();

userRoutes.post("", createUsersController);
userRoutes.get("/:id", listUserController);

export default userRoutes;
