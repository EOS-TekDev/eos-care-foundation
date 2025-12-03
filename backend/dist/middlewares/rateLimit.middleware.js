"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminApiLimiter = exports.authLimiter = exports.publicApiLimiter = exports.keyGenerator = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rateLimit_config_1 = require("../config/rateLimit.config");
/**
 * Rate limiting middleware for protecting API endpoints
 * @see Architecture Section 5.3 - Rate Limiting & Throttling
 */
/**
 * Check if the client IP is in the whitelist
 * @param req - Express request object
 * @returns true if the IP should skip rate limiting
 */
const isWhitelisted = (req) => {
    const whitelist = (0, rateLimit_config_1.getWhitelistedIPs)();
    const clientIP = req.ip || '';
    return whitelist.includes(clientIP);
};
/**
 * Key generator for IP-based rate limiting
 * @param req - Express request object
 * @returns The client IP address for rate limit tracking
 */
const keyGenerator = (req) => {
    return req.ip || 'unknown';
};
exports.keyGenerator = keyGenerator;
/**
 * General public API rate limiter
 * - 100 requests per 15 minutes (configurable via RATE_LIMIT_PUBLIC_MAX)
 * - Whitelisted IPs bypass rate limiting
 * - Use for /api/public/* endpoints
 */
exports.publicApiLimiter = (0, express_rate_limit_1.default)({
    ...rateLimit_config_1.rateLimitConfig.public,
    skip: isWhitelisted,
    keyGenerator: exports.keyGenerator,
});
/**
 * Strict authentication rate limiter
 * - 5 requests per 15 minutes (configurable via RATE_LIMIT_AUTH_MAX)
 * - NO whitelist bypass for security (prevents brute force attacks)
 * - Use for /api/auth/login and /api/auth/register
 */
exports.authLimiter = (0, express_rate_limit_1.default)({
    ...rateLimit_config_1.rateLimitConfig.auth,
    keyGenerator: exports.keyGenerator,
    // No skip function - always enforce auth rate limits for security
});
/**
 * Admin API rate limiter
 * - 200 requests per 15 minutes (configurable via RATE_LIMIT_ADMIN_MAX)
 * - NO whitelist bypass - always enforce for admin endpoints
 * - Use for /api/admin/* endpoints
 */
exports.adminApiLimiter = (0, express_rate_limit_1.default)({
    ...rateLimit_config_1.rateLimitConfig.admin,
    keyGenerator: exports.keyGenerator,
    // No skip function - always enforce admin rate limits
});
//# sourceMappingURL=rateLimit.middleware.js.map