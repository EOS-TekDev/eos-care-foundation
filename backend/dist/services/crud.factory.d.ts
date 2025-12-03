import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import prisma from '../config/database';
type PrismaModel = keyof typeof prisma & string;
interface CrudConfig<TCreate, TUpdate> {
    model: PrismaModel;
    resourceName: string;
    createSchema: ZodSchema<TCreate>;
    updateSchema: ZodSchema<TUpdate>;
    defaultOrderBy?: Record<string, 'asc' | 'desc'>;
    include?: Record<string, unknown>;
    supportsImage?: boolean;
    beforeCreate?: (data: TCreate, req: Request) => Record<string, unknown>;
    beforeUpdate?: (data: TUpdate, req: Request) => Record<string, unknown>;
}
type Handler = (req: Request, res: Response) => Promise<void>;
interface CrudHandlers {
    getAll: Handler;
    getById: Handler;
    create: Handler;
    update: Handler;
    remove: Handler;
}
export declare function createCrudHandlers<TCreate, TUpdate>(config: CrudConfig<TCreate, TUpdate>): CrudHandlers;
export declare function getFilteredList(model: PrismaModel, where: Record<string, unknown>, req: Request, res: Response, resourceName: string, orderBy?: Record<string, 'asc' | 'desc'>, include?: Record<string, unknown>): Promise<void>;
export {};
//# sourceMappingURL=crud.factory.d.ts.map