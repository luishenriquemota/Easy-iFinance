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
//import da Entity User
//import da Entity Friendlist
const listOneFriendService = (friend_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    // const userRepository = AppDataSource.getRepository(User);
    // const friendlistRepository = AppDataSource.getRepository(Friendlist);
    // const user = await userRepository.find();
    // const friendlist = await friendlistRepository.find()
    // const userById = await user.find({
    //     where: {
    //       id: user_id,
    //     },
    //   })
    // const friendById = await user.find({
    //     where: {
    //       id: friend_id,
    //     },
    //   })
    //   if(!friendById) {
    //       throw new Error("Friend not found")
    //   }
    // const friend = await friendlist.find({
    //   where: [{
    //       friend_1: friendById.id
    //       friend_2: userById.id
    //   },{
    //       friend_1: userById.id
    //       friend_2: friendById.id
    //   }]
    // })
    // if(!friend) {
    //     throw new Error("Users are not friends")
    // }
    // return friend
});
exports.default = listOneFriendService;
