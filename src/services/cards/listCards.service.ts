import {AppDataSource} from "../../data-source"
import { Card } from "../../entities/card.entity"
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors/appError"


const listCardService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({id})
  
  if (!user) {
    throw new AppError(404, "User not found")
  }

  const cardRepository = AppDataSource.getRepository(Card)

  const card = cardRepository.find({
    where: {
      Owner: {
        id : id
      }
    }
  })

  return card
}

export default listCardService

// select:["name","id","limit"]