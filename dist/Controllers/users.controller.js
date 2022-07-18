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
exports.deleteUserController = exports.updateUserController = exports.profileUserController = exports.loginUserController = exports.createUserController = void 0;
const createUser_service_1 = __importDefault(require("../services/users/createUser.service"));
const deleteUser_service_1 = __importDefault(require("../services/users/deleteUser.service"));
const loginUser_service_1 = __importDefault(require("../services/users/loginUser.service"));
const profileUser_service_1 = __importDefault(require("../services/users/profileUser.service"));
const updateUser_service_1 = __importDefault(require("../services/users/updateUser.service"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, birth_date } = req.body;
    const newUser = yield (0, createUser_service_1.default)({ name, email, password, birth_date });
    return res.status(201).json(newUser);
});
exports.createUserController = createUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const token = yield (0, loginUser_service_1.default)({ email, password });
    return res.status(200).json({ token });
});
exports.loginUserController = loginUserController;
const profileUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield (0, profileUser_service_1.default)(id);
    return res.status(200).json(user);
});
exports.profileUserController = profileUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const changes = req.body;
    const user = yield (0, updateUser_service_1.default)(id, changes);
    return res.status(200).json(user);
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    yield (0, deleteUser_service_1.default)(id);
    return res.status(204).send();
});
exports.deleteUserController = deleteUserController;
