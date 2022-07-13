import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";

const deleteTransactionService = async (transactions_id:string) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const findTransaction = await transactionsRepository.findOne({ 
        where:{ 
            transactions_id: transactions_id
        }
    });
    
    if(!findTransaction){
        throw new Error("User not found")
    }

    await transactionsRepository.delete(transactions_id)
    
}

export default deleteTransactionService