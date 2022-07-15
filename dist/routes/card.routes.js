"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRoutes = void 0;
const express_1 = require("express");
const cards_controller_1 = require("../Controllers/cards.controller");
const authtoken_middleware_1 = __importDefault(require("../middlewares/authtoken.middleware"));
const routes = (0, express_1.Router)();
const cardRoutes = () => {
    routes.post("", authtoken_middleware_1.default, cards_controller_1.createCardController);
    routes.get("", cards_controller_1.listCardController);
    routes.get("/:card_id", cards_controller_1.listOneCardController);
    routes.patch("/:card_id", cards_controller_1.updateCardController);
    routes.delete("/:card_id", cards_controller_1.deleteCardController);
    return routes;
};
exports.cardRoutes = cardRoutes;
