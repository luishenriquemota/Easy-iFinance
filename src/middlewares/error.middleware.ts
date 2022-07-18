import { Request, Response, NextFunction } from 'express' 
import { AppError } from '../errors/appError'; 

<<<<<<< HEAD
export const errorMiddleware = (err: Error, request: Request, response: Response, _: NextFunction) => {
    
=======
export const errorMiddleware = (err: Error, req: Request, res: Response, _: NextFunction) => {
 
>>>>>>> develop
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
    message: err.message,
  });
  }
<<<<<<< HEAD
  console.log(`${err} => ERRO LOG`)
  return response.status(500).json({
  status: "error",
  code: 500,
  message: "Internal server error",
=======
  console.log(err)
  return res.status(500).json({
  message: "Internal server error"
>>>>>>> develop
  });
}