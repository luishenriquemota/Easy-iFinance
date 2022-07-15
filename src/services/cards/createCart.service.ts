import { AppDataSource } from "../../data-source";
import {ICardCreate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
import { AppError } from "../../errors/appError";
import {User} from "../../entities/user.entity"

const createCardService = async (ownerId: string, {name, limit, type, dueDate, closingDate}: ICardCreate) =>  {
  const userRepository = AppDataSource.getRepository(User)
  const cardRepository = AppDataSource.getRepository(Card)

  const user = await userRepository.findOneBy({id:ownerId})

  if (!user) {
    throw new AppError(404, "user not found")
  }


  const card = await cardRepository.findOneBy({name})

  if (card) {
    throw new Error("card already exists") //409
  }


  const newCard = new Card

  newCard.Owner = user

  newCard.allowedUsers = []

  newCard.closingDate = closingDate
  
  newCard.dueDate = dueDate

  newCard.limit = limit

  newCard.name = name

  newCard.type = type
  console.log(newCard)
  const returningUser = {
    id:newCard.id,
    name,
    limit,
    type,
    dueDate,
    closingDate,
    ownerId,
    allowedUsers: [],
  }

  await cardRepository.save(newCard)

  return returningUser

}  

export default createCardService