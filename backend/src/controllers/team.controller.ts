import { Request, Response } from 'express';
import { createCrudHandlers, getFilteredList } from '../services/crud.factory';
import { createTeamSchema, updateTeamSchema } from '../validators/team.validator';
import prisma from '../config/database';
import { sendResponse, sendError } from '../utils/response';
import { getPagination, getMeta } from '../services/base.service';
import type { PaginationQuery } from '../types';

const crud = createCrudHandlers({
  model: 'teamMember',
  resourceName: 'Team member',
  createSchema: createTeamSchema,
  updateSchema: updateTeamSchema,
  defaultOrderBy: { order: 'asc' },
});

export const { getById, remove } = crud;

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const { page, limit, skip } = getPagination(req.query as PaginationQuery);
    const [data, total] = await Promise.all([
      prisma.teamMember.findMany({
        skip,
        take: limit,
        orderBy: { order: 'asc' },
      }),
      prisma.teamMember.count(),
    ]);
    sendResponse(res, 200, 'Team members retrieved', data, getMeta(total, page, limit));
  } catch {
    sendError(res, 500, 'Failed to get team members');
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const input = createTeamSchema.parse(req.body);
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    const data = await prisma.teamMember.create({
      data: { ...input, photo },
    });
    sendResponse(res, 201, 'Team member created', data);
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, 400, error.message);
      return;
    }
    sendError(res, 500, 'Failed to create team member');
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    const input = updateTeamSchema.parse(req.body);
    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 404, 'Team member not found');
      return;
    }

    const data = await prisma.teamMember.update({
      where: { id },
      data: { ...input, ...(photo && { photo }) },
    });
    sendResponse(res, 200, 'Team member updated', data);
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, 400, error.message);
      return;
    }
    sendError(res, 500, 'Failed to update team member');
  }
}

export async function getActive(req: Request, res: Response): Promise<void> {
  await getFilteredList(
    'teamMember',
    { isActive: true },
    req,
    res,
    'Team members',
    { order: 'asc' }
  );
}
