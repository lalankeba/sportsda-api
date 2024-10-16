import { NextFunction, Request, Response } from "express";
import Role from "../enums/role";
import AppError from "../errors/app-error";
import { getAuth } from "@clerk/express";

const checkRoles = (requiredRoles: Role[]) => 
  (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);

    if (!auth) { // not authenticated
        return next(new AppError(`Access denied. Member not authenticated.`, 403));
    }

    const memberRoles = auth.sessionClaims?.metadata?.roles as Role[];
    if (!memberRoles) { // authenticated but no roles defined. If student is required, then no role will be allowed
      if (!requiredRoles.includes(Role.Student)) {
        return next(new AppError(`Access denied. You don't have necessary permisions.`, 403));
      }
    } else { // authenticated and roles defined
      const hasRoles = requiredRoles.some(role => memberRoles.includes(role));

      if (!hasRoles) {
        return next(new AppError(`Access denied. You don't have necessary permisions.`, 403));
      }
    }
    next();
}

export default checkRoles;