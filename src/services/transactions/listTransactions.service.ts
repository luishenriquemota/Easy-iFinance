import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/transactions.entity";
import { User } from "../../entities/user.entity";



const listTransactionsService = async (user_id:string) => {
  const transactionsRepository = AppDataSource.getRepository(Transactions)
  const userRepository = AppDataSource.getRepository(User)

  const foundUser = await userRepository.findOneBy({
    id: user_id
  })

  if(!foundUser){
    throw new Error("User not found")
  }

  const allTransactions = await transactionsRepository.find()
  

  const userTransactions = allTransactions.filter((transaction) => transaction.user.id === user_id)
  
  if (userTransactions.length === 0) {
    throw new Error("Card not found")
  }
    

  return userTransactions
}

export default listTransactionsService