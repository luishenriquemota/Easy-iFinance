import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";
import { IUpdateTransaction } from "../../interfaces/Transactions";


const updateTransactionService = async (transactions_id:string, updatedData:IUpdateTransaction) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const findTransaction = await transactionsRepository.findOne({ 
        where:{ 
            transactions_id: transactions_id
        }
    });
    if(!findTransaction){
        throw new Error("User not found")
    }
    
    const updatedTransaction = {...updatedData, ...findTransaction}

    updatedTransaction.updated_at = new Date()

    await transactionsRepository.update(transactions_id, updatedTransaction)


    return updatedTransaction
    
}

export default updateTransactionService