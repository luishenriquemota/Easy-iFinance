import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { ITransaction } from "../../interfaces/Transactions";



const createTransactionsService = async ({description,card_id,category,value, type, users_id}:ITransaction) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)
    const cardRepository = AppDataSource.getRepository(Card)
    const userRepository = AppDataSource.getRepository(User)
    const foundCard = await cardRepository.findOneBy({
      id:parseInt(card_id)
    })

    if(!foundCard){
        throw new AppError( 404 , "Card not exists")
    }

    const foundUser = await userRepository.findOneBy({
        id:users_id
    })

    if(!foundUser){
        throw new AppError( 404, "User not exists")
    }

    const isAllowedTransaction = foundCard.allowedUsers.find( user => user.id === foundUser.id) || foundCard.Owner.id === foundUser.id

    if(!isAllowedTransaction){
        throw new AppError( 403, "User is not authorized to register this transaction")
    }
    
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
        cardId: newTransaction.card.id,
        userId: newTransaction.user.id
    } 
    return returingTransaction
}

export default createTransactionsService