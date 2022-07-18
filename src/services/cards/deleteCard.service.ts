import {AppDataSource} from "../../data-source"
import {Card} from "../../entities/card.entity"
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors/appError";


const deleteCardService = async (id: string, card_id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User)
  const cardRepository = AppDataSource.getRepository(Card)

  const user = await userRepository.findOneBy({id})

  if (!user) {
    throw new AppError(404, "User not found")
  }

  const card = cardRepository.findOneBy({id: Number(card_id)})

  if (!card) {
    throw new AppError(404, "Card not found") 
  }

  await cardRepository.delete(card_id) 
}

export default deleteCardService