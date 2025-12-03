"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallback = exports.updateProfile = exports.getMe = exports.logout = exports.login = exports.register = void 0;
const database_1 = __importDefault(require("../config/database"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
const cookie_1 = require("../utils/cookie");
const auth_validator_1 = require("../validators/auth.validator");
const register = async (req, res) => {
    try {
        const data = auth_validator_1.registerSchema.parse(req.body);
        const existingUser = await database_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            (0, response_1.sendError)(res, 400, 'Email already registered');
            return;
        }
        const hashedPassword = await (0, password_1.hashPassword)(data.password);
        const user = await database_1.default.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
            },
            select: { id: true, email: true, name: true, role: true },
        });
        const token = (0, jwt_1.generateToken)({ userId: user.id, role: user.role });
        res.cookie('token', token, cookie_1.cookieOptions);
        (0, response_1.sendResponse)(res, 201, 'Registration successful', { user, token });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, response_1.sendError)(res, 400, error.message);
            return;
        }
        (0, response_1.sendError)(res, 500, 'Registration failed');
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const data = auth_validator_1.loginSchema.parse(req.body);
        const user = await database_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (!user || !user.password) {
            (0, response_1.sendError)(res, 401, 'Invalid credentials');
            return;
        }
        const isValid = await (0, password_1.comparePassword)(data.password, user.password);
        if (!isValid) {
            (0, response_1.sendError)(res, 401, 'Invalid credentials');
            return;
        }
        const token = (0, jwt_1.generateToken)({ userId: user.id, role: user.role });
        const { password: _, ...userWithoutPassword } = user;
        res.cookie('token', token, cookie_1.cookieOptions);
        (0, response_1.sendResponse)(res, 200, 'Login successful', { user: userWithoutPassword, token });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, response_1.sendError)(res, 400, error.message);
            return;
        }
        (0, response_1.sendError)(res, 500, 'Login failed');
    }
};
exports.login = login;
const logout = async (_req, res) => {
    try {
        res.clearCookie('token', cookie_1.clearCookieOptions);
        (0, response_1.sendResponse)(res, 200, 'Logged out successfully');
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Logout failed');
    }
};
exports.logout = logout;
const getMe = async (req, res) => {
    try {
        const user = req.user;
        const { password: _, ...userWithoutPassword } = user;
        (0, response_1.sendResponse)(res, 200, 'User retrieved', userWithoutPassword);
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get user');
    }
};
exports.getMe = getMe;
const updateProfile = async (req, res) => {
    try {
        const data = auth_validator_1.updateProfileSchema.parse(req.body);
        const userId = req.user.id;
        const photo = req.file ? `/uploads/${req.file.filename}` : data.photo;
        const user = await database_1.default.user.update({
            where: { id: userId },
            data: { ...data, photo },
            select: { id: true, email: true, name: true, photo: true, role: true },
        });
        (0, response_1.sendResponse)(res, 200, 'Profile updated', user);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, response_1.sendError)(res, 400, error.message);
            return;
        }
        (0, response_1.sendError)(res, 500, 'Failed to update profile');
    }
};
exports.updateProfile = updateProfile;
const googleCallback = async (req, res) => {
    try {
        const user = req.user;
        const token = (0, jwt_1.generateToken)({ userId: user.id, role: user.role });
        res.cookie('token', token, cookie_1.cookieOptions);
        res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Google authentication failed');
    }
};
exports.googleCallback = googleCallback;
//# sourceMappingURL=auth.controller.js.map