import { AppDataSource } from "../../data-source"
import { Card } from "../../entities/card.entity"
import { Friendlist } from "../../entities/friendlist.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"


const addToAllowedService = async (foundUser:User, foundCard:Card, friend_id:string)=>  {
    const userRepository = AppDataSource.getRepository(User)  
    const cardRepository = AppDataSource.getRepository(Card)


    const friendToAllow = await userRepository.findOneBy({id:friend_id})
    if(!friendToAllow){
        throw new AppError(404, "User not found")
    }

    const friendlistRepository = AppDataSource.getRepository(Friendlist);

    const user = await userRepository.findOne({where:{id: foundUser.id}, relations:['friendList', 'friendList.user', 'friendList.friend']})

    if(!user) return undefined

    if(user.friendList.length === 0){
     throw new AppError(404,"your friends list is empty")
    }

    const friendsLists = user.friendList.map((entity) => {
        return entity.friend
    })

    const foundFriend = friendsLists.find(user => user.id === friendToAllow.id)
    
    console.log(friendsLists)
    if(!foundFriend){
        throw new AppError(409, "You can't add a user that isn't your friend.")
    }
    
    

    foundCard.allowedUsers.push(foundFriend)
    
       

    cardRepository.save(foundCard)
    
    const returnAllowed = {
        id: foundCard.id,
        name: foundCard.name,    
        limit: foundCard.limit,
        type: foundCard.type,
        dueDate: foundCard.dueDate,
        closingDate: foundCard.closingDate,
        ownerId: foundCard.Owner.id,
        allowedUsers: foundCard.allowedUsers,
        updated_at:foundCard.updated_at,
        created_at:foundCard.created_at
      }
  
    return returnAllowed
  
  }  
  export default addToAllowedService