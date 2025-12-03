"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookieOptions = exports.cookieOptions = void 0;
exports.cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
};
exports.clearCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
};
//# sourceMappingURL=cookie.js.map