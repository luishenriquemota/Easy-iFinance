import { AppDataSource } from "../../data-source";
import { IUpdateTransaction } from "../../interfaces/transactions";

const updateTransactionService = async (transactions_id:string, updatedData:IUpdateTransaction) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const userTransaction = transactionsRepository.findOneBy({
         where:{
            transactions_id:transactions_id
         }       
    })
    
    const updatedTransaction = {...updatedData, ...userTransaction}

    updatedTransaction.updated_at = new Date()

    await transactionsRepository.update(transactions_id, updatedTransaction)


    return updatedTransaction
    
}

export default updateTransactionService