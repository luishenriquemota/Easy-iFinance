import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserReturn } from "../../interfaces/users";

const profileUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
    
  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);


  if (!account) {
    //throw new AppError(404, "Account not found")
    throw new Error("Account not found");
  }

  const returnUser: IUserReturn = {
    id: account.id,
    name: account.name,
    email: account.email,
    birth_date: account.birth_date,
    created_at: account.created_at,
    updated_at: account.updated_at,
    isActive: account.isActive,
    friendList_id: account.friendList_id,
    ownCardList_id: account.ownCardList_id,
    allowedCardList_id: account.allowedCardList_id
  };
  

  return returnUser;
};

export default profileUserService;
