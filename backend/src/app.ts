import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
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
import { env } from './config/env';
import prisma from './config/database';
import { requestLogger } from './middlewares/logging.middleware';

const app = express();
const PORT = env.port;

// Middleware
// Security headers - must be first for maximum protection
app.use(helmet(securityConfig));

app.use(cors({
  origin: env.frontendUrl,
  credentials: true,
}));
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json({ limit: '256kb' }));
app.use(express.urlencoded({ extended: true, limit: '256kb' }));
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
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'error', error: 'db_unavailable', detail: (err as Error).message });
  }
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const shutdown = async (signal: NodeJS.Signals) => {
  console.log(`Received ${signal}, shutting down...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
    } finally {
      process.exit(0);
    }
  });
};

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => void shutdown(sig as NodeJS.Signals));
});

export default app;
