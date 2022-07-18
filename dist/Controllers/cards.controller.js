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
exports.deleteCardController = exports.updateCardController = exports.listOneCardController = exports.listCardController = exports.createCardController = void 0;
const createCart_service_1 = __importDefault(require("../services/cards/createCart.service"));
const deleteCard_service_1 = __importDefault(require("../services/cards/deleteCard.service"));
const listCards_service_1 = __importDefault(require("../services/cards/listCards.service"));
const listOneCard_service_1 = __importDefault(require("../services/cards/listOneCard.service"));
const updateCard_service_1 = __importDefault(require("../services/cards/updateCard.service"));
const createCardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, limit, type, dueDate, closingDate } = req.body;
    const ownerId = req.user.id;
    const card = yield (0, createCart_service_1.default)(ownerId, { name, limit, type, dueDate, closingDate });
    // if ( !name || !limit || !type || !dueDate || !closingDate || !ownerId) {
    //   return res.status(400).json({
    //     message: "Fields name, limit, type, dueDate, closingDate and ownerId are required."
    // })}
    return res.status(201).json(card);
});
exports.createCardController = createCardController;
const listCardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield (0, listCards_service_1.default)();
    return res.status(200).json(card);
});
exports.listCardController = listCardController;
const listOneCardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const card = yield (0, listOneCard_service_1.default)(id);
    return res.status(200).json(card);
});
exports.listOneCardController = listOneCardController;
const updateCardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const card = yield (0, updateCard_service_1.default)(id, req.body);
    return res.status(200).json(card);
});
exports.updateCardController = updateCardController;
const deleteCardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, deleteCard_service_1.default)(id);
    return res.status(204);
});
exports.deleteCardController = deleteCardController;
