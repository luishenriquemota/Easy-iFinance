import { Request, Response } from "express"
import createTransactionsService from "../services/transactions/createTransactions.service"
import deleteTransactionService from "../services/transactions/deleteTransactions.service"
import listCardTransactionsService from "../services/transactions/listCardTransactions.service"
import listTransactionsService from "../services/transactions/listTransactions.service"
import updateTransactionService from "../services/transactions/updateTransactions.service"

export const createTransactionsController = async (req:Request, res:Response) =>{
    const userData = req.body
    const {foundUser, foundCard } = req.user

    const newUser = await createTransactionsService(foundUser,foundCard, userData)

    return res.status(201).json(newUser)
}

export const listTransactionsController = async  (req:Request, res:Response)=>{
    const {id} = req.user

    const userTransactions = await listTransactionsService(id)

    return res.status(200).json(userTransactions)
    
}
export const listCardTransactionsController = async  (req:Request, res:Response)=>{
    const {foundCard} = req.user

    const cardTransactions = await listCardTransactionsService(foundCard)

    return res.status(200).json(cardTransactions)
    
}

export const updateTransactionsController = async (req:Request, res:Response) =>{
    const updatedData = req.body
    const {transaction_id}  = req.params
    const { foundUser} = req.user

    const updatedTransaction = await updateTransactionService(foundUser,transaction_id,updatedData)

    return res.status(200).json(updatedTransaction)
}

export const deleteTransactionsController = async (req:Request, res:Response)=>{
    const {transaction_id} = req.params
    const { foundUser} = req.user

    await deleteTransactionService(foundUser,transaction_id)

    return res.status(204)
}