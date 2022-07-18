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
const card_entity_1 = require("../../entities/card.entity");
// import { AppError } from "../../errors/appError";
const updateCardService = (id, { name, limit, type, dueDate, closingDate }) => __awaiter(void 0, void 0, void 0, function* () {
    const cardRepository = data_source_1.AppDataSource.getRepository(card_entity_1.Card);
    const card = yield cardRepository.findOneBy({ id: Number(id) });
    if (!card) {
        throw new Error("Card not found"); //404
    }
    name && (card.name = name);
    limit && (card.limit = limit);
    type && (card.type = type);
    dueDate && (card.dueDate = dueDate);
    closingDate && (card.closingDate = closingDate);
    yield cardRepository.update(card.id, Object.assign(Object.assign({}, card), { updated_at: new Date() }));
    return card;
});
exports.default = updateCardService;
