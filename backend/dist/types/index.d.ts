import { User as PrismaUser } from '@prisma/client';
import { Request } from 'express';
export interface AuthRequest extends Request {
    user?: PrismaUser;
}
export interface JwtPayload {
    userId: number;
    role: string;
}
export interface PaginationQuery {
    page?: string;
    limit?: string;
}
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
//# sourceMappingURL=index.d.ts.map