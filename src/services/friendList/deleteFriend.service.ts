import { AppDataSource } from "../../data-source";
import { Friendlist } from "../../entities/friendlist.entity";
import { User } from "../../entities/user.entity";

const deleteFriendService = async (friend_id: string, user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const friendlistRepository = AppDataSource.getRepository(Friendlist);

  const user = await userRepository.findOne({where:{id: user_id}, relations:['friendList']})

    const friendsLists = Promise.all(
    user!.friendList.map(async (list) => {
    const friendTable = await friendlistRepository.findOne({where:{id: list.id, friend:{id: friend_id}}, relations:['friend']})
      if(friendTable?.id){
        return friendTable!.id
      }
    })
  )

  const friendsLists2 = Promise.all(
    user!.friendList.map(async (list) => {
    const friendTable = await friendlistRepository.findOne({where:{id: list.id, user:{id: friend_id}}, relations:['user']})
      if(friendTable?.id){
        return friendTable!.id
      }
    })
  )

    const listId1 =  (await friendsLists).join("")
    console.log(listId1)

    const listId2 =  (await friendsLists2).join("")
    console.log(listId2)

    if(listId1){
      await friendlistRepository.delete(listId1)
    }

    if(listId2){
      await friendlistRepository.delete(listId2)
    }
};
export default deleteFriendService;
