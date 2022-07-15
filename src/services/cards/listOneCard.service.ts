import {AppDataSource} from "../../data-source"
import { Card } from "../../entities/card.entity"
// import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const listOneCardService = async (id: string) => {
  // const userRepository = AppDataSource.getRepository(User) 

  // const user = await userRepository.findOneBy({id})
  // console.log(user)

  // if (!user) {
  //   throw new AppError(404, "User not found")
  // }

  const cardRepository = AppDataSource.getRepository(Card)

  const card = cardRepository.findOneBy({id: Number(id)})

  if (!card) {
    throw new AppError(404, "Card not found") 
  }

  return card
}

export default listOneCardService



// const userRepository = AppDataSource.getRepository(User) 
//   const cardRepository = AppDataSource.getRepository(Card)

//   const user = await userRepository.findOneBy({id}) 

//   if (!user) {
//     throw new AppError(404, "User not found")
//   }


//   const card = await cardRepository.findOneBy({id: Number(id)})

//   if (!card) {
//     throw new AppError(404, "Card not found") 
//   }

  // const userCard = card?.allowedUsers.find((userCard) => {
  //   userCard.id === user.id
  //   console.log(`${userCard.id}: userCardID`)
  //   })

    
  // if (!userCard) {
  //   throw new AppError(400, "User not authorized") 
  // }

  // return userCard

  // const oneCard = cards.filter((card) => card.id === Number(id)). length === 0
