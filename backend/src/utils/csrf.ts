import crypto from 'crypto';

/**
 * CSRF Token Utilities
 * Implements double-submit cookie pattern for CSRF protection
 */

/**
 * Generate a cryptographically secure CSRF token
 * @returns A 32-byte hex-encoded token
 */
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Validate that the provided token matches the expected token
 * Uses timing-safe comparison to prevent timing attacks
 * @param providedToken - Token from request header
 * @param expectedToken - Token from cookie
 * @returns true if tokens match, false otherwise
 */
export const validateCSRFToken = (
  providedToken: string | undefined,
  expectedToken: string | undefined
): boolean => {
  if (!providedToken || !expectedToken) {
    return false;
  }

  // Ensure both tokens are the same length for timing-safe comparison
  if (providedToken.length !== expectedToken.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(
      Buffer.from(providedToken),
      Buffer.from(expectedToken)
    );
  } catch {
    return false;
  }
};

/**
 * Check if the request method requires CSRF validation
 * @param method - HTTP method
 * @returns true if the method is state-changing (POST, PUT, DELETE, PATCH)
 */
export const isStateChangingMethod = (method: string): boolean => {
  const stateChangingMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  return stateChangingMethods.includes(method.toUpperCase());
};
