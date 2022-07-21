import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IListTransaction } from "../../interfaces/Transactions";




    
const listTransactionsService = async (foundUser:User) => {

    const cardRepository = AppDataSource.getRepository(Card)   
    const transactionsRepository = AppDataSource.getRepository(Transactions)
    

    const userTransactions = await transactionsRepository.find({where:{user:{id:foundUser.id}}})
   
    if(!userTransactions){
        throw new AppError( 404, "User don't have transactions")
    }      
        
    const returnTransactions = Promise.all(userTransactions.map( async (transaction)=>{
        const card = await cardRepository.findOneBy({transactions:{transactions_id:transaction.transactions_id}})
        if(!card){
            throw new AppError(404, "Transaction not found")
        }             
        const treatedTransaction:IListTransaction = {
            transactions_id:transaction.transactions_id,
            type:transaction.type,
            description:transaction.description,
            value:transaction.value,
            category:transaction.category,
            created_at:transaction.created_at,
            updated_at:transaction.updated_at,
            card_id:card.id, 
            users_id:foundUser.id
        }
        
        return treatedTransaction
            
    }))    
       
        
    return returnTransactions
    
}
    

export default listTransactionsService