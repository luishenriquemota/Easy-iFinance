import "reflect-metadata"
import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware"
import { appRoutes } from "./routes"
import "express-async-errors"


const app = express()

app.use(express.json())

appRoutes(app)

app.use(errorMiddleware)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Rodando na porta " + port)
})