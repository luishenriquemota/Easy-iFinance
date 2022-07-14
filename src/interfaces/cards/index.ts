export interface ICardCreate {
  name: string
  limit: number
  type: string
  dueDate: Date
  closingDate: Date
  ownerId: string
}

export interface ICardUpdate {
  name?: string
  limit?: number
  type?: string
  dueDate?: Date
  closingDate?: Date
}