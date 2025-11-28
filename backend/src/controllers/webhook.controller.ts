import { Request, Response } from 'express';
import crypto from 'crypto';
import prisma from '../config/database';
import { sendResponse, sendError } from '../utils/response';

export const handleMidtransNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notification = req.body;
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
    } = notification;

    // Verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    const hash = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex');

    if (hash !== signature_key) {
      sendError(res, 403, 'Invalid signature');
      return;
    }

    // Find transaction by orderId
    const transaction = await prisma.donasiTransaction.findUnique({
      where: { orderId: order_id },
    });

    if (!transaction) {
      sendError(res, 404, 'Transaction not found');
      return;
    }

    // Determine new status based on Midtrans response
    let newStatus: 'PENDING' | 'COMPLETED' | 'FAILED' = 'PENDING';

    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      if (fraud_status === 'accept' || !fraud_status) {
        newStatus = 'COMPLETED';
      } else {
        newStatus = 'FAILED';
      }
    } else if (
      transaction_status === 'cancel' ||
      transaction_status === 'deny' ||
      transaction_status === 'expire'
    ) {
      newStatus = 'FAILED';
    } else if (transaction_status === 'pending') {
      newStatus = 'PENDING';
    }

    const previousStatus = transaction.status;

    // Update transaction
    await prisma.donasiTransaction.update({
      where: { orderId: order_id },
      data: {
        status: newStatus,
        paymentType: payment_type,
      },
    });

    // Update donasi currentAmount if status changed to COMPLETED
    if (newStatus === 'COMPLETED' && previousStatus !== 'COMPLETED') {
      await prisma.donasi.update({
        where: { id: transaction.donasiId },
        data: {
          currentAmount: { increment: transaction.amount },
        },
      });
    }

    // Decrease if status changed from COMPLETED to something else
    if (previousStatus === 'COMPLETED' && newStatus !== 'COMPLETED') {
      await prisma.donasi.update({
        where: { id: transaction.donasiId },
        data: {
          currentAmount: { decrement: transaction.amount },
        },
      });
    }

    sendResponse(res, 200, 'Notification processed');
  } catch (error) {
    console.error('Midtrans webhook error:', error);
    sendError(res, 500, 'Failed to process notification');
  }
};
