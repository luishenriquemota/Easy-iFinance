import { AppDataSource } from "../../data-source"
import { Card } from "../../entities/card.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"


const addToAllowedService = async (foundUser:User, foundCard:Card, friend_id:string)=>  {
    const userRepository = AppDataSource.getRepository(User)  
    const cardRepository = AppDataSource.getRepository(Card)


    const friendToAllow = await userRepository.findOneBy({id:friend_id})
    if(!friendToAllow){
        throw new AppError(404, "User not found")
    }

    /*foundUser.friendList.find(user => user.id.toString() === friendToAllow.id)
    
    if(!foundUser){
        throw new AppError(409, "You can't add a user that isn't your friend.")
    }*/
    
   

    const updatedData = {
        allowedUsers : foundCard.allowedUsers
    }

    updatedData.allowedUsers.push(friendToAllow)

    cardRepository.update(foundCard.id,updatedData)
    
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