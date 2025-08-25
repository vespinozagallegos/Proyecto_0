import { NextFunction, Request, Response } from "express";

export const validateUserRegisterData = (req: Request, res: Response, next: NextFunction): void => {
    const campos: string[] = [ "birthdate", "email", "rut", "name", "password", "username" ]

    const camposFiltrados: string[] = campos.filter(campo => !req.body[campo]) // con negar el req.body --> !req.body[campo] se indica que el campo está vacío(campo faltante) y es lo que retorna

    if(camposFiltrados.length > 0 ){                                           // si es mayor a 0 es pq tiene campos faltantes
        res.status(400).json({
            message: `Falata información para crear el usuario: ${camposFiltrados.join(" ,")}`
        })
    } else next()
}