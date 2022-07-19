import { Request, Response } from "express";
import activateUserService from "../services/users/activateUser.service";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import loginUserService from "../services/users/loginUser.service";
import profileUserService from "../services/users/profileUser.service";
import updateUserService from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
    const { name, email, password, birth_date } = req.body;
    const protocol = req.protocol
    const host = req.get('host')

    const newUser = await createUserService({ name, email, password, birth_date }, protocol, host);

    return res.status(201).json(newUser);

};

export const loginUserController = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const token = await loginUserService({ email, password });

    return res.status(200).json({token});

};

export const profileUserController = async (req: Request, res: Response) => {
    const {id} = req.user;

    const user = await profileUserService(id);

    return res.status(200).json(user);

};

export const updateUserController = async (req: Request, res: Response) => {
    const id = req.user.id;
    const changes = req.body

    const user = await updateUserService(id, changes);

    return res.status(200).json(user);


};

export const deleteUserController = async (req: Request, res: Response) => {
    const id = req.user.id;

    await deleteUserService(id);

    return res.status(204).send();
};
export const activateUserController = async (req: Request, res: Response) => {
    const tokenAtivacao = req.params.tokenAtivacao
    await activateUserService(tokenAtivacao)
    return res.json({
        message: "User activated with success"
    })

    return res.status(204).send();
};