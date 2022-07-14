import { Router } from "express";
import { createTransactionsController, deleteTransactionsController, listCardTransactionsController, listTransactionsController, updateTransactionsController } from "../Controllers/transactions.controller";

const transactionRouter = Router()


transactionRouter.post("", createTransactionsController)
transactionRouter.get("/:user_id", listTransactionsController)
transactionRouter.get("/:card_id", listCardTransactionsController)
transactionRouter.patch("/:transaction_id", updateTransactionsController)
transactionRouter.delete("/:transaction_id", deleteTransactionsController)


export default transactionRouter