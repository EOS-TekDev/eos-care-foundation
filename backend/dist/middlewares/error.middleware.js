"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
const errorHandler = (err, _req, res, _next) => {
    console.error('Error:', err);
    if (err instanceof zod_1.ZodError) {
        const message = err.issues.map((e) => e.message).join(', ');
        (0, response_1.sendError)(res, 400, message);
        return;
    }
    if (err.name === 'JsonWebTokenError') {
        (0, response_1.sendError)(res, 401, 'Invalid token');
        return;
    }
    if (err.name === 'TokenExpiredError') {
        (0, response_1.sendError)(res, 401, 'Token expired');
        return;
    }
    (0, response_1.sendError)(res, 500, err.message || 'Internal server error');
};
exports.errorHandler = errorHandler;
const notFoundHandler = (_req, res) => {
    (0, response_1.sendError)(res, 404, 'Resource not found');
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=error.middleware.js.map