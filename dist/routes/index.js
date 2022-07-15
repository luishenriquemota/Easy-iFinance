"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const card_routes_1 = require("./card.routes");
const friends_routes_1 = require("./friends.routes");
const transaction_routes_1 = require("./transaction.routes");
const user_routes_1 = require("./user.routes");
const appRoutes = (app) => {
    app.use("/cards", (0, card_routes_1.cardRoutes)());
    app.use("/transactions", (0, transaction_routes_1.transactionRouter)());
    app.use("/users", (0, user_routes_1.userRoutes)());
    app.use("/friends", (0, friends_routes_1.friendsRoutes)());
};
exports.appRoutes = appRoutes;
