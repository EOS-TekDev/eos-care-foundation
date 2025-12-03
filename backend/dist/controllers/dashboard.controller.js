"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.getRecentActivity = exports.getHomeStats = void 0;
const database_1 = __importDefault(require("../config/database"));
const response_1 = require("../utils/response");
// Public endpoint for home page stats
const getHomeStats = async (_req, res) => {
    try {
        const [totalKegiatan, donationStats] = await Promise.all([
            database_1.default.kegiatan.count({ where: { isActive: true } }),
            database_1.default.donasiTransaction.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { amount: true },
                _count: true,
            }),
        ]);
        const familiesHelped = donationStats._count || 0;
        const totalFunds = Number(donationStats._sum.amount) || 0;
        (0, response_1.sendResponse)(res, 200, 'Home stats retrieved', {
            familiesHelped,
            totalKegiatan,
            totalFunds,
        });
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get home stats');
    }
};
exports.getHomeStats = getHomeStats;
const getRecentActivity = async (_req, res) => {
    try {
        const [recentBerita, recentDonations, recentKegiatan, recentUsers] = await Promise.all([
            database_1.default.berita.findMany({
                take: 3,
                orderBy: { createdAt: 'desc' },
                select: { id: true, title: true, isPublished: true, createdAt: true },
            }),
            database_1.default.donasiTransaction.findMany({
                take: 3,
                orderBy: { createdAt: 'desc' },
                where: { status: 'COMPLETED' },
                select: {
                    id: true,
                    donorName: true,
                    amount: true,
                    createdAt: true,
                    donasi: { select: { title: true } },
                },
            }),
            database_1.default.kegiatan.findMany({
                take: 3,
                orderBy: { updatedAt: 'desc' },
                select: { id: true, title: true, isActive: true, updatedAt: true },
            }),
            database_1.default.user.findMany({
                take: 3,
                orderBy: { createdAt: 'desc' },
                select: { id: true, email: true, name: true, createdAt: true },
            }),
        ]);
        const activities = [
            ...recentBerita.map(b => ({
                id: `berita-${b.id}`,
                type: 'berita',
                title: b.isPublished ? 'Berita dipublikasikan' : 'Berita baru dibuat',
                description: b.title,
                timestamp: b.createdAt,
            })),
            ...recentDonations.map(d => ({
                id: `donasi-${d.id}`,
                type: 'donasi',
                title: 'Donasi diterima',
                description: `Rp ${Number(d.amount).toLocaleString('id-ID')} dari ${d.donorName}`,
                meta: d.donasi.title,
                timestamp: d.createdAt,
            })),
            ...recentKegiatan.map(k => ({
                id: `kegiatan-${k.id}`,
                type: 'kegiatan',
                title: 'Kegiatan diperbarui',
                description: k.title,
                timestamp: k.updatedAt,
            })),
            ...recentUsers.map(u => ({
                id: `user-${u.id}`,
                type: 'user',
                title: 'User baru mendaftar',
                description: u.name || u.email,
                timestamp: u.createdAt,
            })),
        ];
        // Sort by timestamp descending and take top 10
        activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        const topActivities = activities.slice(0, 10);
        (0, response_1.sendResponse)(res, 200, 'Recent activity retrieved', topActivities);
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get recent activity');
    }
};
exports.getRecentActivity = getRecentActivity;
const getStats = async (_req, res) => {
    try {
        const [totalUsers, adminUsers, totalBerita, publishedBerita, totalKegiatan, activeKegiatan, totalDonasi, activeDonasi, donationStats, recentTransactions,] = await Promise.all([
            database_1.default.user.count(),
            database_1.default.user.count({ where: { role: 'ADMIN' } }),
            database_1.default.berita.count(),
            database_1.default.berita.count({ where: { isPublished: true } }),
            database_1.default.kegiatan.count(),
            database_1.default.kegiatan.count({ where: { isActive: true } }),
            database_1.default.donasi.count(),
            database_1.default.donasi.count({ where: { isActive: true } }),
            database_1.default.donasi.aggregate({
                _sum: { targetAmount: true, currentAmount: true },
            }),
            database_1.default.donasiTransaction.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    donasi: { select: { title: true } },
                },
            }),
        ]);
        (0, response_1.sendResponse)(res, 200, 'Dashboard stats retrieved', {
            users: {
                total: totalUsers,
                admins: adminUsers,
            },
            berita: {
                total: totalBerita,
                published: publishedBerita,
            },
            kegiatan: {
                total: totalKegiatan,
                active: activeKegiatan,
            },
            donasi: {
                total: totalDonasi,
                active: activeDonasi,
                targetAmount: donationStats._sum.targetAmount || 0,
                currentAmount: donationStats._sum.currentAmount || 0,
            },
            recentTransactions,
        });
    }
    catch {
        (0, response_1.sendError)(res, 500, 'Failed to get dashboard stats');
    }
};
exports.getStats = getStats;
//# sourceMappingURL=dashboard.controller.js.map