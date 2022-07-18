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
const appError_1 = require("../../errors/appError");
const deleteTransactionService = (foundUser, transactions_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transactionsRepository = data_source_1.AppDataSource.getRepository(transactions_entity_1.Transactions);
    const findTransaction = yield transactionsRepository.findOne({
        where: {
            transactions_id: transactions_id
        }
    });
    const isUserTransaction = (_a = foundUser.transactions) === null || _a === void 0 ? void 0 : _a.filter(transaction => {
        return transaction.transactions_id.toString() === transactions_id;
    });
    if (!findTransaction || !isUserTransaction) {
        throw new appError_1.AppError(404, "Transaction not found");
    }
    yield transactionsRepository.delete(transactions_id);
});
exports.default = deleteTransactionService;
