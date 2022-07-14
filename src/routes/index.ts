import { Express } from 'express'
import { cardRoutes } from './card.routes'

export const appRoutes = (app: Express) => {
  app.use("/cards", cardRoutes())
}