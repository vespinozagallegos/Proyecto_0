import { NextFunction, Request, Response } from "express";
import { validateRut } from "./validateRut";

export const validateUserRegisterData = (req: Request, res: Response, next: NextFunction): void => {
    const campos: string[] = [ "birthdate", "email", "rut", "name", "password", "username" ]

    const camposFaltantes: string[] = campos.filter(campo => !req.body[campo]) // con negar el req.body --> !req.body[campo] se indica que el campo está vacío(campo faltante) y es lo que retorna

    if(camposFaltantes.length > 0 ){                                           // si es mayor a 0 es pq tiene campos faltantes
        res.status(400).json({
            message: `Falata información para crear el usuario: ${camposFaltantes.join(" ,")}`
        })
     return;
    }

      // Validación de formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(req.body.email)) {
        res.status(400).json({
        message: "El formato del email no es válido"
    });
    return;
    }
    next();
}

export { validateRut };