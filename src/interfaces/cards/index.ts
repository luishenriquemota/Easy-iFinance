import { Transactions } from "../../entities/transactions.entity"
import { User } from "../../entities/user.entity"

export interface ICardCreate {

  name: string
  limit: number
  type: string
  dueDate?: number
  closingDate?: number

}

export interface ICardList {
  id: number
  name: string
  limit: number
  type: string
  dueDate?: number
  closingDate?: number
  updated_at: Date
  allowedUsers: User[]
  created_at:Date
  transactions:Transactions[]
  owner_id:string
}


export interface ICardUpdate {
  name?: string
  limit?: number
  type?: string
  dueDate?: number
  closingDate?: number
  updated_at?: Date
  Owner: User
}
