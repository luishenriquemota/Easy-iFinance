import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdated } from "../../interfaces/users";
import bcrypt from "bcryptjs";

const updateUserService = async (id: string, changes: IUserUpdated): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({id: id})

  if (!user) {
    throw new AppError(404, "User dont exists")
  }

  user.name = changes.name ? changes.name : user.name;
  user.email = changes.email ? changes.email : user.email;
  user.password = changes.password ? bcrypt.hashSync(changes.password, 10) : user.password;
  
  await userRepository.save(user)

  return {... user, password: undefined, cards: undefined, transactions:undefined};
};
export default updateUserService;
