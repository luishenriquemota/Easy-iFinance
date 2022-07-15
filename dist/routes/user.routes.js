"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const authtoken_middleware_1 = __importDefault(require("../middlewares/authtoken.middleware"));
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("", users_controller_1.createUserController);
    routes.post("/login", users_controller_1.loginUserController);
    routes.get("/profile", authtoken_middleware_1.default, users_controller_1.profileUserController);
    routes.patch("", authtoken_middleware_1.default, users_controller_1.updateUserController);
    routes.delete("", authtoken_middleware_1.default, users_controller_1.deleteUserController);
    return routes;
};
exports.userRoutes = userRoutes;
