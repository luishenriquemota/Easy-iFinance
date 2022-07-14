import { Router } from "express";

const routes = Router();

import {
  createUserController,
  deleteUserController,
  loginUserController,
  profileUserController,
  updateUserController,
} from "../Controllers/users.controller";

routes.post("/users", createUserController);
routes.post("/users/login", loginUserController);
routes.get("/users/profile",profileUserController)
routes.patch("/users",updateUserController)
routes.delete("/users",deleteUserController)