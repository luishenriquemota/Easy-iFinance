export interface ICardCreate {
  name: string
  limit: number
  type: string
  dueDate: Date
  closingDate: Date
}


export interface ICardUpdate {
  name?: string
  limit?: number
  type?: string
  dueDate?: Date
  closingDate?: Date
  updated_at?: Date
}