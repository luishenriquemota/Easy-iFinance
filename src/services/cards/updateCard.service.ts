import {AppDataSource} from "../../data-source"
import {ICardUpdate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";



const updateCardService = async (owner_id: string, card_id: number, updateData:ICardUpdate) => {
  const userRepository = AppDataSource.getRepository(User)
  const cardRepository = AppDataSource.getRepository(Card)

  const user = await userRepository.findOneBy({id: owner_id})
  const card = await cardRepository.findOneBy({id: card_id})

  if (!user) {
    throw new AppError(404, "User not found") 
  }

  if (!card) {
    throw new AppError(404, "Card not found") 
  }
  
  if(card!.Owner!.id !== user!.id) {   
    throw new AppError(409, "User does not have permission.")
  }
  
  updateData.Owner = user
  updateData.updated_at = new Date()
  
  const updateCard = {...card, ...updateData}

  await cardRepository.save(updateCard)
  
  return {... updateCard, Owner: owner_id}
}
export default updateCardService
