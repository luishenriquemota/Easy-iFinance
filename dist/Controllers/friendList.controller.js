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
exports.listOneFriendController = exports.listAllFriendsController = exports.deleteFriendController = exports.addFriendController = void 0;
const AddFriendService_service_1 = __importDefault(require("../services/friendList/AddFriendService.service"));
const deleteFriend_service_1 = __importDefault(require("../services/friendList/deleteFriend.service"));
const listAllFriends_service_1 = __importDefault(require("../services/friendList/listAllFriends.service"));
const listOneFriend_service_1 = __importDefault(require("../services/friendList/listOneFriend.service"));
const addFriendController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const { myId } = req.body;
        const friends = (0, AddFriendService_service_1.default)(user_id, myId);
        return res
            .status(201)
            .json({ message: `${friends} added to your friendlist.` });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                error: error.name,
                message: error.message,
            });
        }
    }
});
exports.addFriendController = addFriendController;
const deleteFriendController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friend_id } = req.params;
        const { myId } = req.body;
        const deleted = yield (0, deleteFriend_service_1.default)(friend_id, myId);
        return res.status(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                error: error.name,
                message: error.message,
            });
        }
    }
});
exports.deleteFriendController = deleteFriendController;
const listAllFriendsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const friends = yield (0, listAllFriends_service_1.default)(user_id);
        return res.status(200).send(friends);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                error: error.name,
                message: error.message,
            });
        }
    }
});
exports.listAllFriendsController = listAllFriendsController;
const listOneFriendController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friend_id } = req.params;
        const myId = req.body;
        const friend = yield (0, listOneFriend_service_1.default)(friend_id, myId);
        return res.status(200).send(friend);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({
                error: error.name,
                message: error.message,
            });
        }
    }
});
exports.listOneFriendController = listOneFriendController;
