import {AppDataSource} from "../../data-source"
import {ICardUpdate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors/appError";


const updateCardService = async (id: string, card_id: string, updateData:ICardUpdate) => {
  const userRepository = AppDataSource.getRepository(User)
  const cardRepository = AppDataSource.getRepository(Card)

  const user = await userRepository.findOneBy({id})
  
  if (!user) {
    throw new AppError(404, "User not found")
  }

  
  
  const card = await cardRepository.findOneBy({id: Number(card_id)})
  
  if (!card) {
    throw new AppError(404, "Card not found")
  } 
  
  updateData.updated_at = new Date()
  
  const updateCard = {...card, ...updateData}

  await cardRepository.update(updateCard.id, updateData)
  return updateCard
}

export default updateCardService
