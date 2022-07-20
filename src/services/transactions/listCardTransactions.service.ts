import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IListTransaction } from "../../interfaces/Transactions";

const listCardTransactionsService = async (foundCard:Card)=>{ 
    const transactionsRepository = AppDataSource.getRepository(Transactions)
    const userRepository = AppDataSource.getRepository(User)

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
    const returnTransactions = Promise.all(cardTransaction.map( async (transaction)=>{
      const user = await userRepository.findOneBy({transactions:{transactions_id:transaction.transactions_id}})
      if(!user){
        throw new AppError(404, "Transaction not found")
      }             
    
      const treatedTransaction:IListTransaction = {
          transactions_id:transaction.transactions_id,
          type:transaction.type,
          description:transaction.description,
          value:transaction.value,
          category:transaction.category,
          created_at:transaction.created_at,
          updated_at:transaction.updated_at,
          card_id:foundCard.id, 
          users_id:user.id
      }
      return treatedTransaction
      
    }))  
    
    
    
    return returnTransactions
}

export default listCardTransactionsService