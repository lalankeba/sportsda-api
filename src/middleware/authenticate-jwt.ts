import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import Member from '../interfaces/i-member';
import AppError from '../errors/app-error';

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, member: Member, info: any) => {
    if (err || !member) {
      const message = info?.message || 'Unauthorized';
      return next(new AppError(`${message}`, 401));
    }
    req.user = member;
    next();
  })(req, res, next);
};

export default authenticateJwt;