import {Router} from "express"
import {createCardController, deleteCardController, listCardController, listOneCardController, updateCardController} from "../Controllers/cards.controller"
import authToken from "../middlewares/authtoken.middleware"
import verifyUserExistance from "../middlewares/verifyUserExistance"
import verifyCardExistance from "../middlewares/verifyCardExistance.middlewares"
import verifyCardRelation from "../middlewares/verifyCardAuthorization.middlewares"


const routes = Router()


export const cardRoutes = () => {
  routes.post("", authToken, createCardController)
  routes.get("", authToken, listCardController)
  routes.get("/:card_id", listOneCardController)
  routes.patch("/:card_id", authToken, updateCardController)
  routes.delete("/:card_id", authToken, deleteCardController)

  return routes
}

 