import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUpdateTransaction } from "../../interfaces/Transactions";


const updateTransactionService = async (foundUser:User,transactions_id:string, updatedData:IUpdateTransaction) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const findTransaction = await transactionsRepository.findOne({ 
        where:{ 
            transactions_id: transactions_id
        }
    });
   const isUserTransaction = foundUser.transactions?.filter(transaction=> {
    return transaction.transactions_id.toString() === transactions_id})
    
    if(!findTransaction || !isUserTransaction){
        throw new AppError( 404, "Transaction not found")
    }
    
    const updatedTransaction = {...findTransaction,...updatedData}

    updatedTransaction.updated_at = new Date()

    await transactionsRepository.update(transactions_id, updatedTransaction)


    return updatedTransaction
    
}

export default updateTransactionService