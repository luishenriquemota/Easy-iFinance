import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdated } from "../../interfaces/users";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/appError";

const updateUserService = async (id: string, changes: IUserUpdated) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  if (!account) {
    throw new AppError(404, "User dont exists");
  }

  const user = new User();
  user.name = changes.name ? changes.name : account.name;
  user.email = changes.email ? changes.email : account.email;
  user.password = changes.password
    ? bcrypt.hashSync(changes.password, 10)
    : account.password;

  await userRepository.update(id, {
    name: user.name,
    email: user.email,
    password: user.password,
  });

  const accountUpdated = users.find((user) => user.id === id);

  return accountUpdated;
};

export default updateUserService;
