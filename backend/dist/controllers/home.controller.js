"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeContent = exports.ctaRemove = exports.ctaUpdate = exports.ctaCreate = exports.ctaGetById = exports.ctaGetAll = exports.serviceRemove = exports.serviceUpdate = exports.serviceCreate = exports.serviceGetById = exports.serviceGetAll = exports.heroRemove = exports.heroUpdate = exports.heroCreate = exports.heroGetById = exports.heroGetAll = void 0;
const database_1 = __importDefault(require("../config/database"));
const response_1 = require("../utils/response");
const crud_factory_1 = require("../services/crud.factory");
const home_validator_1 = require("../validators/home.validator");
// CRUD handlers for HomeHero
const heroCrud = (0, crud_factory_1.createCrudHandlers)({
    model: 'homeHero',
    resourceName: 'Home Hero',
    createSchema: home_validator_1.createHomeHeroSchema,
    updateSchema: home_validator_1.updateHomeHeroSchema,
});
exports.heroGetAll = heroCrud.getAll;
exports.heroGetById = heroCrud.getById;
exports.heroCreate = heroCrud.create;
exports.heroUpdate = heroCrud.update;
exports.heroRemove = heroCrud.remove;
// CRUD handlers for HomeService
const serviceCrud = (0, crud_factory_1.createCrudHandlers)({
    model: 'homeService',
    resourceName: 'Home Service',
    createSchema: home_validator_1.createHomeServiceSchema,
    updateSchema: home_validator_1.updateHomeServiceSchema,
    defaultOrderBy: { order: 'asc' },
});
exports.serviceGetAll = serviceCrud.getAll;
exports.serviceGetById = serviceCrud.getById;
exports.serviceCreate = serviceCrud.create;
exports.serviceUpdate = serviceCrud.update;
exports.serviceRemove = serviceCrud.remove;
// CRUD handlers for HomeCta
const ctaCrud = (0, crud_factory_1.createCrudHandlers)({
    model: 'homeCta',
    resourceName: 'Home CTA',
    createSchema: home_validator_1.createHomeCtaSchema,
    updateSchema: home_validator_1.updateHomeCtaSchema,
});
exports.ctaGetAll = ctaCrud.getAll;
exports.ctaGetById = ctaCrud.getById;
exports.ctaCreate = ctaCrud.create;
exports.ctaUpdate = ctaCrud.update;
exports.ctaRemove = ctaCrud.remove;
// Public endpoint to get all home content
const getHomeContent = async (_req, res) => {
    try {
        const [hero, services, cta, donationStats, totalKegiatan] = await Promise.all([
            database_1.default.homeHero.findFirst({ where: { isActive: true } }),
            database_1.default.homeService.findMany({
                where: { isActive: true },
                orderBy: { order: 'asc' }
            }),
            database_1.default.homeCta.findFirst({ where: { isActive: true } }),
            database_1.default.donasiTransaction.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { amount: true },
                _count: true,
            }),
            database_1.default.kegiatan.count({ where: { isActive: true } }),
        ]);
        const stats = {
            familiesHelped: donationStats._count || 0,
            totalKegiatan,
            totalFunds: Number(donationStats._sum.amount) || 0,
        };
        (0, response_1.sendResponse)(res, 200, 'Home content retrieved', {
            hero,
            services,
            cta,
            stats,
        });
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get home content');
    }
};
exports.getHomeContent = getHomeContent;
//# sourceMappingURL=home.controller.js.map