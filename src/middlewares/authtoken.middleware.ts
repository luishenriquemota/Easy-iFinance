import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { Idecoded } from "../interfaces/users"

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if(!token){
    throw new AppError(401, "Missing authorization token")
  }

  const splitToken = token.split(" ")

  jwt.verify(splitToken[1], process.env.SECRET_KEY as string, (error: any, decoded: any ) => {
    if(error){
      throw new AppError(401, "Invalid token")
    }

    req.user = {
      id: decoded.id,
    }

    next()

  })

}
export default authToken