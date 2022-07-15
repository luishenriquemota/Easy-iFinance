import {Request, Response} from "express";
import createCardService from "../services/cards/createCart.service";
import deleteCardService from "../services/cards/deleteCard.service";
import listCardService from "../services/cards/listCards.service";
import listOneCardService from "../services/cards/listOneCard.service";
import updateCardService from "../services/cards/updateCard.service";

export const createCardController = async (req: Request, res: Response) => {
  const {name, limit, type, dueDate, closingDate} = req.body
  const ownerId = req.user.id
  console.log(ownerId)

  const card = await createCardService(ownerId, {name, limit, type, dueDate, closingDate})

  // if ( !name || !limit || !type || !dueDate || !closingDate || !ownerId) {
  //   return res.status(400).json({
  //     message: "Fields name, limit, type, dueDate, closingDate and ownerId are required."
  // })}

  return res.status(201).json(card);
}


export const listCardController = async (req: Request, res: Response) => {
  const card = await listCardService()

  return res.status(200).json(card)
}

export const listOneCardController = async (req: Request, res: Response) => {
  const {id} = req.params

  const card = await listOneCardService(id)

  return res.status(200).json(card)
}

export const updateCardController = async (req: Request, res: Response) => {
  const {id} = req.params

  const card = await updateCardService(id, req.body)

  return res.status(200).json(card)
}

export const deleteCardController = async (req: Request, res: Response) => {
  const {id} = req.params

  await deleteCardService(id)

  return res.status(204)
}