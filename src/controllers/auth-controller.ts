import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../utils/async-error-handler";
import * as authService from "../services/auth-service";

const register = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, gender, email, password, facultyId } = req.body;
  const resp = await authService.register(firstName, lastName, email, password, gender, facultyId);
  res.status(200).json(resp);
});

const login = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const tokenDetails = await authService.login(email, password);
  res.status(200).json(tokenDetails);
});

export { register, login };
