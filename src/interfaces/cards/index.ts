import { User } from "../../entities/user.entity"

export interface ICardCreate {
  name: string
  limit: number
  type: string
  dueDate?: Date
  closingDate?: Date
}

export interface ICardList {
  id: number
  name: string
  limit: number
  type: string
  dueDate: Date
  closingDate: Date
  updated_at: Date
  ownerId: string
  allowedUsers: User[]
}


export interface ICardUpdate {
  name?: string
  limit?: number
  type?: string
  dueDate?: Date
  closingDate?: Date
  updated_at?: Date
  Owner: User
}
