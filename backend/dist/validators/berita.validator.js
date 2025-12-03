"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBeritaSchema = exports.createBeritaSchema = void 0;
const zod_1 = require("zod");
const base_validator_1 = require("./base.validator");
exports.createBeritaSchema = zod_1.z.object({
    title: base_validator_1.titleField,
    content: base_validator_1.contentField,
    isPublished: (0, base_validator_1.booleanFieldWithDefault)(false),
    showDonationButton: (0, base_validator_1.booleanFieldWithDefault)(false),
    donasiId: zod_1.z.coerce.number().int().positive().nullable().optional(),
});
exports.updateBeritaSchema = zod_1.z.object({
    title: base_validator_1.titleField.optional(),
    content: base_validator_1.contentField.optional(),
    isPublished: (0, base_validator_1.booleanField)().optional(),
    showDonationButton: (0, base_validator_1.booleanField)().optional(),
    donasiId: zod_1.z.coerce.number().int().positive().nullable().optional(),
});
//# sourceMappingURL=berita.validator.js.map