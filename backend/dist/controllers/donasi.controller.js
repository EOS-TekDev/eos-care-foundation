"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.createTransaction = exports.getActiveList = exports.getActive = exports.getById = exports.remove = exports.update = exports.create = exports.getAll = void 0;
const database_1 = __importDefault(require("../config/database"));
const crud_factory_1 = require("../services/crud.factory");
const response_1 = require("../utils/response");
const base_service_1 = require("../services/base.service");
const midtrans_1 = require("../config/midtrans");
const donasi_validator_1 = require("../validators/donasi.validator");
const donasiInclude = {
    _count: { select: { transactions: true } },
};
// Transform deadline string to Date object
const transformDeadline = (data) => {
    if ('deadline' in data && data.deadline) {
        return { deadline: new Date(data.deadline) };
    }
    return {};
};
const crud = (0, crud_factory_1.createCrudHandlers)({
    model: 'donasi',
    resourceName: 'Donasi',
    createSchema: donasi_validator_1.createDonasiSchema,
    updateSchema: donasi_validator_1.updateDonasiSchema,
    include: donasiInclude,
    supportsImage: true,
    beforeCreate: transformDeadline,
    beforeUpdate: transformDeadline,
});
exports.getAll = crud.getAll, exports.create = crud.create, exports.update = crud.update, exports.remove = crud.remove;
// Custom getById with transaction stats
const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const data = await database_1.default.donasi.findUnique({
            where: { id },
            include: {
                _count: { select: { transactions: true } },
            },
        });
        if (!data) {
            (0, response_1.sendError)(res, 404, 'Donasi not found');
            return;
        }
        (0, response_1.sendResponse)(res, 200, 'Donasi retrieved', data);
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get donasi');
    }
};
exports.getById = getById;
// Public: Active donations only
const getActive = async (req, res) => {
    await (0, crud_factory_1.getFilteredList)('donasi', { isActive: true }, req, res, 'Donasi', { createdAt: 'desc' }, donasiInclude);
};
exports.getActive = getActive;
// Dropdown list for admin forms (id + title only)
const getActiveList = async (_req, res) => {
    try {
        const data = await database_1.default.donasi.findMany({
            where: { isActive: true },
            select: { id: true, title: true },
            orderBy: { title: 'asc' },
        });
        (0, response_1.sendResponse)(res, 200, 'Donasi list retrieved', data);
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get donasi list');
    }
};
exports.getActiveList = getActiveList;
// Create donation transaction with Midtrans Snap
const createTransaction = async (req, res) => {
    try {
        const donasiId = parseInt(req.params.id, 10);
        const input = donasi_validator_1.createTransactionSchema.parse(req.body);
        const donasi = await database_1.default.donasi.findUnique({ where: { id: donasiId } });
        if (!donasi) {
            (0, response_1.sendError)(res, 404, 'Donasi not found');
            return;
        }
        if (!donasi.isActive) {
            (0, response_1.sendError)(res, 400, 'This donation program is no longer active');
            return;
        }
        // Generate unique order ID
        const orderId = `DON-${donasiId}-${Date.now()}`;
        // Create transaction in database
        const transaction = await database_1.default.donasiTransaction.create({
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
        const snapTransaction = await midtrans_1.snap.createTransaction({
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
        await database_1.default.donasiTransaction.update({
            where: { id: transaction.id },
            data: { snapToken: snapTransaction.token },
        });
        (0, response_1.sendResponse)(res, 201, 'Donation transaction created', {
            transaction,
            snapToken: snapTransaction.token,
            redirectUrl: snapTransaction.redirect_url,
        });
    }
    catch (error) {
        console.error('Create transaction error:', error);
        if (error instanceof Error) {
            (0, response_1.sendError)(res, 400, error.message);
            return;
        }
        (0, response_1.sendError)(res, 500, 'Failed to create donation transaction');
    }
};
exports.createTransaction = createTransaction;
// Admin: Get transactions for a donation
const getTransactions = async (req, res) => {
    try {
        const donasiId = parseInt(req.params.id, 10);
        const { page, limit, skip } = (0, base_service_1.getPagination)(req.query);
        const [data, total] = await Promise.all([
            database_1.default.donasiTransaction.findMany({
                where: { donasiId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            database_1.default.donasiTransaction.count({ where: { donasiId } }),
        ]);
        (0, response_1.sendResponse)(res, 200, 'Transactions retrieved', data, (0, base_service_1.getMeta)(total, page, limit));
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get transactions');
    }
};
exports.getTransactions = getTransactions;
//# sourceMappingURL=donasi.controller.js.map