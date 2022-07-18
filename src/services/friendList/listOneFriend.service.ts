import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Friendlist } from "../../entities/friendlist.entity";
import { AppError } from "../../errors/appError";

const listOneFriendService = async (friend_id: string, user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const friendlistRepository = AppDataSource.getRepository(Friendlist);
  const friendlist = await friendlistRepository.find();

  const friendById = await userRepository.findOneBy({
    id: friend_id,
  });

  if (!friendById) {
    throw new Error("Friend not found");
  }

  const friendship = friendlist.find(
    (line) =>
      (line.user1.id === user_id && line.user2.id === friend_id) ||
      (line.user1.id === friend_id && line.user2.id === user_id)
  );

  if (!friendship) {
    throw new AppError(409, "Users are not friends");
  }
  return friendship;
};

export default listOneFriendService;
