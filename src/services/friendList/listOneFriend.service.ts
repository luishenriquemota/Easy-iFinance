import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Friendlist } from "../../entities/friendlist.entity";
import { AppError } from "../../errors/appError";

const listOneFriendService = async (friend_id: string, user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const friendlistRepository = AppDataSource.getRepository(Friendlist);

  const user = await userRepository.findOne({where:{id: user_id}, relations:['friendList']})

    const friendsLists = Promise.all(
    user!.friendList.map(async (list) => {
    const friendTable = await friendlistRepository.findOne({where:{id: list.id}, relations:['friend']})

      return friendTable!.friend // fazer um forech para retornar o friendlist como undefined
    })
  )

  const friend = (await friendsLists).find(entity => entity?.id === friend_id)

  if(!friend) throw new AppError(404, "Friend not found.")

  return friend
};
export default listOneFriendService;
