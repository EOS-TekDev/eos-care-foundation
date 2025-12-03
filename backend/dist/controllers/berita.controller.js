"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublishedById = exports.getPublished = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const crud_factory_1 = require("../services/crud.factory");
const berita_validator_1 = require("../validators/berita.validator");
const database_1 = __importDefault(require("../config/database"));
const response_1 = require("../utils/response");
const beritaInclude = {
    author: { select: { id: true, name: true } },
    donasi: { select: { id: true, title: true, targetAmount: true, currentAmount: true } },
};
const crud = (0, crud_factory_1.createCrudHandlers)({
    model: 'berita',
    resourceName: 'Berita',
    createSchema: berita_validator_1.createBeritaSchema,
    updateSchema: berita_validator_1.updateBeritaSchema,
    include: beritaInclude,
    supportsImage: true,
    beforeCreate: (_data, req) => ({
        authorId: req.user.id,
    }),
});
exports.getAll = crud.getAll, exports.getById = crud.getById, exports.create = crud.create, exports.update = crud.update, exports.remove = crud.remove;
// Custom: Public endpoint for published berita only
const getPublished = async (req, res) => {
    await (0, crud_factory_1.getFilteredList)('berita', { isPublished: true }, req, res, 'Berita', { createdAt: 'desc' }, beritaInclude);
};
exports.getPublished = getPublished;
// Custom: Public endpoint to get a single published berita
const getPublishedById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const data = await database_1.default.berita.findFirst({
            where: { id, isPublished: true },
            include: beritaInclude,
        });
        if (!data) {
            (0, response_1.sendError)(res, 404, 'Berita not found');
            return;
        }
        (0, response_1.sendResponse)(res, 200, 'Berita retrieved', data);
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get berita');
    }
};
exports.getPublishedById = getPublishedById;
//# sourceMappingURL=berita.controller.js.map