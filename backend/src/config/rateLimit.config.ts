import { Options } from 'express-rate-limit';

/**
 * Rate limit configuration for different API endpoints
 * @see Architecture Section 5.3 - Rate Limiting & Throttling
 */

export interface RateLimitErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    retryAfter: number;
  };
}

// Base configuration for all rate limiters
const baseConfig: Partial<Options> = {
  standardHeaders: 'draft-6', // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
};

// Default window in milliseconds (15 minutes)
const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 900000ms

// Retry after value in seconds (15 minutes)
const RETRY_AFTER_SECONDS = 900;

/**
 * Rate limit configuration object containing settings for different endpoint types
 */
export const rateLimitConfig = {
  /**
   * General public API rate limit
   * - 100 requests per 15 minutes
   * - Whitelist support for trusted IPs
   */
  public: {
    ...baseConfig,
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || String(DEFAULT_WINDOW_MS)),
    limit: parseInt(process.env.RATE_LIMIT_PUBLIC_MAX || '100'),
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests, please try again later',
        retryAfter: RETRY_AFTER_SECONDS,
      },
    } as RateLimitErrorResponse,
  } as Options,

  /**
   * Strict authentication rate limit (login/register)
   * - 5 requests per 15 minutes
   * - No whitelist bypass for security
   */
  auth: {
    ...baseConfig,
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || String(DEFAULT_WINDOW_MS)),
    limit: parseInt(process.env.RATE_LIMIT_AUTH_MAX || '5'),
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many login attempts, please try again later',
        retryAfter: RETRY_AFTER_SECONDS,
      },
    } as RateLimitErrorResponse,
  } as Options,

  /**
   * Admin API rate limit (higher threshold)
   * - 200 requests per 15 minutes
   * - No whitelist bypass - always enforce for admin
   */
  admin: {
    ...baseConfig,
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || String(DEFAULT_WINDOW_MS)),
    limit: parseInt(process.env.RATE_LIMIT_ADMIN_MAX || '200'),
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests, please try again later',
        retryAfter: RETRY_AFTER_SECONDS,
      },
    } as RateLimitErrorResponse,
  } as Options,
};

/**
 * Get whitelisted IP addresses from environment variable
 * @returns Array of whitelisted IP addresses
 */
export const getWhitelistedIPs = (): string[] => {
  const whitelist = process.env.RATE_LIMIT_WHITELIST || '';
  return whitelist
    .split(',')
    .map((ip) => ip.trim())
    .filter(Boolean);
};
