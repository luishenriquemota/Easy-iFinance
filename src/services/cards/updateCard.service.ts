import {AppDataSource} from "../../data-source"
import {ICardUpdate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
import { AppError } from "../../errors/appError";



const updateCardService = async (owner_id: string, card_id: number, updateData:ICardUpdate) => {
  const cardRepository = AppDataSource.getRepository(Card)

  const card = await cardRepository.findOneBy({id: card_id})

  if(card?.Owner?.id !== owner_id){
   
    throw new AppError(409, "User does not have permission.")

  }
  
  updateData.updated_at = new Date()
  
  const updateCard = {...card, ...updateData}

  await cardRepository.save(updateCard)

  return updateCard
}
export default updateCardService
