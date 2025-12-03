"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActive = exports.getAll = exports.remove = exports.update = exports.create = exports.getById = void 0;
const crud_factory_1 = require("../services/crud.factory");
const kegiatan_validator_1 = require("../validators/kegiatan.validator");
const kegiatanInclude = {
    donasi: { select: { id: true, title: true, targetAmount: true, currentAmount: true } },
};
// Transform date string to Date object
const transformDate = (data) => {
    if ('date' in data && data.date) {
        return { date: new Date(data.date) };
    }
    return {};
};
const crud = (0, crud_factory_1.createCrudHandlers)({
    model: 'kegiatan',
    resourceName: 'Kegiatan',
    createSchema: kegiatan_validator_1.createKegiatanSchema,
    updateSchema: kegiatan_validator_1.updateKegiatanSchema,
    include: kegiatanInclude,
    supportsImage: true,
    beforeCreate: transformDate,
    beforeUpdate: transformDate,
});
exports.getById = crud.getById, exports.create = crud.create, exports.update = crud.update, exports.remove = crud.remove;
// Custom: getAll with category filter
const getAll = async (req, res) => {
    const { category } = req.query;
    const where = category ? { category: category } : {};
    await (0, crud_factory_1.getFilteredList)('kegiatan', where, req, res, 'Kegiatan', { createdAt: 'desc' }, kegiatanInclude);
};
exports.getAll = getAll;
// Custom: Public endpoint for active kegiatan only
const getActive = async (req, res) => {
    const { category } = req.query;
    const where = {
        isActive: true,
        ...(category && { category: category }),
    };
    await (0, crud_factory_1.getFilteredList)('kegiatan', where, req, res, 'Kegiatan', { date: 'desc' }, kegiatanInclude);
};
exports.getActive = getActive;
//# sourceMappingURL=kegiatan.controller.js.map