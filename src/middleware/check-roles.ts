import { NextFunction, Request, Response } from "express";
import Role from "../enums/role";
import Member from "../interfaces/i-member";

const checkRoles = (requiredRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    const member = req.user as Member | undefined;
    if (!member) {
        return res.status(403).json({ message: "Access denied. Member not authenticated." });
    }
    const memberRoles: Role[] = member.roles;
    const hasRoles = requiredRoles.some(role => memberRoles.includes(role));
    if (!hasRoles) {
        return res.status(403).json({ message: `Access denied. You don't have necessary permisions.` });
    }
    next();
}

export default checkRoles;