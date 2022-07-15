import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";
import { AppError } from "../../errors/appError";

const deleteTransactionService = async (transactions_id:string) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const findTransaction = await transactionsRepository.findOne({ 
        where:{ 
            transactions_id: transactions_id
        }
    });
    
    if(!findTransaction){
        throw new AppError(404,"User not found")
    }

    
    await transactionsRepository.delete(transactions_id)
    
}

export default deleteTransactionService