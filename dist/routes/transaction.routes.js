"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = require("express");
const transactions_controller_1 = require("../Controllers/transactions.controller");
const authtoken_middleware_1 = __importDefault(require("../middlewares/authtoken.middleware"));
const verifyCardExistance_middlewares_1 = __importDefault(require("../middlewares/verifyCardExistance.middlewares"));
const verifyTransactionAuthorization_middlewares_copy_1 = __importDefault(require("../middlewares/verifyTransactionAuthorization.middlewares copy"));
const verifyUserExistance_1 = __importDefault(require("../middlewares/verifyUserExistance"));
const routes = (0, express_1.Router)();
const transactionRouter = () => {
    routes.post("", authtoken_middleware_1.default, verifyUserExistance_1.default, verifyCardExistance_middlewares_1.default, verifyTransactionAuthorization_middlewares_copy_1.default, transactions_controller_1.createTransactionsController);
    routes.get("/userTransactions", authtoken_middleware_1.default, transactions_controller_1.listTransactionsController);
    routes.get("/:card_id", authtoken_middleware_1.default, verifyUserExistance_1.default, verifyCardExistance_middlewares_1.default, verifyTransactionAuthorization_middlewares_copy_1.default, transactions_controller_1.listCardTransactionsController);
    routes.patch("/:transaction_id", authtoken_middleware_1.default, verifyUserExistance_1.default, transactions_controller_1.updateTransactionsController);
    routes.delete("/:transaction_id", authtoken_middleware_1.default, verifyUserExistance_1.default, transactions_controller_1.deleteTransactionsController);
    return routes;
};
exports.transactionRouter = transactionRouter;
