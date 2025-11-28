import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import prisma from '../config/database';
import { sendResponse, sendError } from '../utils/response';
import { PaginationQuery } from '../types';
import { getPagination, getMeta } from './base.service';

type PrismaModel = keyof typeof prisma & string;

interface CrudConfig<TCreate, TUpdate> {
  model: PrismaModel;
  resourceName: string;
  createSchema: ZodSchema<TCreate>;
  updateSchema: ZodSchema<TUpdate>;
  defaultOrderBy?: Record<string, 'asc' | 'desc'>;
  include?: Record<string, unknown>;
  // Hooks for customization
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

export function createCrudHandlers<TCreate, TUpdate>(
  config: CrudConfig<TCreate, TUpdate>
): CrudHandlers {
  const {
    model,
    resourceName,
    createSchema,
    updateSchema,
    defaultOrderBy = { createdAt: 'desc' },
    include,
    beforeCreate,
    beforeUpdate,
  } = config;

  const db = prisma[model] as any;

  const getAll: Handler = async (req, res) => {
    try {
      const { page, limit, skip } = getPagination(req.query as PaginationQuery);

      const [data, total] = await Promise.all([
        db.findMany({
          skip,
          take: limit,
          orderBy: defaultOrderBy,
          ...(include && { include }),
        }),
        db.count(),
      ]);

      sendResponse(res, 200, `${resourceName} retrieved`, data, getMeta(total, page, limit));
    } catch {
      sendError(res, 500, `Failed to get ${resourceName.toLowerCase()}`);
    }
  };

  const getById: Handler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const data = await db.findUnique({
        where: { id },
        ...(include && { include }),
      });

      if (!data) {
        sendError(res, 404, `${resourceName} not found`);
        return;
      }

      sendResponse(res, 200, `${resourceName} retrieved`, data);
    } catch {
      sendError(res, 500, `Failed to get ${resourceName.toLowerCase()}`);
    }
  };

  const create: Handler = async (req, res) => {
    try {
      const input = createSchema.parse(req.body);
      const image = req.file ? `/uploads/${req.file.filename}` : null;
      
      const extraData = beforeCreate ? beforeCreate(input, req) : {};

      const data = await db.create({
        data: { ...input, image, ...extraData },
        ...(include && { include }),
      });

      sendResponse(res, 201, `${resourceName} created`, data);
    } catch (error) {
      if (error instanceof Error) {
        sendError(res, 400, error.message);
        return;
      }
      sendError(res, 500, `Failed to create ${resourceName.toLowerCase()}`);
    }
  };

  const update: Handler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const input = updateSchema.parse(req.body);
      const image = req.file ? `/uploads/${req.file.filename}` : undefined;

      const existing = await db.findUnique({ where: { id } });
      if (!existing) {
        sendError(res, 404, `${resourceName} not found`);
        return;
      }

      const extraData = beforeUpdate ? beforeUpdate(input, req) : {};

      const data = await db.update({
        where: { id },
        data: { ...input, ...(image && { image }), ...extraData },
        ...(include && { include }),
      });

      sendResponse(res, 200, `${resourceName} updated`, data);
    } catch (error) {
      if (error instanceof Error) {
        sendError(res, 400, error.message);
        return;
      }
      sendError(res, 500, `Failed to update ${resourceName.toLowerCase()}`);
    }
  };

  const remove: Handler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const existing = await db.findUnique({ where: { id } });
      if (!existing) {
        sendError(res, 404, `${resourceName} not found`);
        return;
      }

      await db.delete({ where: { id } });
      sendResponse(res, 200, `${resourceName} deleted`);
    } catch {
      sendError(res, 500, `Failed to delete ${resourceName.toLowerCase()}`);
    }
  };

  return { getAll, getById, create, update, remove };
}

// Helper for filtered list queries (like getPublished, getActive)
export async function getFilteredList(
  model: PrismaModel,
  where: Record<string, unknown>,
  req: Request,
  res: Response,
  resourceName: string,
  orderBy: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' },
  include?: Record<string, unknown>
): Promise<void> {
  try {
    const { page, limit, skip } = getPagination(req.query as PaginationQuery);
    const db = prisma[model] as any;

    const [data, total] = await Promise.all([
      db.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        ...(include && { include }),
      }),
      db.count({ where }),
    ]);

    sendResponse(res, 200, `${resourceName} retrieved`, data, getMeta(total, page, limit));
  } catch {
    sendError(res, 500, `Failed to get ${resourceName.toLowerCase()}`);
  }
}
