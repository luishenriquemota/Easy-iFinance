import { IUserCreate } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
 import { User } from "../../entities/user.entity";
import bcrypt from "bcryptjs";

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
    throw new Error("Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  user.birth_date = birth_date;

  userRepository.create(user);
  await userRepository.save(user);

  return user
};

export default createUserService;
