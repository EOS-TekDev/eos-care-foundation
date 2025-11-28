import { Request, Response } from 'express';
import { createCrudHandlers, getFilteredList } from '../services/crud.factory';
import {
  createKegiatanSchema,
  updateKegiatanSchema,
  CreateKegiatanInput,
  UpdateKegiatanInput,
} from '../validators/kegiatan.validator';
import { KegiatanCategory } from '@prisma/client';
import { PaginationQuery } from '../types';

interface KegiatanQuery extends PaginationQuery {
  category?: string;
}

const kegiatanInclude = {
  donasi: { select: { id: true, title: true, targetAmount: true, currentAmount: true } },
};

// Transform date string to Date object
const transformDate = (data: CreateKegiatanInput | UpdateKegiatanInput) => {
  if ('date' in data && data.date) {
    return { date: new Date(data.date) };
  }
  return {};
};

const crud = createCrudHandlers({
  model: 'kegiatan',
  resourceName: 'Kegiatan',
  createSchema: createKegiatanSchema,
  updateSchema: updateKegiatanSchema,
  include: kegiatanInclude,
  beforeCreate: transformDate,
  beforeUpdate: transformDate,
});

export const { getById, create, update, remove } = crud;

// Custom: getAll with category filter
export const getAll = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.query as KegiatanQuery;
  const where = category ? { category: category as KegiatanCategory } : {};
  
  await getFilteredList('kegiatan', where, req, res, 'Kegiatan', { createdAt: 'desc' }, kegiatanInclude);
};

// Custom: Public endpoint for active kegiatan only
export const getActive = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.query as KegiatanQuery;
  const where = {
    isActive: true,
    ...(category && { category: category as KegiatanCategory }),
  };

  await getFilteredList('kegiatan', where, req, res, 'Kegiatan', { date: 'desc' }, kegiatanInclude);
};
