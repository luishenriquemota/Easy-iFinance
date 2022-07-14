import { Router } from "express";

const routes = Router();

import verifyFriendshipAlreadyExists from "../middlewares/verifyFriendshipAlreadyExists.middleware";

import { addFriendController } from "../Controllers/friendList.controller";
import { deleteFriendController } from "../Controllers/friendList.controller";
import { listAllFriendsController } from "../Controllers/friendList.controller";
import { listOneFriendController } from "../Controllers/friendList.controller";

routes.post(
  "/friends/:user_id",
  verifyFriendshipAlreadyExists,
  addFriendController
);
routes.delete("/friends/:friend_id", deleteFriendController);
routes.get("/friends/:user_id", listAllFriendsController);
routes.get("/friends/:friend_id", listOneFriendController);

export default routes;
