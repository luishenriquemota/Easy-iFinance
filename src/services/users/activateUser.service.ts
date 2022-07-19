import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const activateUserService = async (tokenAtivacao: string): Promise<void> => {

    const userRepository = AppDataSource.getRepository(User)

    const verify = tokenAtivacao

    const user = await userRepository.findOne({
        where: {
            tokenAtivacao: verify
        }
    })

    if(!user){
        throw new Error("User not found")
    }

    await userRepository.update({
        id: user.id
    },{
        isActive: true,
        tokenAtivacao: ""
      }
    )
}

export default activateUserService