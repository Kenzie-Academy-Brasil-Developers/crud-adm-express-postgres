import express, { Application } from "express";
import userRoutes from "./src/routers/users.routes";
import loginRoutes from "./src/routers/login.routes";
import { handleErrors } from "./src/errors";
import "express-async-errors";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(handleErrors);

export default app;
