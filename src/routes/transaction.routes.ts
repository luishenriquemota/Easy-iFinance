import { Router } from "express";
import { createTransactionsController, deleteTransactionsController, listCardTransactionsController, listTransactionsController, updateTransactionsController } from "../Controllers/transactions.controller";
import authToken from "../middlewares/authtoken.middleware";

const routes = Router()

export const transactionRouter = () => {

  routes.post("",authToken, createTransactionsController)
  routes.get("/:user_id", listTransactionsController)
  routes.get("/:card_id", listCardTransactionsController)
  routes.patch("/:transaction_id", updateTransactionsController)
  routes.delete("/:transaction_id", deleteTransactionsController)

  return  routes
}




