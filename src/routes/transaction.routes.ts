import { Router } from "express";
import { createTransactionsController, deleteTransactionsController, listCardTransactionsController, listTransactionsController, updateTransactionsController } from "../Controllers/transactions.controller";
import authToken from "../middlewares/authtoken.middleware";
import verifyCardExistance from "../middlewares/verifyCardExistance.middlewares";
import verifyUserCardRelation from "../middlewares/verifyTransactionAuthorization.middlewares";
import verifyUserExistance from "../middlewares/verifyUserExistance";

const routes = Router()

export const transactionRouter = () => {

  routes.post("",authToken, verifyUserExistance, verifyCardExistance, createTransactionsController)
  routes.get("/userTransactions", authToken, listTransactionsController)
  routes.get("/:card_id",authToken,verifyUserExistance, verifyCardExistance, listCardTransactionsController)
  routes.patch("/:transaction_id",authToken, verifyUserExistance, updateTransactionsController)
  routes.delete("/:transaction_id",authToken, verifyUserExistance, deleteTransactionsController)

  return  routes
}




