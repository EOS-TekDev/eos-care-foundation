import { RateLimitRequestHandler } from 'express-rate-limit';
import { Request } from 'express';
/**
 * Key generator for IP-based rate limiting
 * @param req - Express request object
 * @returns The client IP address for rate limit tracking
 */
export declare const keyGenerator: (req: Request) => string;
/**
 * General public API rate limiter
 * - 100 requests per 15 minutes (configurable via RATE_LIMIT_PUBLIC_MAX)
 * - Whitelisted IPs bypass rate limiting
 * - Use for /api/public/* endpoints
 */
export declare const publicApiLimiter: RateLimitRequestHandler;
/**
 * Strict authentication rate limiter
 * - 5 requests per 15 minutes (configurable via RATE_LIMIT_AUTH_MAX)
 * - NO whitelist bypass for security (prevents brute force attacks)
 * - Use for /api/auth/login and /api/auth/register
 */
export declare const authLimiter: RateLimitRequestHandler;
/**
 * Admin API rate limiter
 * - 200 requests per 15 minutes (configurable via RATE_LIMIT_ADMIN_MAX)
 * - NO whitelist bypass - always enforce for admin endpoints
 * - Use for /api/admin/* endpoints
 */
export declare const adminApiLimiter: RateLimitRequestHandler;
//# sourceMappingURL=rateLimit.middleware.d.ts.map