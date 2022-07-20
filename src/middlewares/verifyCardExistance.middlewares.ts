import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Card } from "../entities/card.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const verifyCardExistance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    
    const card_id = parseInt(req.params.card_id) || parseInt(req.body.card_id)
    
    const cardRepository = AppDataSource.getRepository(Card)

    const foundCard = await cardRepository.findOneBy({
        id:card_id
    })
    
    if(!foundCard){
        throw new AppError( 404 , "Card not exists")
    }
    req.user.foundCard = foundCard
    
    
    next()

};

export default verifyCardExistance;
