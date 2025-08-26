import { Request, Response } from "express";
import { IUserRegisterDTO } from "../dto/UserDto";
import { IPostgresError } from "../interfaces/ErrorInterface";

export const registerUserController = async(req: Request <unknown, unknown, IUserRegisterDTO>, res: Response ): Promise<void> => {
    try {
        await registerUserService(req.body)
        res.status(201).json({
            message: "Usuario registrado correctamente"
        })
    } catch (error) {
        const postgresError = error as IPostgresError
        res.status(400).json({
            message: "Error en el servidor",
            data: postgresError instanceof Error ? postgresError.detail ? postgresError.detail : postgresError.message : "error desconocido"
        })
    }
}