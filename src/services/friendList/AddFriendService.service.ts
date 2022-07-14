import { AppDataSource } from "../../data-source";
//import da Entity User
//import da Entity Friendlist

const addFriendService = async (friend_id: string, user_id: string) => {
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
  //         id: friend_id,
  //     },
  //   })
  // const friendship = new Friendlist()
  // friendship.friend_1: userById.id
  // friendship.friend_2: friendById.id
  // friendlistRepository.create(friendship)
  // await friendlistRepository.save(friendship)
  // return friendById.name
};

export default addFriendService;
