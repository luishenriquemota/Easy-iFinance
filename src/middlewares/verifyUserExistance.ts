import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Card } from "../entities/card.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const verifyUserExistance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const users_id = req.user.id

    
    const userRepository = AppDataSource.getRepository(User)

    const foundUser = await userRepository.findOneBy({
        id:users_id
    })

    if(!foundUser){
        throw new AppError( 404, "User not exists")
    }
    req.user.foundUser = foundUser

    next()

};

export default verifyUserExistance;
