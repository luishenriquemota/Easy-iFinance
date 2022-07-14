import { Router } from "express";


import verifyFriendshipAlreadyExists from "../middlewares/verifyFriendshipAlreadyExists.middleware";

import { addFriendController } from "../Controllers/friendList.controller";
import { deleteFriendController } from "../Controllers/friendList.controller";
import { listAllFriendsController } from "../Controllers/friendList.controller";
import { listOneFriendController } from "../Controllers/friendList.controller";

const routes = Router();

export const friendsRoutes = () => {
  
  routes.post(
    "/:user_id",
    verifyFriendshipAlreadyExists,
    addFriendController
  );
  routes.delete("/:friend_id", deleteFriendController);
  routes.get("/:user_id", listAllFriendsController);
  routes.get("/:friend_id", listOneFriendController);

  return routes
}

