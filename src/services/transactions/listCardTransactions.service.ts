import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";
import { AppError } from "../../errors/appError";

const listCardTransactionsService = async (foundCard:Card)=>{ 
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const cardTransaction = transactionsRepository.find()
    console.log(cardTransaction)
    if(!foundCard.transactions){
      throw new AppError( 400 , "Card don't have transactions")
    }
    
   return foundCard.transactions 
}

export default listCardTransactionsService