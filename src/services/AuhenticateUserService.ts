import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verificar se email existe 
        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password incorrect");
        }

        //Verificar se senha esta correta
        const passwordMatch = await compare(password, user.password);//Sempre que tiver um retorno de uma promisse, precisamos colocar await.

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        //Gerar token
        const token = sign(
            {
                email: user.email,
            },
            "90e324acff5250a3e940af23ac3803df",
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );
        return token;
    }
}

export { AuthenticateUserService }