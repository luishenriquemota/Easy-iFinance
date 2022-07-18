import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteTransactionService = async (foundUser:User,transactions_id:string) => {
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

    
    await transactionsRepository.delete(transactions_id)
    
}

export default deleteTransactionService