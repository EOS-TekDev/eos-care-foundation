import { Request, Response } from 'express';
import prisma from '../config/database';
import { createCrudHandlers, getFilteredList } from '../services/crud.factory';
import { sendResponse, sendError } from '../utils/response';
import { getPagination, getMeta } from '../services/base.service';
import { snap } from '../config/midtrans';
import {
  createDonasiSchema,
  updateDonasiSchema,
  createTransactionSchema,
} from '../validators/donasi.validator';
import { PaginationQuery } from '../types';

const donasiInclude = {
  _count: { select: { transactions: true } },
};

// Transform deadline string to Date object
const transformDeadline = (data: any) => {
  if ('deadline' in data && data.deadline) {
    return { deadline: new Date(data.deadline) };
  }
  return {};
};

const crud = createCrudHandlers({
  model: 'donasi',
  resourceName: 'Donasi',
  createSchema: createDonasiSchema,
  updateSchema: updateDonasiSchema,
  include: donasiInclude,
  supportsImage: true,
  beforeCreate: transformDeadline,
  beforeUpdate: transformDeadline,
});

export const { getAll, create, update, remove } = crud;

// Custom getById with transaction stats
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = await prisma.donasi.findUnique({
      where: { id },
      include: {
        _count: { select: { transactions: true } },
      },
    });

    if (!data) {
      sendError(res, 404, 'Donasi not found');
      return;
    }

    sendResponse(res, 200, 'Donasi retrieved', data);
  } catch {
    sendError(res, 500, 'Failed to get donasi');
  }
};

// Public: Active donations only
export const getActive = async (req: Request, res: Response): Promise<void> => {
  await getFilteredList(
    'donasi',
    { isActive: true },
    req,
    res,
    'Donasi',
    { createdAt: 'desc' },
    donasiInclude
  );
};

// Dropdown list for admin forms (id + title only)
export const getActiveList = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await prisma.donasi.findMany({
      where: { isActive: true },
      select: { id: true, title: true },
      orderBy: { title: 'asc' },
    });

    sendResponse(res, 200, 'Donasi list retrieved', data);
  } catch {
    sendError(res, 500, 'Failed to get donasi list');
  }
};

// Create donation transaction with Midtrans Snap
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const donasiId = parseInt(req.params.id, 10);
    const input = createTransactionSchema.parse(req.body);

    const donasi = await prisma.donasi.findUnique({ where: { id: donasiId } });
    if (!donasi) {
      sendError(res, 404, 'Donasi not found');
      return;
    }

    if (!donasi.isActive) {
      sendError(res, 400, 'This donation program is no longer active');
      return;
    }

    // Generate unique order ID
    const orderId = `DON-${donasiId}-${Date.now()}`;

    // Create transaction in database
    const transaction = await prisma.donasiTransaction.create({
      data: {
        donasiId,
        donorName: input.donorName,
        donorEmail: input.donorEmail,
        amount: input.amount,
        message: input.message,
        orderId,
      },
    });

    // Create Midtrans Snap transaction
    const snapTransaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(input.amount),
      },
      customer_details: {
        first_name: input.donorName,
        email: input.donorEmail || undefined,
      },
      item_details: [
        {
          id: `donasi-${donasiId}`,
          price: Number(input.amount),
          quantity: 1,
          name: donasi.title.substring(0, 50),
        },
      ],
    });

    // Update transaction with snap token
    await prisma.donasiTransaction.update({
      where: { id: transaction.id },
      data: { snapToken: snapTransaction.token },
    });

    sendResponse(res, 201, 'Donation transaction created', {
      transaction,
      snapToken: snapTransaction.token,
      redirectUrl: snapTransaction.redirect_url,
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    if (error instanceof Error) {
      sendError(res, 400, error.message);
      return;
    }
    sendError(res, 500, 'Failed to create donation transaction');
  }
};

// Admin: Get transactions for a donation
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const donasiId = parseInt(req.params.id, 10);
    const { page, limit, skip } = getPagination(req.query as PaginationQuery);

    const [data, total] = await Promise.all([
      prisma.donasiTransaction.findMany({
        where: { donasiId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.donasiTransaction.count({ where: { donasiId } }),
    ]);

    sendResponse(res, 200, 'Transactions retrieved', data, getMeta(total, page, limit));
  } catch {
    sendError(res, 500, 'Failed to get transactions');
  }
};


