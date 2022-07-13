import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";

const listCardTransactionsService = (card_id:string)=>{
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const cardTransactions = transactionsRepository.find({
        where:{
           card:card_id
        }      
   }) 
   return cardTransactions 
}

export default listCardTransactionsService