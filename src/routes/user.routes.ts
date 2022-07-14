import { Router } from "express";


import {
  createUserController,
  deleteUserController,
  loginUserController,
  profileUserController,
  updateUserController,
} from "../Controllers/users.controller";

const routes = Router();

export const userRoutes = () => {
  
  routes.post("", createUserController);
  routes.post("/login", loginUserController);
  routes.get("/profile",profileUserController)
  routes.patch("",updateUserController)
  routes.delete("",deleteUserController)

  return routes
}
