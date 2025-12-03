"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.info(JSON.stringify({
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            duration_ms: duration,
        }));
    });
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=logging.middleware.js.map