import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { sendError } from '../utils/response';
import prisma from '../config/database';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check cookie first, fallback to Bearer token
    const token = req.cookies?.token 
      || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      sendError(res, 401, 'Authentication required');
      return;
    }

    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      sendError(res, 401, 'User not found');
      return;
    }

    (req as any).user = user;
    next();
  } catch {
    sendError(res, 401, 'Invalid or expired token');
  }
};
