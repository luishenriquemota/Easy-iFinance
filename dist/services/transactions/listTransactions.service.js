"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const transactions_entity_1 = require("../../entities/transactions.entity");
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const listTransactionsService = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionsRepository = data_source_1.AppDataSource.getRepository(transactions_entity_1.Transactions);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const foundUser = yield userRepository.findOneBy({
        id: user_id
    });
    if (!foundUser) {
        throw new appError_1.AppError(404, "User not found");
    }
    const userTransactions = foundUser.transactions;
    if ((userTransactions === null || userTransactions === void 0 ? void 0 : userTransactions.length) === 0) {
        throw new appError_1.AppError(400, "User don't have transactions");
    }
    return userTransactions;
});
exports.default = listTransactionsService;
