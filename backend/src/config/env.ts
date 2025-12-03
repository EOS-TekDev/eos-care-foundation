import dotenv from 'dotenv';

dotenv.config();

type RequiredEnvKey =
  | 'PORT'
  | 'JWT_SECRET'
  | 'MIDTRANS_SERVER_KEY'
  | 'MIDTRANS_CLIENT_KEY'
  | 'FRONTEND_URL'
  | 'DATABASE_URL';

const requiredKeys: RequiredEnvKey[] = [
  'PORT',
  'JWT_SECRET',
  'MIDTRANS_SERVER_KEY',
  'MIDTRANS_CLIENT_KEY',
  'FRONTEND_URL',
  'DATABASE_URL',
];

const missing = requiredKeys.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

export const env = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET!,
  midtransServerKey: process.env.MIDTRANS_SERVER_KEY!,
  midtransClientKey: process.env.MIDTRANS_CLIENT_KEY!,
  frontendUrl: process.env.FRONTEND_URL!,
  databaseUrl: process.env.DATABASE_URL!,
  midtransIsProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  nodeEnv: process.env.NODE_ENV || 'development',
};
