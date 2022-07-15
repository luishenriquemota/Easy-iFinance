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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionsController = exports.updateTransactionsController = exports.listCardTransactionsController = exports.listTransactionsController = exports.createTransactionsController = void 0;
const createTransactions_service_1 = __importDefault(require("../services/transactions/createTransactions.service"));
const deleteTransactions_service_1 = __importDefault(require("../services/transactions/deleteTransactions.service"));
const listCardTransactions_service_1 = __importDefault(require("../services/transactions/listCardTransactions.service"));
const listTransactions_service_1 = __importDefault(require("../services/transactions/listTransactions.service"));
const updateTransactions_service_1 = __importDefault(require("../services/transactions/updateTransactions.service"));
const createTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const { foundUser, foundCard } = req.user;
    const newUser = yield (0, createTransactions_service_1.default)(foundUser, foundCard, userData);
    return res.status(201).json(newUser);
});
exports.createTransactionsController = createTransactionsController;
const listTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const userTransactions = yield (0, listTransactions_service_1.default)(id);
    return res.status(200).json(userTransactions);
});
exports.listTransactionsController = listTransactionsController;
const listCardTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foundCard } = req.user;
    const cardTransactions = yield (0, listCardTransactions_service_1.default)(foundCard);
    return res.status(200).json(cardTransactions);
});
exports.listCardTransactionsController = listCardTransactionsController;
const updateTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const { transaction_id } = req.params;
    const { foundUser } = req.user;
    const updatedTransaction = yield (0, updateTransactions_service_1.default)(foundUser, transaction_id, updatedData);
    return res.status(200).json(updatedTransaction);
});
exports.updateTransactionsController = updateTransactionsController;
const deleteTransactionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transaction_id } = req.params;
    const { foundUser } = req.user;
    yield (0, deleteTransactions_service_1.default)(foundUser, transaction_id);
    return res.status(204);
});
exports.deleteTransactionsController = deleteTransactionsController;
