import { AppDataSource } from "../config/data.source";
import { IUserRegisterDTO } from "../dto/UserDto";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";
import { formatRut } from "../utils/rutFormatter";
import { createCredentialService } from "./credentialService";

export const registerUserService = async (
    user: IUserRegisterDTO
): Promise<User> => {

    const result = await AppDataSource.transaction(async (entityManager) => {
        const idCredentialsUser: Credential = await createCredentialService(
            entityManager,
            user.username,
            user.password
        );

        const newUser: User = entityManager.create(User, {
            name: user.name,
            birthdate: user.birthdate,
            email: user.email,
            rut: formatRut(user.rut),
            credentials: idCredentialsUser,
        });
        return await entityManager.save(newUser);
    });
    return result;
    };