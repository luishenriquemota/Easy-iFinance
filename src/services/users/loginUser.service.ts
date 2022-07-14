import { IUserLogin } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
// import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken";

const loginUserService =async ({email,password} : IUserLogin) => {
    
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const account = users.find((user) => user.email === email);

    if (!account) {
        //throw new AppError(404, "Account not found")
        throw new Error("Account not found");
      }
    
    //   if (!bcrypt.compareSync(password, account.password)) {
    //     throw new AppError(401, "Wrong email/password")
    //   }

    const token = jwt.sign({ id: account.id }, String(process.env.JWT_SECRET), {
        expiresIn: "1d",
      });
    
      return token
}


export default loginUserService