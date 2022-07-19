import {AppDataSource} from "../../data-source"
import { Card } from "../../entities/card.entity"
import { AppError } from "../../errors/appError"

const listOneCardService = async (owner_id:string, card_id:number) => {

  const cardRepository = AppDataSource.getRepository(Card)

  const card = await cardRepository.findOneBy({id: card_id});

  if (!card) {
    throw new AppError(404, "Card not found") 
  }


  if(card.Owner?.id !== owner_id){
    throw new AppError(409, "you do not have permission")
  }

  const returnCard = {
    id: card.id,
    name: card.name,    
    limit: card.limit,
    type: card.type,
    dueDate: card.dueDate,
    closingDate: card.closingDate,
    ownerId: card.Owner.id,
    allowedUsers: card.allowedUsers
  }

  return returnCard
}

export default listOneCardService




