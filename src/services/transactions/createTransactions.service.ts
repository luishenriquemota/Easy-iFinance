import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";
import { ITransaction } from "../../interfaces/Transactions";



const createTransactionsService = async ({description,card_id,category,value, type, users_id}:ITransaction) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const newTransaction = transactionsRepository.create({
        description,
        category,
        value,
        type   
    })

    await transactionsRepository.save(newTransaction)

    return newTransaction
}

export default createTransactionsService