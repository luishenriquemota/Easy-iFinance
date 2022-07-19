import {AppDataSource} from "../../data-source"
import {Card} from "../../entities/card.entity"
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors/appError";


const deleteCardService = async (owner_id: string, card_id: number): Promise<void> => {
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

  await cardRepository.delete(card_id) 
}

export default deleteCardService