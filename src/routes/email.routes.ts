import { Router } from "express";
import { sendEmailController } from "../Controllers/email.controller";


import authToken from "../middlewares/authtoken.middleware";

const routes = Router();

export const emailRoutes = () => {
  
  routes.post("", sendEmailController);
  
  
  return routes
}
