import { AppDataSource } from "../../data-source";
import {ICardCreate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
import { AppError } from "../../errors/appError";
import {User} from "../../entities/user.entity"

const createCardService = async (owner_id: string, {name, limit, type, dueDate, closingDate}: ICardCreate)=>  {
  const userRepository = AppDataSource.getRepository(User)
  const cardRepository = AppDataSource.getRepository(Card)

  const user = await userRepository.findOneBy({id: owner_id})  

  if(type === "debit"){

    const newCard = new Card
    newCard.name  = name    
    newCard.limit = limit
    newCard.type  = type
    newCard.Owner = user!
    newCard.allowedUsers = []
    
    await cardRepository.save(newCard)

    return  {... newCard, Owner: user?.id}
  }

  if(!closingDate || !dueDate) {
    throw new AppError(400, "Fields dueDate and closingDate are required");
  }
  const newCard = new Card
  newCard.name = name    
  newCard.limit = limit
  newCard.type = type
  newCard.dueDate = dueDate
  newCard.closingDate = closingDate
  newCard.Owner = user!
  newCard.allowedUsers = []
  
  await cardRepository.save(newCard)

  return {... newCard, Owner: user?.id}

}  
export default createCardService