import { IUserCreate, IUserReturn } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
 import { User } from "../../entities/user.entity";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  password,
  birth_date,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError(409, "Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password! = bcrypt.hashSync(password!, 10);
  user.birth_date = birth_date;

  userRepository.create(user);
  await userRepository.save(user);

  const returnUser: IUserReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
    birth_date: user.birth_date,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return returnUser
};

export default createUserService;
