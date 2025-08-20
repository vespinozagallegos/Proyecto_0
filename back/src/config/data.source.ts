import { DataSource, Repository } from "typeorm";
import { DB_DATABASE, DB_DROP, DB_ENTITIES, DB_HOST, DB_LOGGING, DB_PASSWORD, DB_PORT, DB_SYNC, DB_TYPE, DB_USERNAME } from "./env";
// import { User } from "../entities/User.entity";
// import { Credential } from "../entities/Credentials.entity";

export const AppDataSource = new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: DB_SYNC,
    logging: DB_LOGGING,
    entities: DB_ENTITIES,
    dropSchema: DB_DROP,    
})

// export const UserModel: Repository<User> = AppDataSource.getRepository(User)
// export const CredentialModel: Repository<Credential> = AppDataSource.getRepository(Credential)

//UserModel // Este modelo es la conexion dentro de mi servidor con la BD de postgres
//CredentialModel // Este modelo nos permite crear/borrar/modificar,etc(*) las credenciales al poner CredentialModel.(c/el punto se abren las opciones)