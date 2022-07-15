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
const appError_1 = require("../errors/appError");
const verifyUserCardRelation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { foundCard, foundUser } = req.user;
    if (foundCard && foundUser) {
        const userCard = (_a = foundUser.cards) === null || _a === void 0 ? void 0 : _a.filter(card => card.id === req.user.foundCard.id);
        if (!userCard) {
            return new appError_1.AppError(403, "This Card is not associated to the user");
        }
    }
    next();
});
exports.default = verifyUserCardRelation;
