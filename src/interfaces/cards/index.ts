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
  dueDate: number
  closingDate: number
  updated_at: Date
  ownerId: string
  allowedUsers: User[]
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
