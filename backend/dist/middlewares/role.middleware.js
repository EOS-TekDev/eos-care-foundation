"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.requireRole = void 0;
const response_1 = require("../utils/response");
const requireRole = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            (0, response_1.sendError)(res, 401, 'Authentication required');
            return;
        }
        if (!roles.includes(user.role)) {
            (0, response_1.sendError)(res, 403, 'Insufficient permissions');
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.isAdmin = (0, exports.requireRole)('ADMIN');
//# sourceMappingURL=role.middleware.js.map