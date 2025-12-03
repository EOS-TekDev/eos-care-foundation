import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import passport from './config/passport';
import routes from './routes';
import webhookRoutes from './routes/webhook.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import {
  publicApiLimiter,
  authLimiter,
  adminApiLimiter,
} from './middlewares/rateLimit.middleware';
import { securityConfig } from './config/security.config';
import { csrfProtection } from './middlewares/csrf.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Security headers - must be first for maximum protection
app.use(helmet(securityConfig));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// CSRF protection - must be after cookieParser
// Sets csrfToken cookie and validates X-CSRF-Token header on state-changing requests
app.use(csrfProtection);

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Webhook routes - NO rate limiting (payment callbacks must not be blocked)
app.use('/api/webhook', webhookRoutes);

// Rate limiting for auth endpoints (strict - 5 requests/15 min)
// Applied before the routes to intercept login/register specifically
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Rate limiting for public API (100 requests/15 min with whitelist support)
app.use('/api/public', publicApiLimiter);

// Rate limiting for admin API (200 requests/15 min)
app.use('/api/admin', adminApiLimiter);

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
