import { AppDataSource } from "../../data-source";
import {ICardCreate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
import { AppError } from "../../errors/appError";
import {User} from "../../entities/user.entity"

const createCardService = async (id: string, {name, limit, type, dueDate, closingDate}: ICardCreate)=>  {
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

  const newCard = new Card
    newCard.name = name    
    newCard.limit = limit
    newCard.type = type
    newCard.dueDate = dueDate,
    newCard.closingDate = closingDate
    newCard.Owner = user
    newCard.allowedUsers = []
  

  await cardRepository.save(newCard)

  const returnCard = {
    id: newCard.id,
    name: newCard.name,    
    limit: newCard.limit,
    type: newCard.type,
    dueDate: newCard.dueDate,
    closingDate: newCard.closingDate,
    ownerId: newCard.Owner.id,
    allowedUsers: newCard.allowedUsers
  }
    
  return returnCard

}  

export default createCardService