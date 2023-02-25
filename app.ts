import express, { Application } from "express";
import userRoutes from "./src/routers/users.routes";
import loginRoutes from "./src/routers/login.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

export default app;
