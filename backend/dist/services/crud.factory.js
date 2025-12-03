"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrudHandlers = createCrudHandlers;
exports.getFilteredList = getFilteredList;
const database_1 = __importDefault(require("../config/database"));
const response_1 = require("../utils/response");
const base_service_1 = require("./base.service");
function createCrudHandlers(config) {
    const { model, resourceName, createSchema, updateSchema, defaultOrderBy = { createdAt: 'desc' }, include, supportsImage = false, beforeCreate, beforeUpdate, } = config;
    const db = database_1.default[model];
    const getAll = async (req, res) => {
        try {
            const { page, limit, skip } = (0, base_service_1.getPagination)(req.query);
            const [data, total] = await Promise.all([
                db.findMany({
                    skip,
                    take: limit,
                    orderBy: defaultOrderBy,
                    ...(include && { include }),
                }),
                db.count(),
            ]);
            (0, response_1.sendResponse)(res, 200, `${resourceName} retrieved`, data, (0, base_service_1.getMeta)(total, page, limit));
        }
        catch {
            (0, response_1.sendError)(res, 500, `Failed to get ${resourceName.toLowerCase()}`);
        }
    };
    const getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const data = await db.findUnique({
                where: { id },
                ...(include && { include }),
            });
            if (!data) {
                (0, response_1.sendError)(res, 404, `${resourceName} not found`);
                return;
            }
            (0, response_1.sendResponse)(res, 200, `${resourceName} retrieved`, data);
        }
        catch {
            (0, response_1.sendError)(res, 500, `Failed to get ${resourceName.toLowerCase()}`);
        }
    };
    const create = async (req, res) => {
        try {
            const input = createSchema.parse(req.body);
            const extraData = beforeCreate ? beforeCreate(input, req) : {};
            const data = await db.create({
                data: {
                    ...input,
                    ...(supportsImage && { image: req.file ? `/uploads/${req.file.filename}` : null }),
                    ...extraData
                },
                ...(include && { include }),
            });
            (0, response_1.sendResponse)(res, 201, `${resourceName} created`, data);
        }
        catch (error) {
            if (error instanceof Error) {
                (0, response_1.sendError)(res, 400, error.message);
                return;
            }
            (0, response_1.sendError)(res, 500, `Failed to create ${resourceName.toLowerCase()}`);
        }
    };
    const update = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const input = updateSchema.parse(req.body);
            const existing = await db.findUnique({ where: { id } });
            if (!existing) {
                (0, response_1.sendError)(res, 404, `${resourceName} not found`);
                return;
            }
            const extraData = beforeUpdate ? beforeUpdate(input, req) : {};
            const data = await db.update({
                where: { id },
                data: {
                    ...input,
                    ...(supportsImage && req.file && { image: `/uploads/${req.file.filename}` }),
                    ...extraData
                },
                ...(include && { include }),
            });
            (0, response_1.sendResponse)(res, 200, `${resourceName} updated`, data);
        }
        catch (error) {
            if (error instanceof Error) {
                (0, response_1.sendError)(res, 400, error.message);
                return;
            }
            (0, response_1.sendError)(res, 500, `Failed to update ${resourceName.toLowerCase()}`);
        }
    };
    const remove = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const existing = await db.findUnique({ where: { id } });
            if (!existing) {
                (0, response_1.sendError)(res, 404, `${resourceName} not found`);
                return;
            }
            await db.delete({ where: { id } });
            (0, response_1.sendResponse)(res, 200, `${resourceName} deleted`);
        }
        catch {
            (0, response_1.sendError)(res, 500, `Failed to delete ${resourceName.toLowerCase()}`);
        }
    };
    return { getAll, getById, create, update, remove };
}
// Helper for filtered list queries (like getPublished, getActive)
async function getFilteredList(model, where, req, res, resourceName, orderBy = { createdAt: 'desc' }, include) {
    try {
        const { page, limit, skip } = (0, base_service_1.getPagination)(req.query);
        const db = database_1.default[model];
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
        (0, response_1.sendResponse)(res, 200, `${resourceName} retrieved`, data, (0, base_service_1.getMeta)(total, page, limit));
    }
    catch {
        (0, response_1.sendError)(res, 500, `Failed to get ${resourceName.toLowerCase()}`);
    }
}
//# sourceMappingURL=crud.factory.js.map