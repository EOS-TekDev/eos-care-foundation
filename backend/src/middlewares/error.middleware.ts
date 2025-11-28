import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    const message = err.issues.map((e) => e.message).join(', ');
    sendError(res, 400, message);
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    sendError(res, 401, 'Invalid token');
    return;
  }

  if (err.name === 'TokenExpiredError') {
    sendError(res, 401, 'Token expired');
    return;
  }

  sendError(res, 500, err.message || 'Internal server error');
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  sendError(res, 404, 'Resource not found');
};
