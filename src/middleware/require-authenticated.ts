import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/app-error';
import { getAuth } from '@clerk/express';

const requireAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);

  if (!auth) { // not authenticated
    return next(new AppError(`Unauthorized`, 401));
  }

  next();
};

export default requireAuthenticated;