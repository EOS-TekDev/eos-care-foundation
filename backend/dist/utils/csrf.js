"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStateChangingMethod = exports.validateCSRFToken = exports.generateCSRFToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * CSRF Token Utilities
 * Implements double-submit cookie pattern for CSRF protection
 */
/**
 * Generate a cryptographically secure CSRF token
 * @returns A 32-byte hex-encoded token
 */
const generateCSRFToken = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
exports.generateCSRFToken = generateCSRFToken;
/**
 * Validate that the provided token matches the expected token
 * Uses timing-safe comparison to prevent timing attacks
 * @param providedToken - Token from request header
 * @param expectedToken - Token from cookie
 * @returns true if tokens match, false otherwise
 */
const validateCSRFToken = (providedToken, expectedToken) => {
    if (!providedToken || !expectedToken) {
        return false;
    }
    // Ensure both tokens are the same length for timing-safe comparison
    if (providedToken.length !== expectedToken.length) {
        return false;
    }
    try {
        return crypto_1.default.timingSafeEqual(Buffer.from(providedToken), Buffer.from(expectedToken));
    }
    catch {
        return false;
    }
};
exports.validateCSRFToken = validateCSRFToken;
/**
 * Check if the request method requires CSRF validation
 * @param method - HTTP method
 * @returns true if the method is state-changing (POST, PUT, DELETE, PATCH)
 */
const isStateChangingMethod = (method) => {
    const stateChangingMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
    return stateChangingMethods.includes(method.toUpperCase());
};
exports.isStateChangingMethod = isStateChangingMethod;
//# sourceMappingURL=csrf.js.map