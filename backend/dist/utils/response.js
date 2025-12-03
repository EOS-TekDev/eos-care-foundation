"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendResponse = void 0;
const sendResponse = (res, statusCode, message, data, meta) => {
    const response = {
        success: statusCode >= 200 && statusCode < 300,
        message,
        data,
        meta,
    };
    return res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.sendError = sendError;
//# sourceMappingURL=response.js.map