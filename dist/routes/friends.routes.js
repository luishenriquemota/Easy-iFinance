"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsRoutes = void 0;
const express_1 = require("express");
const verifyFriendshipAlreadyExists_middleware_1 = __importDefault(require("../middlewares/verifyFriendshipAlreadyExists.middleware"));
const friendList_controller_1 = require("../Controllers/friendList.controller");
const friendList_controller_2 = require("../Controllers/friendList.controller");
const friendList_controller_3 = require("../Controllers/friendList.controller");
const friendList_controller_4 = require("../Controllers/friendList.controller");
const routes = (0, express_1.Router)();
const friendsRoutes = () => {
    routes.post("/:user_id", verifyFriendshipAlreadyExists_middleware_1.default, friendList_controller_1.addFriendController);
    routes.delete("/:friend_id", friendList_controller_2.deleteFriendController);
    routes.get("/:user_id", friendList_controller_3.listAllFriendsController);
    routes.get("/:friend_id", friendList_controller_4.listOneFriendController);
    return routes;
};
exports.friendsRoutes = friendsRoutes;
