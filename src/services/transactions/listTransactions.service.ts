import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";



const listTransactionsService = async (user_id:string) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const userTransactions = transactionsRepository.find({
         where:{
            user:user_id
         }
       
    })    

    return userTransactions
}

export default listTransactionsService