"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createForBerita = exports.getForBerita = void 0;
const database_1 = __importDefault(require("../config/database"));
const response_1 = require("../utils/response");
const berita_comment_validator_1 = require("../validators/berita-comment.validator");
function canManageComment(commentUserId, currentUser) {
    return commentUserId === currentUser.id || currentUser.role === 'ADMIN';
}
const getForBerita = async (req, res) => {
    try {
        const beritaId = parseInt(req.params.id, 10);
        if (Number.isNaN(beritaId)) {
            (0, response_1.sendError)(res, 400, 'Invalid berita id');
            return;
        }
        const comments = await database_1.default.beritaComment.findMany({
            where: { beritaId },
            orderBy: { createdAt: 'asc' },
            include: {
                user: { select: { id: true, name: true, photo: true } },
            },
        });
        (0, response_1.sendResponse)(res, 200, 'Comments retrieved', comments);
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get comments');
    }
};
exports.getForBerita = getForBerita;
const createForBerita = async (req, res) => {
    try {
        const beritaId = parseInt(req.params.id, 10);
        if (Number.isNaN(beritaId)) {
            (0, response_1.sendError)(res, 400, 'Invalid berita id');
            return;
        }
        const user = req.user;
        if (!user) {
            (0, response_1.sendError)(res, 401, 'Authentication required');
            return;
        }
        const input = berita_comment_validator_1.createBeritaCommentSchema.parse(req.body);
        const berita = await database_1.default.berita.findUnique({ where: { id: beritaId } });
        if (!berita) {
            (0, response_1.sendError)(res, 404, 'Berita not found');
            return;
        }
        if (input.parentId) {
            const parent = await database_1.default.beritaComment.findUnique({ where: { id: input.parentId } });
            if (!parent || parent.beritaId !== beritaId) {
                (0, response_1.sendError)(res, 400, 'parentId tidak valid');
                return;
            }
        }
        const comment = await database_1.default.beritaComment.create({
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
        (0, response_1.sendResponse)(res, 201, 'Comment created', comment);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, response_1.sendError)(res, 400, error.message);
            return;
        }
        (0, response_1.sendError)(res, 500, 'Failed to create comment');
    }
};
exports.createForBerita = createForBerita;
const updateComment = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            (0, response_1.sendError)(res, 400, 'Invalid comment id');
            return;
        }
        const currentUser = req.user;
        if (!currentUser) {
            (0, response_1.sendError)(res, 401, 'Authentication required');
            return;
        }
        const input = berita_comment_validator_1.updateBeritaCommentSchema.parse(req.body);
        const existing = await database_1.default.beritaComment.findUnique({ where: { id } });
        if (!existing) {
            (0, response_1.sendError)(res, 404, 'Comment not found');
            return;
        }
        if (!canManageComment(existing.userId, currentUser)) {
            (0, response_1.sendError)(res, 403, 'Tidak memiliki izin untuk mengubah komentar ini');
            return;
        }
        const updated = await database_1.default.beritaComment.update({
            where: { id },
            data: { content: input.content },
            include: {
                user: { select: { id: true, name: true, photo: true } },
            },
        });
        (0, response_1.sendResponse)(res, 200, 'Comment updated', updated);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, response_1.sendError)(res, 400, error.message);
            return;
        }
        (0, response_1.sendError)(res, 500, 'Failed to update comment');
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            (0, response_1.sendError)(res, 400, 'Invalid comment id');
            return;
        }
        const currentUser = req.user;
        if (!currentUser) {
            (0, response_1.sendError)(res, 401, 'Authentication required');
            return;
        }
        const existing = await database_1.default.beritaComment.findUnique({ where: { id } });
        if (!existing) {
            (0, response_1.sendError)(res, 404, 'Comment not found');
            return;
        }
        if (!canManageComment(existing.userId, currentUser)) {
            (0, response_1.sendError)(res, 403, 'Tidak memiliki izin untuk menghapus komentar ini');
            return;
        }
        await database_1.default.beritaComment.delete({ where: { id } });
        (0, response_1.sendResponse)(res, 200, 'Comment deleted');
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to delete comment');
    }
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=berita-comment.controller.js.map