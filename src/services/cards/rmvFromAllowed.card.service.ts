import { AppDataSource } from "../../data-source"
import { Card } from "../../entities/card.entity"
import { Friendlist } from "../../entities/friendlist.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"


const rmvFromAllowedService = async (foundUser:User, foundCard:Card, friend_id:string):Promise<void> =>  {
    const userRepository = AppDataSource.getRepository(User)  
    const cardRepository = AppDataSource.getRepository(Card)


    const friendToExclude = await userRepository.findOneBy({id:friend_id})
    if(!friendToExclude){
        throw new AppError(404, "User not found")
    }

    const verifyFriendIndex = foundCard.allowedUsers.findIndex(user=>user.id === friendToExclude.id)
    
    if(verifyFriendIndex === -1){
        throw new AppError(404, "Friend isn't in your allowed list in this card")
    }   

    foundCard.allowedUsers.splice(verifyFriendIndex, 1)    
       

    await cardRepository.save(foundCard)
    
  
    
  
  }  
  export default rmvFromAllowedService