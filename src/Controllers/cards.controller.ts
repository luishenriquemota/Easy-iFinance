import {Request, Response} from "express";
import { AppError } from "../errors/appError";
import addToAllowedService from "../services/cards/addToAllowed.card.service";
import createCardService from "../services/cards/createCard.service";
import deleteCardService from "../services/cards/deleteCard.service";
import listCardService from "../services/cards/listCards.service";
import listOneCardService from "../services/cards/listOneCard.service";
import updateCardService from "../services/cards/updateCard.service";

export const createCardController = async (req: Request, res: Response) => {
  const id = req.user.id

  const {name, limit, type, dueDate, closingDate} = req.body
  
  
  const card = await createCardService(id, {name, limit, type, dueDate, closingDate})

  return res.status(201).json(card);
  
}


export const listCardController = async (req: Request, res: Response) => {
  const user_id = req.user.id
  const card = await listCardService(user_id)

  return res.status(200).json(card)
}


export const listOneCardController = async (req: Request, res: Response) => {
  const {card_id} = req.params
  const owner_id = req.user.id
 
  const card = await listOneCardService(owner_id, Number(card_id))

  return res.status(200).json(card)
}



export const updateCardController = async (req: Request, res: Response) => {
  const owner_id = req.user.id
  const {card_id} = req.params

  const card = await updateCardService(owner_id, Number(card_id), req.body)

  return res.status(200).json(card)
}


export const deleteCardController = async (req: Request, res: Response) => {
  const owner_id = req.user.id
  const {card_id} = req.params

  await deleteCardService(owner_id, Number(card_id))

  return res.status(204).send()
}

export const addToallowController = async (req:Request, res:Response)=>{
  const {foundCard, foundUser} = req.user
  const {friend_id} = req.params


  const allowedFriendAdded = await addToAllowedService(foundUser!,foundCard!,friend_id)

  return res.status(201).json(allowedFriendAdded)
}