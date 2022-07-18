import { AppDataSource } from "../../data-source";
import { Friendlist } from "../../entities/friendlist.entity";
import { AppError } from "../../errors/appError";

const deleteFriendService = async (friend_id: string, user_id: string) => {
  const friendlistRepository = AppDataSource.getRepository(Friendlist);
  const friendlist = await friendlistRepository.find();

  const friendship = friendlist.find(
    (line) =>
      (line.user1.id === user_id && line.user2.id === friend_id) ||
      (line.user1.id === friend_id && line.user2.id === user_id)
  );
  if (!friendship) {
    throw new AppError(409, "Users are not friends");
  }
  await friendlistRepository.delete(friendship!.id);
  return true;
};

export default deleteFriendService;
