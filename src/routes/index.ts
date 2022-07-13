import { Router } from "express";
import { createTransactionsController, deleteTransactionsController, listCardTransactionsController, listTransactionsController, updateTransactionsController } from "../Controllers/transactions.controller";

const router = Router()


router.post("/transactions", createTransactionsController)
router.get("/transactions/:user_id", listTransactionsController)
router.get("/transactions/:card_id", listCardTransactionsController)
router.patch("/transactions/:transaction_id", updateTransactionsController)
router.delete("/transactions/:transactions_id", deleteTransactionsController)


export default router