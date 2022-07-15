import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import loginUserService from "../services/users/loginUser.service";
import profileUserService from "../services/users/profileUser.service";
import updateUserService from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
  
    const { name, email, password, birth_date } = req.body;

    const newUser = await createUserService({ name, email, password, birth_date });

    return res.status(201).json(newUser);
  
    //   if (err instanceof //AppError) {
    //     handleError(err, res)
    //     ;
    //   }
   
};

export const loginUserController = async (req: Request, res: Response) => {
  
    const { email, password } = req.body;

    const token = await loginUserService({ email, password });

    return res.status(200).json({token});
  
  //   if (err instanceof //AppError) {
  //     handleError(err, res)
  //     ;
  //   }
  
};

export const profileUserController = async (req: Request, res: Response) => {
  
    //const id = req.user.id;

    //const user = await profileUserService({id});

    //return res.status(200).send(user);
  
  //   if (err instanceof //AppError) {
  //     handleError(err, res)
  //     ;
  //   }
  
};

export const updateUserController = async (req: Request, res: Response) => {
  
    //const id = req.user.id;
    const changes = req.body

    //const user = await updateUserService(id,changes);

    //return res.status(200).send(user);
  
  //   if (err instanceof //AppError) {
  //     handleError(err, res)
  //     ;
  //   }
  
};


export const deleteUserController = async (req: Request, res: Response) => {
  
    //const id = req.user.id;

    //const user = await profileUserService({id});

    //return res.status(200).send(user);
  
  //   if (err instanceof //AppError) {
  //     handleError(err, res)
  //     ;
  //   }
  
};