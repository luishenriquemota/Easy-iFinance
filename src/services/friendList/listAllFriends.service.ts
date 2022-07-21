import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Friendlist } from "../../entities/friendlist.entity";
import { AppError } from "../../errors/appError";

const listAllFriendsService = async (user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const friendlistRepository = AppDataSource.getRepository(Friendlist);

  const user = await userRepository.findOne({where:{id: user_id}, relations:['friendList', 'friendList.user', 'friendList.friend']})

  if(!user) return undefined

  if(user.friendList.length === 0){
    throw new AppError(404,"your friends list is empty")
  }

  const friendsLists = user.friendList.map((entity) => {
    return entity.friend
  })
  const friendsData = await friendlistRepository.find({where:{friend:{id: user.id}}, relations:['user']})
  for(const friend of friendsData){
    friendsLists.push(friend.user)
  }
  return friendsLists
};
export default listAllFriendsService;

