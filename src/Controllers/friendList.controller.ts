import { Request, Response } from "express";
import addFriendService from "../services/friendList/AddFriendService.service";
import deleteFriendService from "../services/friendList/deleteFriend.service";
import listAllFriendsService from "../services/friendList/listAllFriends.service";
import listOneFriendService from "../services/friendList/listOneFriend.service";

export const addFriendController = async (req: Request, res: Response) => {
    const user_id = req.user.id;
    const { friend_id } = req.params;

    const friends = await addFriendService(user_id, friend_id);
    return res.status(201).json({ message: `${friends} added to your friendlist.` });
};

export const deleteFriendController = async (req: Request, res: Response) => {
    const { friend_id } = req.params;
    const user_id = req.user.id;

    await deleteFriendService(friend_id, user_id);
    return res.status(204).send();
};

export const listAllFriendsController = async (req: Request, res: Response) => {
    const user_id = req.user.id;

    const friends = await listAllFriendsService(user_id);
    return res.status(200).json(friends);
 
};

export const listOneFriendController = async (req: Request, res: Response) => {
    const { friend_id } = req.params;
    const user_id = req.user.id;

    const friend = await listOneFriendService(friend_id, user_id);
    return res.status(200).json(friend);
};
