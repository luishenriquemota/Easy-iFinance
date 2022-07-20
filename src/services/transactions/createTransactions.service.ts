import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { ITransaction } from "../../interfaces/Transactions";



const createTransactionsService = async (foundUser:User, foundCard:Card,{description,category,value, type}:ITransaction) => {
    if(!description || !category ||!value|| !type ){
        throw new AppError(400, "A transaction need a description, category, value and type")
    }
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const newTransaction = new Transactions
    newTransaction.description = description
    newTransaction.category = category
    newTransaction.value = value
    newTransaction.type =type
    newTransaction.card = foundCard
    newTransaction.user = foundUser
   
    await transactionsRepository.save(newTransaction)

    const returingTransaction = {
        transactions_id: newTransaction.transactions_id,
        description: newTransaction.description,
        value: newTransaction.value,
        type: newTransaction.type,
        category:newTransaction.category,
        card_id: newTransaction.card.id,
        users_id: newTransaction.user.id,
        created_at:newTransaction.created_at,
        updated_at:newTransaction.updated_at
    } 
    return returingTransaction
}

export default createTransactionsService