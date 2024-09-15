import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import Member from '../interfaces/i-member';

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, member: Member, info: any) => {
    if (err || !member) {
      const message = info?.message || 'Unauthorized';
      return res.status(401).json({ message });
    }
    req.user = member;
    next();
  })(req, res, next);
};

export default authenticateJwt;