"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamSchema = exports.createTeamSchema = void 0;
const zod_1 = require("zod");
const base_validator_1 = require("./base.validator");
exports.createTeamSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    role: zod_1.z.string().min(2, 'Role must be at least 2 characters'),
    order: base_validator_1.orderFieldWithDefault,
    isActive: (0, base_validator_1.booleanFieldWithDefault)(true),
});
exports.updateTeamSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters').optional(),
    role: zod_1.z.string().min(2, 'Role must be at least 2 characters').optional(),
    order: base_validator_1.orderField.optional(),
    isActive: (0, base_validator_1.booleanField)().optional(),
});
//# sourceMappingURL=team.validator.js.map