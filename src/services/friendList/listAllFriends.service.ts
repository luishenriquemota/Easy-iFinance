import { AppDataSource } from "../../data-source";
//import da Entity User
//import da Entity Friendlist

const listAllFriendsService = async (user_id: string) => {
  //   const userRepository = AppDataSource.getRepository(User);
  //   const friendlistRepository = AppDataSource.getRepository(Friendlist);
  //   const user = await userRepository.find();
  //   const friendlist = await friendlistRepository.find()
  //   const userById = await user.find({
  //       where: {
  //         id: user_id,
  //       },
  //     })
  //     if(!userById) {
  //         throw new Error("User not found")
  //     }
  // const friends = await friendlist.find({
  //   where: [{
  //       friend_1: userById.id
  //   }, {
  //       friend_2: userById.id
  //   }]
  // })
  //   return friends
};

export default listAllFriendsService;
