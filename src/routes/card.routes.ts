import {Router} from "express"
import {createCardController, deleteCardController, listCardController, listOneCardController, updateCardController} from "../Controllers/cards.controller"
import authToken from "../middlewares/authtoken.middleware"

const routes = Router()


export const cardRoutes = () => {
  routes.post("", authToken, createCardController)
  routes.get("", authToken, listCardController)
  routes.get("/:card_id", listOneCardController)
  routes.patch("/:card_id", authToken, updateCardController)
  routes.delete("/:card_id", authToken, deleteCardController)

  return routes
}

 