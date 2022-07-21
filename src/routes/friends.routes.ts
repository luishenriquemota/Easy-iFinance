import { Router } from "express";

import verifyFriendshipAlreadyExists from "../middlewares/verifyFriendshipAlreadyExists.middleware";
import authToken from "../middlewares/authtoken.middleware";

import { addFriendController } from "../Controllers/friendList.controller";
import { deleteFriendController } from "../Controllers/friendList.controller";
import { listAllFriendsController } from "../Controllers/friendList.controller";
import { listOneFriendController } from "../Controllers/friendList.controller";

const routes = Router();

export const friendsRoutes = () => {
  routes.post("/:friend_id", authToken, addFriendController);
  routes.delete("/:friend_id", authToken, deleteFriendController);
  routes.get("", authToken, listAllFriendsController);
  routes.get("/:friend_id", authToken, listOneFriendController);

  return routes;
};
