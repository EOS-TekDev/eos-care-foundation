"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getById = void 0;
exports.getAll = getAll;
exports.create = create;
exports.update = update;
exports.getActive = getActive;
const crud_factory_1 = require("../services/crud.factory");
const team_validator_1 = require("../validators/team.validator");
const database_1 = __importDefault(require("../config/database"));
const response_1 = require("../utils/response");
const base_service_1 = require("../services/base.service");
const crud = (0, crud_factory_1.createCrudHandlers)({
    model: 'teamMember',
    resourceName: 'Team member',
    createSchema: team_validator_1.createTeamSchema,
    updateSchema: team_validator_1.updateTeamSchema,
    defaultOrderBy: { order: 'asc' },
});
exports.getById = crud.getById, exports.remove = crud.remove;
async function getAll(req, res) {
    try {
        const { page, limit, skip } = (0, base_service_1.getPagination)(req.query);
        const [data, total] = await Promise.all([
            database_1.default.teamMember.findMany({
                skip,
                take: limit,
                orderBy: { order: 'asc' },
            }),
            database_1.default.teamMember.count(),
        ]);
        (0, response_1.sendResponse)(res, 200, 'Team members retrieved', data, (0, base_service_1.getMeta)(total, page, limit));
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get team members');
    }
}
async function create(req, res) {
    try {
        const input = team_validator_1.createTeamSchema.parse(req.body);
        const photo = req.file ? `/uploads/${req.file.filename}` : null;
        const data = await database_1.default.teamMember.create({
            data: { ...input, photo },
        });
        (0, response_1.sendResponse)(res, 201, 'Team member created', data);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, response_1.sendError)(res, 400, error.message);
            return;
        }
        (0, response_1.sendError)(res, 500, 'Failed to create team member');
    }
}
async function update(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        const input = team_validator_1.updateTeamSchema.parse(req.body);
        const photo = req.file ? `/uploads/${req.file.filename}` : undefined;
        const existing = await database_1.default.teamMember.findUnique({ where: { id } });
        if (!existing) {
            (0, response_1.sendError)(res, 404, 'Team member not found');
            return;
        }
        const data = await database_1.default.teamMember.update({
            where: { id },
            data: { ...input, ...(photo && { photo }) },
        });
        (0, response_1.sendResponse)(res, 200, 'Team member updated', data);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, response_1.sendError)(res, 400, error.message);
            return;
        }
        (0, response_1.sendError)(res, 500, 'Failed to update team member');
    }
}
async function getActive(req, res) {
    await (0, crud_factory_1.getFilteredList)('teamMember', { isActive: true }, req, res, 'Team members', { order: 'asc' });
}
//# sourceMappingURL=team.controller.js.map