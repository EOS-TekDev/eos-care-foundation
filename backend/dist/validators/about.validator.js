"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutSchema = exports.createAboutSchema = void 0;
const zod_1 = require("zod");
const base_validator_1 = require("./base.validator");
exports.createAboutSchema = zod_1.z.object({
    title: base_validator_1.titleField,
    content: base_validator_1.contentField,
    order: base_validator_1.orderFieldWithDefault,
});
exports.updateAboutSchema = zod_1.z.object({
    title: base_validator_1.titleField.optional(),
    content: base_validator_1.contentField.optional(),
    order: base_validator_1.orderField.optional(),
});
//# sourceMappingURL=about.validator.js.map