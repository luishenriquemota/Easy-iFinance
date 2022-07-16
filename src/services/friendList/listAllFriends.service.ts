import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Friendlist } from "../../entities/friendlist.entity";
import { AppError } from "../../errors/appError";

const listAllFriendsService = async (user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const friendlistRepository = AppDataSource.getRepository(Friendlist);
  const friendlist = await friendlistRepository.find();

  const userById = await userRepository.findOneBy({
    id: user_id,
  });

  if (!userById) {
    throw new AppError(409, "User not found");
  }

  const friendship = friendlist.filter(
    (line) => line.user1.id === user_id || line.user2.id === user_id
  );
  return friendship;
};

export default listAllFriendsService;
