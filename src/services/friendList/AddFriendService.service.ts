import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Friendlist } from "../../entities/friendlist.entity";
import { AppError } from "../../errors/appError";

const addFriendService = async (friend_id: string, user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const friendlistRepository = AppDataSource.getRepository(Friendlist);

  const userById = await userRepository.findOneBy({
    id: user_id,
  });

  const friendById = await userRepository.findOneBy({
    id: friend_id,
  });
  if (!userById || !friendById) {
    throw new AppError(409, "User not found");
  }

  const friendship = new Friendlist();
  friendship.user1.id = user_id;
  friendship.user2.id = friend_id;
  friendlistRepository.create(friendship);
  await friendlistRepository.save(friendship);

  return friendById?.name;
};

export default addFriendService;
