import { Request, Response } from 'express';
import prisma from '../config/database';
import { sendResponse, sendError } from '../utils/response';
import { createCrudHandlers } from '../services/crud.factory';
import {
  createHomeHeroSchema,
  updateHomeHeroSchema,
  createHomeServiceSchema,
  updateHomeServiceSchema,
  createHomeCtaSchema,
  updateHomeCtaSchema,
} from '../validators/home.validator';

// CRUD handlers for HomeHero
const heroCrud = createCrudHandlers({
  model: 'homeHero',
  resourceName: 'Home Hero',
  createSchema: createHomeHeroSchema,
  updateSchema: updateHomeHeroSchema,
});

export const heroGetAll = heroCrud.getAll;
export const heroGetById = heroCrud.getById;
export const heroCreate = heroCrud.create;
export const heroUpdate = heroCrud.update;
export const heroRemove = heroCrud.remove;

// CRUD handlers for HomeService
const serviceCrud = createCrudHandlers({
  model: 'homeService',
  resourceName: 'Home Service',
  createSchema: createHomeServiceSchema,
  updateSchema: updateHomeServiceSchema,
  defaultOrderBy: { order: 'asc' },
});

export const serviceGetAll = serviceCrud.getAll;
export const serviceGetById = serviceCrud.getById;
export const serviceCreate = serviceCrud.create;
export const serviceUpdate = serviceCrud.update;
export const serviceRemove = serviceCrud.remove;

// CRUD handlers for HomeCta
const ctaCrud = createCrudHandlers({
  model: 'homeCta',
  resourceName: 'Home CTA',
  createSchema: createHomeCtaSchema,
  updateSchema: updateHomeCtaSchema,
});

export const ctaGetAll = ctaCrud.getAll;
export const ctaGetById = ctaCrud.getById;
export const ctaCreate = ctaCrud.create;
export const ctaUpdate = ctaCrud.update;
export const ctaRemove = ctaCrud.remove;

// Public endpoint to get all home content
export const getHomeContent = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [hero, services, cta, donationStats, totalKegiatan] = await Promise.all([
      prisma.homeHero.findFirst({ where: { isActive: true } }),
      prisma.homeService.findMany({ 
        where: { isActive: true }, 
        orderBy: { order: 'asc' } 
      }),
      prisma.homeCta.findFirst({ where: { isActive: true } }),
      prisma.donasiTransaction.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.kegiatan.count({ where: { isActive: true } }),
    ]);

    const stats = {
      familiesHelped: donationStats._count || 0,
      totalKegiatan,
      totalFunds: Number(donationStats._sum.amount) || 0,
    };

    sendResponse(res, 200, 'Home content retrieved', {
      hero,
      services,
      cta,
      stats,
    });
  } catch {
    sendError(res, 500, 'Failed to get home content');
  }
};
