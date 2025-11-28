import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { Role } from '@prisma/client';

export const requireRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    
    if (!user) {
      sendError(res, 401, 'Authentication required');
      return;
    }

    if (!roles.includes(user.role)) {
      sendError(res, 403, 'Insufficient permissions');
      return;
    }

    next();
  };
};

export const isAdmin = requireRole('ADMIN');
