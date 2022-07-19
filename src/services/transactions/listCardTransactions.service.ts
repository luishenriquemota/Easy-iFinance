import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";
import { AppError } from "../../errors/appError";

const listCardTransactionsService = async (foundCard:Card)=>{ 
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const cardTransaction = await transactionsRepository.find({
      where:{
        card:{
          id:foundCard.id
        }
      }
    })
   
    if(!cardTransaction){
      throw new AppError( 400 , "Card don't have transactions")
    }
    
   return cardTransaction
}

export default listCardTransactionsService