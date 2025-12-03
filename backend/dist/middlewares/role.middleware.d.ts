import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
export declare const requireRole: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const isAdmin: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.middleware.d.ts.map