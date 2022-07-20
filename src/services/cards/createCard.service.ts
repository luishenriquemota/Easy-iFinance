import { AppDataSource } from "../../data-source";
import {ICardCreate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
import { AppError } from "../../errors/appError";
import {User} from "../../entities/user.entity"

const createCardService = async (id: string, {name, limit, type, dueDate, closingDate}: ICardCreate)=>  {
  if ( !name || !type || !limit) {
    throw new AppError(409,"Fields name, type and limit  are required.")   
  }
  
  const userRepository = AppDataSource.getRepository(User)
  const cardRepository = AppDataSource.getRepository(Card)

  const user = await userRepository.findOneBy({id})  

  if (!user) {
    throw new AppError(404, "User not found")
  }

   const card = await cardRepository.findOneBy({name})
      
   if (card) {
     throw new AppError(409, "Card already exists") 
   }


  if(type === "debit"){

    const newCard = new Card
    newCard.name = name  
    newCard.limit = limit
    newCard.type = type
    newCard.Owner = user
    newCard.allowedUsers = []
    
    await cardRepository.save(newCard)

    return  {... newCard, Owner: user.id}
  }

  if(!closingDate || !dueDate || !limit) {
    throw new AppError(409, "Due Date, Closing date are required.");
  }
  const newCard = new Card
  newCard.name = name  
  newCard.limit = limit
  newCard.type = type
  newCard.dueDate = dueDate
  newCard.closingDate = closingDate
  newCard.Owner = user
  newCard.allowedUsers = []
  
  await cardRepository.save(newCard)

  return {... newCard, Owner: user.id}

}  
export default createCardService