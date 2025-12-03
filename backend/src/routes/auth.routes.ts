import { Router } from 'express';
import passport from '../config/passport';
import * as authController from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../utils/upload';
import crypto from 'crypto';

const router = Router();
const OAUTH_STATE_COOKIE = 'oauthState';
const oauthStateCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 10 * 60 * 1000, // 10 minutes
  path: '/',
};

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);
router.put('/profile', authenticate, upload.single('photo'), authController.updateProfile);

// Google OAuth routes (with state/nonce protection)
router.get('/google', (req, res, next) => {
  const state = crypto.randomBytes(16).toString('hex');
  res.cookie(OAUTH_STATE_COOKIE, state, oauthStateCookieOptions);
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    state,
  })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/login?error=google`,
  }),
  authController.googleCallback
);

export default router;
