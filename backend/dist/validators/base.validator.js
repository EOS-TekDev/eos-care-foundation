"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateSchema = exports.dateField = exports.booleanFieldWithDefault = exports.booleanField = exports.orderFieldWithDefault = exports.orderField = exports.contentField = exports.titleField = void 0;
const zod_1 = require("zod");
// Reusable field schemas
exports.titleField = zod_1.z.string().min(3, 'Title must be at least 3 characters');
exports.contentField = zod_1.z.string().min(10, 'Content must be at least 10 characters');
// Coerce common boolean representations but keep undefined/null untouched
const coerceBoolean = (val) => {
    if (val === undefined || val === null || val === '')
        return undefined;
    if (val === true || val === 'true' || val === 1 || val === '1')
        return true;
    if (val === false || val === 'false' || val === 0 || val === '0')
        return false;
    return val;
};
// Number/order helpers
exports.orderField = zod_1.z.coerce.number().int();
exports.orderFieldWithDefault = exports.orderField.optional().default(0);
// Boolean helpers (string "true"/true accepted)
const booleanField = () => zod_1.z.preprocess(coerceBoolean, zod_1.z.boolean());
exports.booleanField = booleanField;
const booleanFieldWithDefault = (defaultValue = false) => (0, exports.booleanField)().optional().default(defaultValue);
exports.booleanFieldWithDefault = booleanFieldWithDefault;
exports.dateField = zod_1.z.preprocess((val) => {
    if (!val || val === '')
        return undefined;
    // If it's already a full ISO datetime, return as-is
    if (typeof val === 'string' && val.includes('T'))
        return val;
    // Convert YYYY-MM-DD to ISO datetime (start of day UTC)
    if (typeof val === 'string')
        return `${val}T00:00:00.000Z`;
    return val;
}, zod_1.z.string().datetime().optional());
// Helper to create update schema from create schema (only use when create schema has no defaults)
const makeUpdateSchema = (schema) => schema.partial();
exports.makeUpdateSchema = makeUpdateSchema;
//# sourceMappingURL=base.validator.js.map