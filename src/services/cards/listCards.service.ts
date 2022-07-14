import {AppDataSource} from "../../data-source"
import { Card } from "../../entities/card.entity"


const listCardService = async () => {

  const cardRepository = AppDataSource.getRepository(Card)

  const card = cardRepository.find()

  return card
}

export default listCardService