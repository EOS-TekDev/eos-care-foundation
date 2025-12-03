"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeta = exports.getPagination = void 0;
const getPagination = (query) => {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10)));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};
exports.getPagination = getPagination;
const getMeta = (total, page, limit) => ({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
});
exports.getMeta = getMeta;
//# sourceMappingURL=base.service.js.map