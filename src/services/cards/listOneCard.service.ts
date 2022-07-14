import {AppDataSource} from "../../data-source"
import { Card } from "../../entities/card.entity"
// import { AppError } from "../../errors/appError"

const listOneCardService = async (id: string) => {
  const cardRepository = AppDataSource.getRepository(Card)

  const card = cardRepository.findOneBy({id: Number(id)})

  if (!card) {
    throw new Error("Card not found") //404
  }

  return card
}

export default listOneCardService
