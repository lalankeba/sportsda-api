import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import AppError from '../errors/app-error';

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid ID format', 400));
  }

  next();
};

export default validateObjectId;