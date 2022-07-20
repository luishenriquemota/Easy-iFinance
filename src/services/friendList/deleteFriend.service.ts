import { AppDataSource } from "../../data-source";
import { Friendlist } from "../../entities/friendlist.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteFriendService = async (friend_id: string, user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const friendlistRepository = AppDataSource.getRepository(Friendlist);

  const user = await userRepository.findOne({where:{id: user_id}, relations:['friendList']})

  if(!user) return undefined
  
  
  const friendsLists = await Promise.all(
    user.friendList.map(async (list) => {
    const friendTable = await friendlistRepository.findOne({where:{id: list.id, friend:{id: friend_id}}, relations:['friend']})

    if(!friendTable?.id) throw new AppError(400, "User dont exists")
    
    return friendTable.id
    })
  )
  
  if(friendsLists.length === 0) throw new AppError(404, "FriendList is empty")
  
  const findFriend = friendsLists.find(friend => friend.id === friend_id) 

  friendsLists.forEach(async (item) => {
  await friendlistRepository.delete({id: item})
  })

};
export default deleteFriendService;
