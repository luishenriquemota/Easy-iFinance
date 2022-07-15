import * as express from "express"
import { Card } from "../../entities/card.entity"
import { User } from "../../entities/user.entity"

declare global {
  namespace Express {
    interface Request {
      user: {
          id: string,
          foundUser: User,
          foundCard: Card,
      }
    }
  }
}