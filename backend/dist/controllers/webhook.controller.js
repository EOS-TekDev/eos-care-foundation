"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMidtransNotification = void 0;
const crypto_1 = __importDefault(require("crypto"));
const database_1 = __importDefault(require("../config/database"));
const response_1 = require("../utils/response");
const handleMidtransNotification = async (req, res) => {
    try {
        const notification = req.body;
        const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status, payment_type, } = notification;
        // Verify signature
        const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
        const hash = crypto_1.default
            .createHash('sha512')
            .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
            .digest('hex');
        if (hash !== signature_key) {
            (0, response_1.sendError)(res, 403, 'Invalid signature');
            return;
        }
        // Find transaction by orderId
        const transaction = await database_1.default.donasiTransaction.findUnique({
            where: { orderId: order_id },
        });
        if (!transaction) {
            (0, response_1.sendError)(res, 404, 'Transaction not found');
            return;
        }
        // Determine new status based on Midtrans response
        let newStatus = 'PENDING';
        if (transaction_status === 'capture' || transaction_status === 'settlement') {
            if (fraud_status === 'accept' || !fraud_status) {
                newStatus = 'COMPLETED';
            }
            else {
                newStatus = 'FAILED';
            }
        }
        else if (transaction_status === 'cancel' ||
            transaction_status === 'deny' ||
            transaction_status === 'expire') {
            newStatus = 'FAILED';
        }
        else if (transaction_status === 'pending') {
            newStatus = 'PENDING';
        }
        const previousStatus = transaction.status;
        // Idempotency: if status is unchanged, acknowledge without further writes
        if (previousStatus === newStatus) {
            console.info('Midtrans webhook replay ignored (status unchanged)', { orderId: order_id, status: newStatus });
            (0, response_1.sendResponse)(res, 200, 'Notification processed (noop)');
            return;
        }
        // Update transaction
        await database_1.default.donasiTransaction.update({
            where: { orderId: order_id },
            data: {
                status: newStatus,
                paymentType: payment_type,
            },
        });
        // Update donasi currentAmount if status changed to COMPLETED
        if (newStatus === 'COMPLETED' && previousStatus !== 'COMPLETED') {
            await database_1.default.donasi.update({
                where: { id: transaction.donasiId },
                data: {
                    currentAmount: { increment: transaction.amount },
                },
            });
        }
        // Decrease if status changed from COMPLETED to something else
        if (previousStatus === 'COMPLETED' && newStatus !== 'COMPLETED') {
            await database_1.default.donasi.update({
                where: { id: transaction.donasiId },
                data: {
                    currentAmount: { decrement: transaction.amount },
                },
            });
        }
        console.info('Midtrans webhook processed', { orderId: order_id, from: previousStatus, to: newStatus });
        (0, response_1.sendResponse)(res, 200, 'Notification processed');
    }
    catch (error) {
        console.error('Midtrans webhook error:', error);
        (0, response_1.sendError)(res, 500, 'Failed to process notification');
    }
};
exports.handleMidtransNotification = handleMidtransNotification;
//# sourceMappingURL=webhook.controller.js.map