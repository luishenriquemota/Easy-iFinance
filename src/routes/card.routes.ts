import {Router} from "express"
import {createCardController, deleteCardController, listCardController, listOneCardController, updateCardController} from "../Controllers/cards.controller"

const routes = Router()


export const cardRoutes = () => {
  routes.post("", createCardController)
  routes.get("", listCardController)
  routes.get("/:card_id", listOneCardController)
  routes.patch("/:card_id", updateCardController)
  routes.delete("/:card_id", deleteCardController)

  return routes
}

 







