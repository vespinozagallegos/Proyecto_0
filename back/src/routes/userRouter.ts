import { NextFunction, Request, Response, Router } from "express";
import { validateUserRegisterData } from "../middlewares";
import { IUserRegisterDTO } from "../dto/UserDTO";

const userRouter: Router = Router();

userRouter.post("/register",
    (req: Request, res: Response, next: NextFunction) => validateUserRegisterData(req, res, next),
    (req: Request< unknown, unknown, IUserRegisterDTO >, res: Response) => registerUserController(req, res));

export default userRouter;