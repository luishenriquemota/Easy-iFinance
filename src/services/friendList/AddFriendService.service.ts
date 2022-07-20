import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Friendlist } from "../../entities/friendlist.entity";
import { AppError } from "../../errors/appError";

const addFriendService = async (user_id: string, friend_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const friendlistRepository = AppDataSource.getRepository(Friendlist);

  const user = await userRepository.findOne({where: {id: user_id}, relations:['friendList']});

  const friend = await userRepository.findOneBy({id: friend_id});

  if (!friend || !user) throw new AppError(404, "User not found.");

  if(friend_id === user_id) throw new AppError(409,"you can't add yourself.")

  const listFriends = Promise.all(
    user.friendList.map(async (item) => {
      const friendTable = await friendlistRepository.findOne({where: {id: item.id}, relations:['friend']})

      return friendTable?.friend
    })
  )

  const verifyFriendShip = (await listFriends).find(item => item?.id === friend_id)

  if(verifyFriendShip) throw new AppError(409, "you and this user are already friends.")

  const friendship = new Friendlist
  friendship.user = user
  friendship.friend = friend;

  await friendlistRepository.save(friendship);

  return friend?.name;
};
export default addFriendService;
