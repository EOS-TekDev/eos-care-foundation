"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("./config/passport"));
const routes_1 = __importDefault(require("./routes"));
const webhook_routes_1 = __importDefault(require("./routes/webhook.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const rateLimit_middleware_1 = require("./middlewares/rateLimit.middleware");
const security_config_1 = require("./config/security.config");
const csrf_middleware_1 = require("./middlewares/csrf.middleware");
const env_1 = require("./config/env");
const database_1 = __importDefault(require("./config/database"));
const logging_middleware_1 = require("./middlewares/logging.middleware");
const app = (0, express_1.default)();
const PORT = env_1.env.port;
// Middleware
// Security headers - must be first for maximum protection
app.use((0, helmet_1.default)(security_config_1.securityConfig));
app.use((0, cors_1.default)({
    origin: env_1.env.frontendUrl,
    credentials: true,
}));
app.use(logging_middleware_1.requestLogger);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: '256kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '256kb' }));
app.use(passport_1.default.initialize());
// CSRF protection - must be after cookieParser
// Sets csrfToken cookie and validates X-CSRF-Token header on state-changing requests
app.use(csrf_middleware_1.csrfProtection);
// Static files for uploads
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Webhook routes - NO rate limiting (payment callbacks must not be blocked)
app.use('/api/webhook', webhook_routes_1.default);
// Rate limiting for auth endpoints (strict - 5 requests/15 min)
// Applied before the routes to intercept login/register specifically
app.use('/api/auth/login', rateLimit_middleware_1.authLimiter);
app.use('/api/auth/register', rateLimit_middleware_1.authLimiter);
// Rate limiting for public API (100 requests/15 min with whitelist support)
app.use('/api/public', rateLimit_middleware_1.publicApiLimiter);
// Rate limiting for admin API (200 requests/15 min)
app.use('/api/admin', rateLimit_middleware_1.adminApiLimiter);
// Routes
app.use('/api', routes_1.default);
// Health check
app.get('/health', async (_req, res) => {
    try {
        await database_1.default.$queryRaw `SELECT 1`;
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    }
    catch (err) {
        res.status(503).json({ status: 'error', error: 'db_unavailable', detail: err.message });
    }
});
// Error handlers
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const shutdown = async (signal) => {
    console.log(`Received ${signal}, shutting down...`);
    server.close(async () => {
        try {
            await database_1.default.$disconnect();
        }
        finally {
            process.exit(0);
        }
    });
};
['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig, () => void shutdown(sig));
});
exports.default = app;
//# sourceMappingURL=app.js.map