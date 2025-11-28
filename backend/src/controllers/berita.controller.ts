import { Request, Response } from 'express';
import { createCrudHandlers, getFilteredList } from '../services/crud.factory';
import {
  createBeritaSchema,
  updateBeritaSchema,
} from '../validators/berita.validator';

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
