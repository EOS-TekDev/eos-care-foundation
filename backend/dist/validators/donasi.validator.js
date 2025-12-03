"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionSchema = exports.updateDonasiSchema = exports.createDonasiSchema = void 0;
const zod_1 = require("zod");
const base_validator_1 = require("./base.validator");
exports.createDonasiSchema = zod_1.z.object({
    title: base_validator_1.titleField,
    description: zod_1.z.string().min(10, 'Description must be at least 10 characters'),
    targetAmount: zod_1.z.coerce.number().positive('Target amount must be positive'),
    deadline: base_validator_1.dateField,
    isActive: (0, base_validator_1.booleanFieldWithDefault)(true),
});
exports.updateDonasiSchema = zod_1.z.object({
    title: base_validator_1.titleField.optional(),
    description: zod_1.z.string().min(10, 'Description must be at least 10 characters').optional(),
    targetAmount: zod_1.z.coerce.number().positive('Target amount must be positive').optional(),
    deadline: base_validator_1.dateField,
    isActive: (0, base_validator_1.booleanField)().optional(),
});
exports.createTransactionSchema = zod_1.z.object({
    donorName: zod_1.z.string().min(2, 'Donor name must be at least 2 characters'),
    donorEmail: zod_1.z.string().email().optional().nullable(),
    amount: zod_1.z.coerce.number().positive('Amount must be positive'),
    message: zod_1.z.string().optional().nullable(),
});
//# sourceMappingURL=donasi.validator.js.map