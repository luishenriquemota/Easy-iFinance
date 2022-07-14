import { AppDataSource } from "../../data-source";
//import da Entity User
//import da Entity Friendlist

const listOneFriendService = async (friend_id: string, user_id: string) => {
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
  //   where: {
  //       friend_1: friendById.id
  //       friend_2: userById.id
  //   }
  //   || {
  //       friend_1: userById.id
  //       friend_2: friendById.id
  //   }
  // })
  // if(!friend) {
  //     throw new Error("Users are not friends")
  // }
  // return friend
};

export default listOneFriendService;
