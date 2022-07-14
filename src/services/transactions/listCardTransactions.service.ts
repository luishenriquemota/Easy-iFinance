import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";

const listCardTransactionsService = async (card_id:number)=>{
    const transactionsRepository = AppDataSource.getRepository(Transactions)
   
    const cardRepository = AppDataSource.getRepository(Card)
   
    const foundCard = await cardRepository.findOneBy({
      id:card_id
    })
    
    if(!foundCard){
      throw new Error("Card not found")
    }

    const foundTransactions = await transactionsRepository.find({
      where:{
         card:foundCard
      } 
    })

    
   return foundTransactions 
}

export default listCardTransactionsService