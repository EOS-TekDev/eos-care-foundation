"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBeritaCommentSchema = exports.createBeritaCommentSchema = void 0;
const zod_1 = require("zod");
exports.createBeritaCommentSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .min(1, 'Komentar tidak boleh kosong')
        .max(2000, 'Komentar terlalu panjang'),
    parentId: zod_1.z
        .preprocess((val) => {
        if (val === undefined || val === null || val === '')
            return undefined;
        if (typeof val === 'number')
            return val;
        const parsed = parseInt(String(val), 10);
        return Number.isNaN(parsed) ? undefined : parsed;
    }, zod_1.z.number().int().positive().optional())
        .optional(),
});
exports.updateBeritaCommentSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .min(1, 'Komentar tidak boleh kosong')
        .max(2000, 'Komentar terlalu panjang'),
});
//# sourceMappingURL=berita-comment.validator.js.map