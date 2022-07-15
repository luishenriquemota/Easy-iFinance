import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({id: id});

  if(!user){
    throw new AppError(409, "User not found")
  }

  user.isActive = false

  await userRepository.save(user);
  
};
export default deleteUserService;
