import { AppDataSource } from "../../data-source";
import {ICardCreate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
import { AppError } from "../../errors/appError";
import {User} from "../../entities/user.entity"


const createCardService = async (owner_id: string, {name, limit, type, dueDate, closingDate}: ICardCreate)=>  {
   if ( !name || !type || !limit) {
    throw new AppError(400,"Fields name, type and limit  are required.")   
  }
  
  const userRepository = AppDataSource.getRepository(User)
  const cardRepository = AppDataSource.getRepository(Card)

  const user = await userRepository.findOneBy({id: owner_id})  


  if (!user) {
    throw new AppError(404, "User not found")
  }

   const card = await cardRepository.findOneBy({name})
      
   if (card) {
     throw new AppError(409, "Card already exist") 
   }

  if(type === "debit"){

    const newCard = new Card
    newCard.name = name  
    newCard.limit = limit
    newCard.type = type
    newCard.Owner = user

    const returingCard ={
      name :newCard.name  ,
      limit :newCard.limit,
      type :newCard.type,
      owner_id: user.id,
      created_at:newCard.created_at,
      updated_at:newCard.updated_at,
      transactions:newCard.transactions||[],
      alloedUsers:newCard.allowedUsers || []
    }
    
    await cardRepository.save(newCard)

    return  returingCard
  }

  if(!closingDate || !dueDate || !limit) {
    throw new AppError(400, "Due Date, Closing date are required.");
  }
  const newCard = new Card
  newCard.name = name  
  newCard.limit = limit
  newCard.type = type
  newCard.dueDate = dueDate
  newCard.closingDate = closingDate
  newCard.Owner = user
  
  await cardRepository.save(newCard)
  
  const returingCard ={
    id:newCard.id,
    name :newCard.name  ,
    limit :newCard.limit,
    type :newCard.type,
    dueDate :newCard.dueDate,
    closingDate :newCard.closingDate,
    owner_id: user.id,
    created_at:newCard.created_at,
    updated_at:newCard.updated_at,
    transactions:newCard.transactions||[],
    allowedUsers:newCard.allowedUsers || []
  }

  return returingCard

}  
export default createCardService