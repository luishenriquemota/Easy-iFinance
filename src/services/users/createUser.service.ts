import { IUserCreate, IUserReturn } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
 import { User } from "../../entities/user.entity";
import bcrypt, { hash } from "bcryptjs";
import { AppError } from "../../errors/appError";
import { sendEmail } from "../../utils/sendEmail.util";
import { IEmailRequest } from "../../interfaces/emails";

const createUserService = async ({
  name,
  email,
  password,
  birth_date,
}: IUserCreate, protocol: string, host: string | undefined) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);
  if(!name|| !email|| !password|| !birth_date){
    throw new AppError(409, "User need a name, email, passowrd and birth date to be created.");
  }
  if (emailAlreadyExists) {
    throw new AppError(409, "User with this email already exist");
  }

  const activationToken = (Math.random() + 1).toString(36).substring(2);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password! = bcrypt.hashSync(password!, 10);
  user.birth_date = birth_date;
  user.authToken = activationToken;

  const emailData: IEmailRequest = {
    subject: "Ativação de usuário",
    text: `<h1>Por favor, ative o seu usuário</h1>
    <h3>Seja bem-vindo ${user.name}, ative sua conta clicando neste <a href="${protocol}://${host}/users/activate/${activationToken}">Link<a> para utilizar o nosso sistema</h3>
    `,
    to: email
  }

  await sendEmail(emailData)


  userRepository.create(user);
  await userRepository.save(user);

  const returnUser: IUserReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
    birth_date: user.birth_date,
    friendList: user.friendList || [],
    created_at: user.created_at,
    updated_at: user.updated_at,
    isActive:user.isActive,
    transactions:user.transactions || []
  };

  return returnUser
};

export default createUserService;
