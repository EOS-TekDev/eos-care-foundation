import { Request, Response } from 'express';
import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { sendResponse, sendError } from '../utils/response';
import { cookieOptions, clearCookieOptions } from '../utils/cookie';
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from '../validators/auth.validator';
import { User } from '@prisma/client';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      sendError(res, 400, 'Email already registered');
      return;
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    const token = generateToken({ userId: user.id, role: user.role });
    
    res.cookie('token', token, cookieOptions);
    sendResponse(res, 201, 'Registration successful', { user, token });
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, 400, error.message);
      return;
    }
    sendError(res, 500, 'Registration failed');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !user.password) {
      sendError(res, 401, 'Invalid credentials');
      return;
    }

    const isValid = await comparePassword(data.password, user.password);
    if (!isValid) {
      sendError(res, 401, 'Invalid credentials');
      return;
    }

    const token = generateToken({ userId: user.id, role: user.role });
    const { password: _, ...userWithoutPassword } = user;

    res.cookie('token', token, cookieOptions);
    sendResponse(res, 200, 'Login successful', { user: userWithoutPassword, token });
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, 400, error.message);
      return;
    }
    sendError(res, 500, 'Login failed');
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token', clearCookieOptions);
    sendResponse(res, 200, 'Logged out successfully');
  } catch {
    sendError(res, 500, 'Logout failed');
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user as User;
    const { password: _, ...userWithoutPassword } = user;
    sendResponse(res, 200, 'User retrieved', userWithoutPassword);
  } catch {
    sendError(res, 500, 'Failed to get user');
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = updateProfileSchema.parse(req.body);
    const userId = (req as any).user!.id;

    const photo = req.file ? `/uploads/${req.file.filename}` : data.photo;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { ...data, photo },
      select: { id: true, email: true, name: true, photo: true, role: true },
    });

    sendResponse(res, 200, 'Profile updated', user);
  } catch (error) {
    if (error instanceof Error) {
      sendError(res, 400, error.message);
      return;
    }
    sendError(res, 500, 'Failed to update profile');
  }
};

export const googleCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user as User;
    const token = generateToken({ userId: user.id, role: user.role });

    res.cookie('token', token, cookieOptions);
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  } catch {
    sendError(res, 500, 'Google authentication failed');
  }
};
