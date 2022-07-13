import { Request, Response } from "express"
import createTransactionsService from "../services/transactions/createTransactions.service"
import deleteTransactionService from "../services/transactions/deleteTransactions.service"
import listCardTransactionsService from "../services/transactions/listCardTransactions.service"
import listTransactionsService from "../services/transactions/listTransactions.service"
import updateTransactionService from "../services/transactions/updateTransactions.service"

export const createTransactionsController = async (req:Request, res:Response) =>{
    const userData = req.body

    const newUser = await createTransactionsService(userData)

    return res.status(201).json(newUser)
}

export const listTransactionsController = async  (req:Request, res:Response)=>{
    const {user_id} = req.params

    const userTransactions = await listTransactionsService(user_id)

    return res.status(200).json(userTransactions)
    
}
export const listCardTransactionsController = async  (req:Request, res:Response)=>{
    const {card_id} = req.params

    const cardTransactions = await listCardTransactionsService(card_id)

    return res.status(200).json(cardTransactions)
    
}

export const updateTransactionsController = async (req:Request, res:Response) =>{
    const updatedData = req.body
    const {id}  = req.params

    const updatedTransaction = await updateTransactionService(id,updatedData)

    return res.status(200).json(updatedTransaction)
}

export const deleteTransactionsController = async (req:Request, res:Response)=>{
    const {transacitons_id} = req.params

    await deleteTransactionService(transacitons_id)

    return res.status(204).json({message:"Transaction deleted with success"})
}