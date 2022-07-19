import {AppDataSource} from "../../data-source"
import { Card } from "../../entities/card.entity"
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { ICardList } from "../../interfaces/cards"



const listCardService = async (user_id: string) => {

  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({id:user_id})
  
  if (!user) {
    throw new AppError(404, "User not found")
  }

  const cardRepository = AppDataSource.getRepository(Card)

  const cards = await cardRepository.find({where: {Owner: {id: user_id}}})

  let returnCards:ICardList[] = []

  cards.forEach(card => {
    const returnCard: ICardList = {
      id: card.id,
      name: card.name,    
      limit: card.limit,
      type: card.type,
      dueDate: card.dueDate,
      closingDate: card.closingDate,
      updated_at: card.updated_at,
      ownerId: card.Owner.id,
      allowedUsers: card.allowedUsers
    }
    returnCards.push(returnCard)
  })
  
  return returnCards

  
}

export default listCardService