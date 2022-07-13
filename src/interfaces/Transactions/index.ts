
export class ITransaction{
    description:string
    value: number
    category:string
    type:string
    card_id:number
    users_id:string
}

export class IUpdateTransaction{
    description?:string
    value?: number
    category?:string
    type?:string
    card_id?:number
    users_id?:string
    created_at?:Date
    updated_at?:Date
}