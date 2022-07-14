import "reflect-metadata"
import express from "express"


const app = express()

app.use(express.json())


const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("Rodando na porta " + port)
})