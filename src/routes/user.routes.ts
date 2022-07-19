import { Router } from "express";
import {
  activateUserController,
  createUserController,
  deleteUserController,
  loginUserController,
  profileUserController,
  updateUserController
} from "../Controllers/users.controller";
import authToken from "../middlewares/authtoken.middleware";

const routes = Router();

export const userRoutes = () => {
  
  routes.post("", createUserController);
  routes.post("/login", loginUserController);
  routes.get("/profile", authToken, profileUserController)
  routes.get("/activate/:authToken", activateUserController)
  routes.patch("", authToken, updateUserController)
  routes.delete("", authToken, deleteUserController)

  return routes
}
