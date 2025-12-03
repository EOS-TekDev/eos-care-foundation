"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfProtection = void 0;
const csrf_1 = require("../utils/csrf");
const response_1 = require("../utils/response");
/**
 * CSRF Cookie options
 * Note: This cookie is NOT httpOnly so JavaScript can read it
 * The actual protection comes from validating that the token in the header
 * matches the token in the cookie (double-submit pattern)
 */
const CSRF_COOKIE_OPTIONS = {
    httpOnly: false, // Must be readable by JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
};
const CSRF_COOKIE_NAME = 'csrfToken';
const CSRF_HEADER_NAME = 'x-csrf-token';
/**
 * List of paths that are exempt from CSRF validation
 * These are endpoints that need to work before authentication or are safe
 */
const EXEMPT_PATHS = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/google',
    '/api/auth/google/callback',
    '/api/auth/logout',
    '/api/webhook',
];
/**
 * Check if a path should be exempt from CSRF validation
 */
const isExemptPath = (path) => {
    return EXEMPT_PATHS.some(exempt => path.startsWith(exempt));
};
/**
 * CSRF Protection Middleware
 *
 * Implements the double-submit cookie pattern:
 * 1. Sets a CSRF token cookie on every response (if not already present)
 * 2. For state-changing requests (POST, PUT, DELETE, PATCH), validates that
 *    the X-CSRF-Token header matches the csrfToken cookie
 *
 * Security: SameSite=Strict cookies provide the primary defense.
 * The double-submit pattern adds an additional layer of protection.
 */
const csrfProtection = (req, res, next) => {
    // Always ensure a CSRF token cookie exists
    let csrfToken = req.cookies[CSRF_COOKIE_NAME];
    if (!csrfToken) {
        csrfToken = (0, csrf_1.generateCSRFToken)();
        res.cookie(CSRF_COOKIE_NAME, csrfToken, CSRF_COOKIE_OPTIONS);
    }
    // GET requests and exempt paths don't need CSRF validation
    if (!(0, csrf_1.isStateChangingMethod)(req.method) || isExemptPath(req.path)) {
        return next();
    }
    // For state-changing requests, validate the CSRF token
    const headerToken = req.headers[CSRF_HEADER_NAME];
    const cookieToken = req.cookies[CSRF_COOKIE_NAME];
    if (!(0, csrf_1.validateCSRFToken)(headerToken, cookieToken)) {
        (0, response_1.sendError)(res, 403, 'CSRF token validation failed');
        return;
    }
    next();
};
exports.csrfProtection = csrfProtection;
//# sourceMappingURL=csrf.middleware.js.map