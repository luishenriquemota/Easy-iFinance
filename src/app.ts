import "reflect-metadata"
import "dotenv/config"
import express from "express"
import transactionRouter from "./routes/transaction.routes"

const app = express()

app.use(express.json())

app.use("/transactions", transactionRouter)



const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("Rodando na porta " + port)
})