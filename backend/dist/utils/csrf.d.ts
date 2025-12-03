/**
 * CSRF Token Utilities
 * Implements double-submit cookie pattern for CSRF protection
 */
/**
 * Generate a cryptographically secure CSRF token
 * @returns A 32-byte hex-encoded token
 */
export declare const generateCSRFToken: () => string;
/**
 * Validate that the provided token matches the expected token
 * Uses timing-safe comparison to prevent timing attacks
 * @param providedToken - Token from request header
 * @param expectedToken - Token from cookie
 * @returns true if tokens match, false otherwise
 */
export declare const validateCSRFToken: (providedToken: string | undefined, expectedToken: string | undefined) => boolean;
/**
 * Check if the request method requires CSRF validation
 * @param method - HTTP method
 * @returns true if the method is state-changing (POST, PUT, DELETE, PATCH)
 */
export declare const isStateChangingMethod: (method: string) => boolean;
//# sourceMappingURL=csrf.d.ts.map