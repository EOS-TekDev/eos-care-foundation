import { Request, Response, NextFunction } from 'express';
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
export declare const csrfProtection: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=csrf.middleware.d.ts.map