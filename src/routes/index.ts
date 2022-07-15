import { Express } from 'express'
import { cardRoutes } from './card.routes'
import { emailRoutes } from './email.routes'
import { friendsRoutes } from './friends.routes'
import { transactionRouter } from './transaction.routes'
import { userRoutes } from './user.routes'


export const appRoutes = (app: Express) => {
  app.use("/cards", cardRoutes())
  app.use("/transactions", transactionRouter())
  app.use("/users", userRoutes())
  app.use("/friends", friendsRoutes())
  app.use("/email",emailRoutes())
}