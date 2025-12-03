import { Request, Response } from 'express';
import type { Role } from '@prisma/client';
import prisma from '../config/database';
import { sendResponse, sendError } from '../utils/response';
import {
  createBeritaCommentSchema,
  updateBeritaCommentSchema,
} from '../validators/berita-comment.validator';

type CurrentUser = {
  id: number;
  role: Role;
};

function canManageComment(commentUserId: number, currentUser: CurrentUser): boolean {
  return commentUserId === currentUser.id || currentUser.role === 'ADMIN';
}

export const getForBerita = async (req: Request, res: Response): Promise<void> => {
  try {
    const beritaId = parseInt(req.params.id, 10);

    if (Number.isNaN(beritaId)) {
      sendError(res, 400, 'Invalid berita id');
      return;
    }

    const comments = await prisma.beritaComment.findMany({
      where: { beritaId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: { select: { id: true, name: true, photo: true } },
      },
    });

    sendResponse(res, 200, 'Comments retrieved', comments);
  } catch {
    sendError(res, 500, 'Failed to get comments');
  }
};

export const createForBerita = async (req: Request, res: Response): Promise<void> => {
  try {
    const beritaId = parseInt(req.params.id, 10);

    if (Number.isNaN(beritaId)) {
      sendError(res, 400, 'Invalid berita id');
      return;
    }

    const user = (req as any).user;
    if (!user) {
      sendError(res, 401, 'Authentication required');
      return;
    }

    const input = createBeritaCommentSchema.parse(req.body);

    const berita = await prisma.berita.findUnique({ where: { id: beritaId } });
    if (!berita) {
      sendError(res, 404, 'Berita not found');
      return;
    }

    if (input.parentId) {
      const parent = await prisma.beritaComment.findUnique({ where: { id: input.parentId } });
      if (!parent || parent.beritaId !== beritaId) {
        sendError(res, 400, 'parentId tidak valid');
        return;
      }
    }

    const comment = await prisma.beritaComment.create({
      data: {
        content: input.content,
        beritaId,
        userId: user.id,
        parentId: input.parentId ?? null,
      },
      include: {
        user: { select: { id: true, name: true, photo: true } },
      },
    });

    sendResponse(res, 201, 'Comment created', comment);
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, 400, error.message);
      return;
    }
    sendError(res, 500, 'Failed to create comment');
  }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      sendError(res, 400, 'Invalid comment id');
      return;
    }

    const currentUser = (req as any).user as CurrentUser | undefined;
    if (!currentUser) {
      sendError(res, 401, 'Authentication required');
      return;
    }

    const input = updateBeritaCommentSchema.parse(req.body);

    const existing = await prisma.beritaComment.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 404, 'Comment not found');
      return;
    }

    if (!canManageComment(existing.userId, currentUser)) {
      sendError(res, 403, 'Tidak memiliki izin untuk mengubah komentar ini');
      return;
    }

    const updated = await prisma.beritaComment.update({
      where: { id },
      data: { content: input.content },
      include: {
        user: { select: { id: true, name: true, photo: true } },
      },
    });

    sendResponse(res, 200, 'Comment updated', updated);
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, 400, error.message);
      return;
    }
    sendError(res, 500, 'Failed to update comment');
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      sendError(res, 400, 'Invalid comment id');
      return;
    }

    const currentUser = (req as any).user as CurrentUser | undefined;
    if (!currentUser) {
      sendError(res, 401, 'Authentication required');
      return;
    }

    const existing = await prisma.beritaComment.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 404, 'Comment not found');
      return;
    }

    if (!canManageComment(existing.userId, currentUser)) {
      sendError(res, 403, 'Tidak memiliki izin untuk menghapus komentar ini');
      return;
    }

    await prisma.beritaComment.delete({ where: { id } });

    sendResponse(res, 200, 'Comment deleted');
  } catch {
    sendError(res, 500, 'Failed to delete comment');
  }
};
