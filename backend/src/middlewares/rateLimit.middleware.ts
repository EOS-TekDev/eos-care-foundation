import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Request } from 'express';
import { rateLimitConfig, getWhitelistedIPs } from '../config/rateLimit.config';

/**
 * Rate limiting middleware for protecting API endpoints
 * @see Architecture Section 5.3 - Rate Limiting & Throttling
 */

/**
 * Check if the client IP is in the whitelist
 * @param req - Express request object
 * @returns true if the IP should skip rate limiting
 */
const isWhitelisted = (req: Request): boolean => {
  const whitelist = getWhitelistedIPs();
  const clientIP = req.ip || '';
  return whitelist.includes(clientIP);
};

/**
 * Key generator for IP-based rate limiting
 * @param req - Express request object
 * @returns The client IP address for rate limit tracking
 */
export const keyGenerator = (req: Request): string => {
  return req.ip || 'unknown';
};

/**
 * General public API rate limiter
 * - 100 requests per 15 minutes (configurable via RATE_LIMIT_PUBLIC_MAX)
 * - Whitelisted IPs bypass rate limiting
 * - Use for /api/public/* endpoints
 */
export const publicApiLimiter: RateLimitRequestHandler = rateLimit({
  ...rateLimitConfig.public,
  skip: isWhitelisted,
  keyGenerator,
});

/**
 * Strict authentication rate limiter
 * - 5 requests per 15 minutes (configurable via RATE_LIMIT_AUTH_MAX)
 * - NO whitelist bypass for security (prevents brute force attacks)
 * - Use for /api/auth/login and /api/auth/register
 */
export const authLimiter: RateLimitRequestHandler = rateLimit({
  ...rateLimitConfig.auth,
  keyGenerator,
  // No skip function - always enforce auth rate limits for security
});

/**
 * Admin API rate limiter
 * - 200 requests per 15 minutes (configurable via RATE_LIMIT_ADMIN_MAX)
 * - NO whitelist bypass - always enforce for admin endpoints
 * - Use for /api/admin/* endpoints
 */
export const adminApiLimiter: RateLimitRequestHandler = rateLimit({
  ...rateLimitConfig.admin,
  keyGenerator,
  // No skip function - always enforce admin rate limits
});
