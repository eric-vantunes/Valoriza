import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password }: IUserRequest) {
        const UsersRepository = getCustomRepository(UsersRepositories);

        if (!email) { //Verifica se o email esta preenchido.
            throw new Error("Email incorrect"); // Tratamento de erro
        }

        const userAlreadyExists = await UsersRepository.findOne({ // Verifica se o usuario ja existe
            email,
        });

        if (userAlreadyExists) {
            throw new Error("User already exists"); // Se ele existir e lancado uma excecao
        }

        const passwordHash = await hash(password, 8);

        const user = UsersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });

        await UsersRepository.save(user);

        return user;
    }
}

export { CreateUserService };