import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
import { CredentialModel } from "../config/data.source";

export const createCredentialService: (
    entityManager: EntityManager,
    a: string,
    b: string
) => Promise<Credential> = async (
    entityManager: EntityManager,
    username: string,
    password: string
): Promise<Credential> => {
    const credentials: Credential = entityManager.create(Credential, {
        username,
        password,
    });
    return await entityManager.save(credentials);
};

export const checkCredentials = async (username: string, password: string): Promise<string | undefined> => {
    const usernameFound: Credential | null = await CredentialModel.findOne({
        where: {
            username: username
        }
    })
    if (!usernameFound) throw new Error(`El usuario ${username} no fue encontrado`)
    if (usernameFound.password !== password) throw new Error(`Usuario o contraseña erronea`)
    else return usernameFound.id
}