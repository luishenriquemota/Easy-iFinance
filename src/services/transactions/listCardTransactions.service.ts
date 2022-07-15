import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";

const listCardTransactionsService = async (card_id:string)=>{
  const transactionsRepository = AppDataSource.getRepository(Transactions)
  
  const cardRepository = AppDataSource.getRepository(Card)
  
  const foundCard = await cardRepository.findOneBy({
    id: parseInt(card_id)
  })

  if(!foundCard){
    throw new Error("Card not found")
  }

  const allTransactions = await transactionsRepository.find()

  const cardTransactions = allTransactions.filter((transaction) => transaction.card.id === parseInt(card_id))
  
  if (cardTransactions.length === 0) {
    throw new Error("Card not found")
  }
  
  return cardTransactions 
}

export default listCardTransactionsService