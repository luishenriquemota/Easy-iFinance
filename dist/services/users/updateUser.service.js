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
const data_source_1 = require("../../data-source");
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updateUserService = (id, changes) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield userRepository.findOneBy({ id: id });
    if (!user) {
        throw new appError_1.AppError(404, "User dont exists");
    }
    user.name = changes.name ? changes.name : user.name;
    user.email = changes.email ? changes.email : user.email;
    user.password = changes.password ? bcryptjs_1.default.hashSync(changes.password, 10) : user.password;
    yield userRepository.save(user);
    return Object.assign(Object.assign({}, user), { password: undefined, cards: undefined, transactions: undefined });
});
exports.default = updateUserService;
