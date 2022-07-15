import { AppDataSource } from "../../data-source";
import { Card } from "../../entities/card.entity";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";
import { ITransaction } from "../../interfaces/Transactions";



const createTransactionsService = async ({description,card_id,category,value, type, users_id}:ITransaction) => {
    const transactionsRepository = AppDataSource.getRepository(Transactions)
    const cardRepository = AppDataSource.getRepository(Card)
    const userRepository = AppDataSource.getRepository(User)
    const foundCard = await cardRepository.findOneBy({
      id: Number(card_id)
    })

    if(!foundCard){
        throw new Error("Card not exists")
    }

    const foundUser = await userRepository.findOneBy({
        id: users_id
    })

    if(!foundUser){
        throw new Error("User not exists")
    }

    const isAllowedTransaction = foundCard.allowedUsers.find( user => user.id === foundUser.id) || foundCard.Owner.id === foundUser.id

    if(!isAllowedTransaction){
        throw new Error("User is not authorized to register this transaction")
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