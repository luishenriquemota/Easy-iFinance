import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUpdateTransaction } from "../../interfaces/Transactions";


const updateTransactionService = async (foundUser:User,transactions_id:string, updatedData:IUpdateTransaction) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)
    const cardRepository = AppDataSource.getRepository(Card)
    const cards = await cardRepository.findOneBy({transactions:{transactions_id:transactions_id}})
    const findTransaction = await transactionsRepository.findOne({ 
        where:{ 
            transactions_id: transactions_id
        }
    });
    const userTransactions = await transactionsRepository.find({where:{user:{id:foundUser.id}}})
    const isUserTransaction = userTransactions?.filter(transaction=> {
    return transaction.transactions_id.toString() === transactions_id})
    
    if(!findTransaction || !isUserTransaction){
        throw new AppError( 404, "Transaction not found")
    }    

    updatedData.updated_at = new Date()

    await transactionsRepository.update(transactions_id, updatedData)

    const updatedTransaction = {...findTransaction, ...updatedData}

    updatedTransaction.card_id = cards?.id
    updatedTransaction.users_id = foundUser.id
    
    return updatedTransaction
    
}

export default updateTransactionService