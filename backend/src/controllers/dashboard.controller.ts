import { Request, Response } from 'express';
import prisma from '../config/database';
import { sendResponse, sendError } from '../utils/response';

interface Activity {
  id: string;
  type: 'berita' | 'donasi' | 'kegiatan' | 'user';
  title: string;
  description: string;
  meta?: string;
  timestamp: Date;
}

// Public endpoint for home page stats
export const getHomeStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [totalKegiatan, donationStats] = await Promise.all([
      prisma.kegiatan.count({ where: { isActive: true } }),
      prisma.donasiTransaction.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
        _count: true,
      }),
    ]);

    const familiesHelped = donationStats._count || 0;
    const totalFunds = Number(donationStats._sum.amount) || 0;

    sendResponse(res, 200, 'Home stats retrieved', {
      familiesHelped,
      totalKegiatan,
      totalFunds,
    });
  } catch {
    sendError(res, 500, 'Failed to get home stats');
  }
};

export const getRecentActivity = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [recentBerita, recentDonations, recentKegiatan, recentUsers] = await Promise.all([
      prisma.berita.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, isPublished: true, createdAt: true },
      }),
      prisma.donasiTransaction.findMany({
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
      prisma.kegiatan.findMany({
        take: 3,
        orderBy: { updatedAt: 'desc' },
        select: { id: true, title: true, isActive: true, updatedAt: true },
      }),
      prisma.user.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: { id: true, email: true, name: true, createdAt: true },
      }),
    ]);

    const activities: Activity[] = [
      ...recentBerita.map(b => ({
        id: `berita-${b.id}`,
        type: 'berita' as const,
        title: b.isPublished ? 'Berita dipublikasikan' : 'Berita baru dibuat',
        description: b.title,
        timestamp: b.createdAt,
      })),
      ...recentDonations.map(d => ({
        id: `donasi-${d.id}`,
        type: 'donasi' as const,
        title: 'Donasi diterima',
        description: `Rp ${Number(d.amount).toLocaleString('id-ID')} dari ${d.donorName}`,
        meta: d.donasi.title,
        timestamp: d.createdAt,
      })),
      ...recentKegiatan.map(k => ({
        id: `kegiatan-${k.id}`,
        type: 'kegiatan' as const,
        title: 'Kegiatan diperbarui',
        description: k.title,
        timestamp: k.updatedAt,
      })),
      ...recentUsers.map(u => ({
        id: `user-${u.id}`,
        type: 'user' as const,
        title: 'User baru mendaftar',
        description: u.name || u.email,
        timestamp: u.createdAt,
      })),
    ];

    // Sort by timestamp descending and take top 10
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    const topActivities = activities.slice(0, 10);

    sendResponse(res, 200, 'Recent activity retrieved', topActivities);
  } catch {
    sendError(res, 500, 'Failed to get recent activity');
  }
};

export const getStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalUsers,
      adminUsers,
      totalBerita,
      publishedBerita,
      totalKegiatan,
      activeKegiatan,
      totalDonasi,
      activeDonasi,
      donationStats,
      recentTransactions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.berita.count(),
      prisma.berita.count({ where: { isPublished: true } }),
      prisma.kegiatan.count(),
      prisma.kegiatan.count({ where: { isActive: true } }),
      prisma.donasi.count(),
      prisma.donasi.count({ where: { isActive: true } }),
      prisma.donasi.aggregate({
        _sum: { targetAmount: true, currentAmount: true },
      }),
      prisma.donasiTransaction.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          donasi: { select: { title: true } },
        },
      }),
    ]);

    sendResponse(res, 200, 'Dashboard stats retrieved', {
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
  } catch {
    sendError(res, 500, 'Failed to get dashboard stats');
  }
};
