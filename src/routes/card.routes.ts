import { verify } from "crypto"
import {Router} from "express"
import {addToallowController, createCardController, deleteCardController, listCardController, listOneCardController, rmvFromAllowedController, updateCardController} from "../Controllers/cards.controller"
import authToken from "../middlewares/authtoken.middleware"
 import verifyUserExistance from "../middlewares/verifyUserExistance"
 import verifyCardExistance from "../middlewares/verifyCardExistance.middlewares"
// import verifyCardRelation from "../middlewares/verifyCardAuthorization.middlewares"


const routes = Router()


export const cardRoutes = () => {
  routes.post("", authToken, createCardController)
  routes.get("", authToken, listCardController)
  routes.get("/:card_id", authToken, listOneCardController)
  routes.patch("/:card_id", authToken, updateCardController)
  routes.delete("/:card_id", authToken, deleteCardController)
  routes.patch("/Add_to_allow/:friend_id", authToken, verifyUserExistance, verifyCardExistance, addToallowController)
  routes.patch("/Rmv_from_allow/:friend_id", authToken, verifyUserExistance, verifyCardExistance, rmvFromAllowedController)

  return routes
}

 