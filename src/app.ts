import "reflect-metadata"
import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware"


const app = express()

app.use(express.json())

app.use(errorMiddleware)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Rodando na porta " + port)
})