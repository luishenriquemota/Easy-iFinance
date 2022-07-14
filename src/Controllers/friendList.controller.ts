import { Request, Response } from "express";
import addFriendService from "../services/friendList/AddFriendService.service";
import deleteFriendService from "../services/friendList/deleteFriend.service";
import listAllFriendsService from "../services/friendList/listAllFriends.service";
import listOneFriendService from "../services/friendList/listOneFriend.service";

export const addFriendController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { myId } = req.body;

    const friends = addFriendService(user_id, myId);
    return res
      .status(201)
      .json({ message: `${friends} added to your friendlist.` });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export const deleteFriendController = async (req: Request, res: Response) => {
  try {
    const { friend_id } = req.params;
    const { myId } = req.body;

    const deleted = await deleteFriendService(friend_id, myId);
    return res.status(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export const listAllFriendsController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const friends = await listAllFriendsService(user_id);
    return res.status(200).send(friends);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export const listOneFriendController = async (req: Request, res: Response) => {
  try {
    const { friend_id } = req.params;
    const myId = req.body;

    const friend = await listOneFriendService(friend_id, myId);
    return res.status(200).send(friend);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};
