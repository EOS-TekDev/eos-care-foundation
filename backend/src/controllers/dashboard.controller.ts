import { Request, Response } from 'express';
import prisma from '../config/database';
import { sendResponse, sendError } from '../utils/response';

export const getStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalUsers,
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
