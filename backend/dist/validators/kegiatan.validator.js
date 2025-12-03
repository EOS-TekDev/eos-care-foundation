"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKegiatanSchema = exports.createKegiatanSchema = exports.kegiatanCategoryEnum = void 0;
const zod_1 = require("zod");
const base_validator_1 = require("./base.validator");
exports.kegiatanCategoryEnum = zod_1.z.enum(['SOSIAL', 'PENDIDIKAN', 'PELATIHAN']);
exports.createKegiatanSchema = zod_1.z.object({
    title: base_validator_1.titleField,
    description: zod_1.z.string().min(10, 'Description must be at least 10 characters'),
    category: exports.kegiatanCategoryEnum,
    date: base_validator_1.dateField,
    isActive: (0, base_validator_1.booleanFieldWithDefault)(true),
    showDonationButton: (0, base_validator_1.booleanFieldWithDefault)(false),
    donasiId: zod_1.z.coerce.number().int().positive().nullable().optional(),
});
exports.updateKegiatanSchema = zod_1.z.object({
    title: base_validator_1.titleField.optional(),
    description: zod_1.z.string().min(10, 'Description must be at least 10 characters').optional(),
    category: exports.kegiatanCategoryEnum.optional(),
    date: base_validator_1.dateField,
    isActive: (0, base_validator_1.booleanField)().optional(),
    showDonationButton: (0, base_validator_1.booleanField)().optional(),
    donasiId: zod_1.z.coerce.number().int().positive().nullable().optional(),
});
//# sourceMappingURL=kegiatan.validator.js.map