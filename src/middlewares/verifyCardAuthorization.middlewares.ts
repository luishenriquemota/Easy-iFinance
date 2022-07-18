import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Card } from "../entities/card.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const verifyCardRelation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {foundCard, foundUser} =req.user

    if(foundCard && foundUser){
     if(foundCard.Owner.id === foundUser.id){
         next()
     }
        throw new AppError(403, "User is not the card owner")
    }

};

export default verifyCardRelation;
