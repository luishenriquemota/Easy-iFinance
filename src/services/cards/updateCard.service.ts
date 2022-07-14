import {AppDataSource} from "../../data-source"
import {ICardUpdate} from "../../interfaces/cards"
import {Card} from "../../entities/card.entity"
// import { AppError } from "../../errors/appError";


const updateCardService = async (id: string, {name, limit, type, dueDate, closingDate}:ICardUpdate): Promise<Card> => {
  
    const cardRepository = AppDataSource.getRepository(Card)
  
    const card = await cardRepository.findOneBy({id: Number(id)})

    if (!card) {
      throw new Error("Card not found") //404
    }
   
    name && (card.name = name)
    limit && (card.limit = limit)
    type && (card.type = type)
    dueDate && (card.dueDate = dueDate)
    closingDate && (card.closingDate = closingDate)

    await cardRepository.update(card.id, {...card, updated_at: new Date()})

    return card
}

export default updateCardService
