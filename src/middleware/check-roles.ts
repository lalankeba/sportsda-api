import { NextFunction, Request, Response } from "express";
import Role from "../enums/role";
import Member from "../interfaces/i-member";
import AppError from "../errors/app-error";

const checkRoles = (requiredRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    const member = req.user as Member | undefined;
    if (!member) {
        return next(new AppError(`Access denied. Member not authenticated.`, 403));
    }
    const memberRoles: Role[] = member.roles;
    const hasRoles = requiredRoles.some(role => memberRoles.includes(role));
    if (!hasRoles) {
        return next(new AppError(`Access denied. You don't have necessary permisions.`, 403));
    }
    next();
}

export default checkRoles;