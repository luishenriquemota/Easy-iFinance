import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware"
import { appRoutes } from "./routes"


const app = express()

app.use(express.json())

appRoutes(app)

app.use(errorMiddleware)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Rodando na porta " + port)
})