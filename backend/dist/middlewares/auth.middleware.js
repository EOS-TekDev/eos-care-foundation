"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
const database_1 = __importDefault(require("../config/database"));
const authenticate = async (req, res, next) => {
    try {
        // Check cookie first, fallback to Bearer token
        const token = req.cookies?.token
            || req.headers.authorization?.split(' ')[1];
        if (!token) {
            (0, response_1.sendError)(res, 401, 'Authentication required');
            return;
        }
        const payload = (0, jwt_1.verifyToken)(token);
        const user = await database_1.default.user.findUnique({
            where: { id: payload.userId },
        });
        if (!user) {
            (0, response_1.sendError)(res, 401, 'User not found');
            return;
        }
        req.user = user;
        next();
    }
    catch {
        (0, response_1.sendError)(res, 401, 'Invalid or expired token');
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map