import { AppDataSource } from "../../data-source";
//import da Entity User
//import da Entity Friendlist

const deleteFriendService = async (friend_id: string, user_id: string) => {
  //   const userRepository = AppDataSource.getRepository(User);
  //   const friendlistRepository = AppDataSource.getRepository(Friendlist);
  //   const user = await userRepository.find();
  //   const friendlist = await friendlistRepository.find()
  //   const userById = await user.find({
  //       where: {
  //         id: user_id,
  //       },
  //     })
  //   const friendById = await user.find({
  //       where: {
  //           id: friend_id,
  //       },
  //     })
  //     const friendship = await friendlist.find({
  //             where: {
  //                 friend_1: userById.id,
  //                 friend_2: friendById.id,
  //             } || {
  //                 friend_1: friendById.id,
  //                 friend_2: userById.id,
  //             }
  //           })
  //     if(!friendship) {
  //         throw new Error("Friendship not found")
  //     }
  //     await friendlistRepository.delete(friendship!.id)
  //     return true
};

export default deleteFriendService;
