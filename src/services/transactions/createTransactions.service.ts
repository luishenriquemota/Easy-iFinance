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
    console.log(foundCard)

    const isAllowedTransaction = foundCard.allowedUsers.find( user => user.id === foundUser.id) || foundCard.Owner.id === foundUser.id

    if(!isAllowedTransaction){
        throw new AppError( 403, "User is not authorized to register this transaction")
    }

    const newTransaction = transactionsRepository.create({
        description,
        category,
        value,
        type,
        card:foundCard,
        user:foundUser
    })

    await transactionsRepository.save(newTransaction)

    return newTransaction
}

export default createTransactionsService