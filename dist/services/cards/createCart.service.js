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
const appError_1 = require("../../errors/appError");
const user_entity_1 = require("../../entities/user.entity");
const createCardService = (ownerId, { name, limit, type, dueDate, closingDate }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const cardRepository = data_source_1.AppDataSource.getRepository(card_entity_1.Card);
    const user = yield userRepository.findOneBy({ id: ownerId });
    if (!user) {
        throw new appError_1.AppError(404, "user not found");
    }
    const card = yield cardRepository.findOneBy({ name });
    if (card) {
        throw new Error("card already exists"); //409
    }
    const newCard = new card_entity_1.Card;
    newCard.Owner = user;
    newCard.allowedUsers = [];
    newCard.closingDate = closingDate;
    newCard.dueDate = dueDate;
    newCard.limit = limit;
    newCard.name = name;
    newCard.type = type;
    const returningUser = {
        id: newCard.id,
        name,
        limit,
        type,
        dueDate,
        closingDate,
        ownerId,
        allowedUsers: [],
    };
    yield cardRepository.save(newCard);
    return returningUser;
});
exports.default = createCardService;
