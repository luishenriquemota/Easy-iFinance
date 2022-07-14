import { AppDataSource } from "../../data-source";
import {ICardCreate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
// import { AppError } from "../../errors/appError";
// import {User} from "../../entities/user.entity"

const createCardService = async ({name, limit, type, dueDate, closingDate, ownerId}: ICardCreate): Promise<Card> =>  {
  // const userRepository = AppDataSource.getRepository(User)
  const cardRepository = AppDataSource.getRepository(Card)

  // const user = await userRepository.findOneBy({id:ownerId})

  // if (!user) {
  //   throw new AppError(404, "user not found")
  // }


  const card = await cardRepository.findOneBy({name})

  if (card) {
    throw new Error("card already exists") //409
  }

  const newCard = await cardRepository.save({
    name: name,
    limit: limit,
    type: type,
    dueDate: dueDate,
    closingDate: closingDate,
    // user: user,
    users: []
  })

  return newCard

}  

export default createCardService