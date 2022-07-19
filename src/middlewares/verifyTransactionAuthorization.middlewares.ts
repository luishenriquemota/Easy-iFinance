import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Card } from "../entities/card.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const verifyUserCardRelation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {foundCard, foundUser} =req.user
    console.log(foundCard, foundUser)
    if(foundCard && foundUser){
     const userCard = foundUser.cards?.filter(card => card.id === req.user.foundCard!.id)
        if(!userCard) {
            return new AppError( 403, "This Card is not associated to the user")
        }
        next()
    }
};

export default verifyUserCardRelation;
