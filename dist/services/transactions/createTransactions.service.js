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
const createTransactionsService = (foundUser, foundCard, { description, category, value, type }) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionsRepository = data_source_1.AppDataSource.getRepository(transactions_entity_1.Transactions);
    const newTransaction = new transactions_entity_1.Transactions;
    newTransaction.description = description;
    newTransaction.category = category;
    newTransaction.value = value;
    newTransaction.type = type;
    newTransaction.card = foundCard;
    newTransaction.user = foundUser;
    yield transactionsRepository.save(newTransaction);
    const returingTransaction = {
        transactions_id: newTransaction.transactions_id,
        description: newTransaction.description,
        value: newTransaction.value,
        type: newTransaction.type,
        cardId: newTransaction.card.id,
        userId: newTransaction.user.id
    };
    return returingTransaction;
});
exports.default = createTransactionsService;
