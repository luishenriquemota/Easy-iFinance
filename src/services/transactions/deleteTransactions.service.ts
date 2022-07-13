import { AppDataSource } from "../../data-source";

const deleteTransactionService = async (transactions_id:string) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)

    const userTransaction = transactionsRepository.findOneBy({
         where:{
            transactions_id:transactions_id
         }       
    })
    
    if(!userTransaction){
        throw new Error("User not found")
    }

    await transactionsRepository.delete(transactions_id)
    
}

export default deleteTransactionService