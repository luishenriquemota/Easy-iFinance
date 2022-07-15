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
const verifyFriendshipAlreadyExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const userRepository = AppDataSource.getRepository(User);
    // const friendlistRepository = AppDataSource.getRepository(Friendlist);
    // const user = await userRepository.find();
    //   const friendlist = await friendlistRepository.find()
    //   const { user_id } = req.params;
    //   const { myId } = req.body;
    //   const userById = await user.find({
    //       where: {
    //         id: myId,
    //       },
    //     })
    //   const friendById = await user.find({
    //       where: {
    //           id: user_id,
    //       },
    //     })
    // if(!friendById) {
    //     throw new Error("Desired friend not found")
    // }
    // const verifyFriendship = await friendlist.find({
    //   where: [{
    //       friend_1: myId,
    //       friend_2: user_id,
    //   },{
    //       friend_1: user_id,
    //       friend_2: myId,
    //   }]
    // })
    //   if(verifyFriendship) {
    //     throw new Error("Users are already friends")
    //   }
    //   next()
});
exports.default = verifyFriendshipAlreadyExists;
