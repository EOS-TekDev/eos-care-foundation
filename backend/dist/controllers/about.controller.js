"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const crud_factory_1 = require("../services/crud.factory");
const about_validator_1 = require("../validators/about.validator");
const crud = (0, crud_factory_1.createCrudHandlers)({
    model: 'about',
    resourceName: 'About section',
    createSchema: about_validator_1.createAboutSchema,
    updateSchema: about_validator_1.updateAboutSchema,
    defaultOrderBy: { order: 'asc' },
    supportsImage: true,
});
exports.getAll = crud.getAll, exports.getById = crud.getById, exports.create = crud.create, exports.update = crud.update, exports.remove = crud.remove;
//# sourceMappingURL=about.controller.js.map