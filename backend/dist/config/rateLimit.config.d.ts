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
/**
 * Rate limit configuration object containing settings for different endpoint types
 */
export declare const rateLimitConfig: {
    /**
     * General public API rate limit
     * - 900 requests per 30 seconds
     * - Whitelist support for trusted IPs
     */
    public: Options;
    /**
     * Strict authentication rate limit (login/register)
     * - 900 requests per 30 seconds
     * - No whitelist bypass for security
     */
    auth: Options;
    /**
     * Admin API rate limit (higher threshold)
     * - 900 requests per 30 seconds
     * - No whitelist bypass - always enforce for admin
     */
    admin: Options;
};
/**
 * Get whitelisted IP addresses from environment variable
 * @returns Array of whitelisted IP addresses
 */
export declare const getWhitelistedIPs: () => string[];
//# sourceMappingURL=rateLimit.config.d.ts.map