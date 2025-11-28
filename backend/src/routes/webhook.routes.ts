import { Router } from 'express';
import { handleMidtransNotification } from '../controllers/webhook.controller';

const router = Router();

router.post('/midtrans', handleMidtransNotification);

export default router;
