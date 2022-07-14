import { AppDataSource } from "../data-source";
//import da Entity User
//import da Entity Friendlist
import { Request, Response, NextFunction } from "express";

const verifyFriendshipAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  //   const verifyFriendship = await friendlist.find({
  //     where: {
  //         friend_1: myId,
  //         friend_2: user_id,
  //     } || {
  //         friend_1: user_id,
  //         friend_2: myId,
  //     }
  //   })
  //   if(verifyFriendship) {
  //     throw new Error("Users are already friends")
  //   }
  //   next()
};

export default verifyFriendshipAlreadyExists;
