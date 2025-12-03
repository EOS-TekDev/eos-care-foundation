import midtransClient from 'midtrans-client';
import { env } from './env';

export const snap = new midtransClient.Snap({
  isProduction: env.midtransIsProduction,
  serverKey: env.midtransServerKey,
  clientKey: env.midtransClientKey,
});

export const coreApi = new midtransClient.CoreApi({
  isProduction: env.midtransIsProduction,
  serverKey: env.midtransServerKey,
  clientKey: env.midtransClientKey,
});
