import { Request, Response } from 'express';
import { createCrudHandlers, getFilteredList } from '../services/crud.factory';
import {
  createBeritaSchema,
  updateBeritaSchema,
} from '../validators/berita.validator';
import prisma from '../config/database';
import { sendError, sendResponse } from '../utils/response';

const beritaInclude = {
  author: { select: { id: true, name: true } },
  donasi: { select: { id: true, title: true, targetAmount: true, currentAmount: true } },
};

const crud = createCrudHandlers({
  model: 'berita',
  resourceName: 'Berita',
  createSchema: createBeritaSchema,
  updateSchema: updateBeritaSchema,
  include: beritaInclude,
  supportsImage: true,
  beforeCreate: (_data, req) => ({
    authorId: (req as any).user!.id,
  }),
});

export const { getAll, getById, create, update, remove } = crud;

// Custom: Public endpoint for published berita only
export const getPublished = async (req: Request, res: Response): Promise<void> => {
  await getFilteredList(
    'berita',
    { isPublished: true },
    req,
    res,
    'Berita',
    { createdAt: 'desc' },
    beritaInclude
  );
};

// Custom: Public endpoint to get a single published berita
export const getPublishedById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = await prisma.berita.findFirst({
      where: { id, isPublished: true },
      include: beritaInclude,
    });

    if (!data) {
      sendError(res, 404, 'Berita not found');
      return;
    }

    sendResponse(res, 200, 'Berita retrieved', data);
  } catch {
    sendError(res, 500, 'Failed to get berita');
  }
};
