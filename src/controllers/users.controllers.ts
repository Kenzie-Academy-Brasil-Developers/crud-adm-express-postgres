import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import listUsersService from "../services/users/listAllUsers.service";
import { IUser } from "../interfaces/users.interfaces";
import listUserService from "../services/users/listUser.service";
import deleteUserService from "../services/users/deleteUser.service"

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUser = req.body;
  try {
    const newUser = await createUsersService(userData);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();

  return res.json(users);
};

const listUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: any = req.user.sub;

  const user = await listUserService(userId);

  return res.json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: any = req.user.sub;

  await deleteUserService(userId);

  return res.status(204).send()
};


export { createUsersController, listUsersController, listUserController, deleteUserController};
