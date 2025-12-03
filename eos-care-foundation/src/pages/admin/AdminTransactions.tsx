import { useParams, Link } from 'react-router-dom';
import { useDonasiTransactions, useAdminDonasiDetail } from '../../hooks/useDonasi';
import { formatCurrency, formatDateTime, calculateProgress, cn } from '../../lib/utils';
import { DonationStatus } from '../../lib/types';

const statusConfig: Record<DonationStatus, { color: string; bg: string; label: string }> = {
  [DonationStatus.COMPLETED]: { color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Berhasil' },
  [DonationStatus.PENDING]: { color: 'text-amber-600', bg: 'bg-amber-50', label: 'Pending' },
  [DonationStatus.FAILED]: { color: 'text-red-600', bg: 'bg-red-50', label: 'Gagal' },
  [DonationStatus.EXPIRED]: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Kadaluarsa' },
};

const paymentMethodLabels: Record<string, string> = {
  bank_transfer: 'Transfer Bank',
  credit_card: 'Kartu Kredit',
  gopay: 'GoPay',
  shopeepay: 'ShopeePay',
  qris: 'QRIS',
  echannel: 'Mandiri Bill',
  bca_va: 'BCA VA',
  bni_va: 'BNI VA',
  bri_va: 'BRI VA',
  permata_va: 'Permata VA',
  cimb_va: 'CIMB VA',
};

export function AdminTransactions() {
  const { id } = useParams<{ id: string }>();
  const { data: donasi, isLoading: donasiLoading } = useAdminDonasiDetail(id!);
  const { data, isLoading } = useDonasiTransactions(id!);

  const completedTransactions = data?.data.filter(tx => tx.status === DonationStatus.COMPLETED) || [];
  const progress = donasi ? calculateProgress(donasi.currentAmount, donasi.targetAmount) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          to="/admin/donasi" 
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors w-fit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Kembali ke Donasi
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
            {donasiLoading ? 'Loading...' : donasi?.title || 'Transaksi'}
          </h1>
          <p className="text-text-secondary mt-1">Daftar transaksi donasi</p>
        </div>
      </div>

      {/* Donasi Info Card */}
      {donasi && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Progress Section */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-muted">Progress Donasi</span>
                <span className={cn(
                  "text-lg font-bold",
                  progress >= 100 ? "text-emerald-600" : progress >= 80 ? "text-amber-600" : "text-primary"
                )}>
                  {progress}%
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500 relative overflow-hidden",
                    progress >= 100 ? "bg-emerald-500" : progress >= 80 ? "bg-amber-500" : "bg-primary"
                  )}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-text-muted">Terkumpul: <span className="font-semibold text-text-primary">{formatCurrency(donasi.currentAmount)}</span></span>
                <span className="text-text-muted">Target: <span className="font-semibold text-text-primary">{formatCurrency(donasi.targetAmount)}</span></span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 lg:gap-6 lg:border-l lg:pl-6 border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{data?.data.length || 0}</p>
                <p className="text-xs text-text-muted">Total Transaksi</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">{completedTransactions.length}</p>
                <p className="text-xs text-text-muted">Berhasil</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">{data?.data.filter(tx => tx.status === DonationStatus.PENDING).length || 0}</p>
                <p className="text-xs text-text-muted">Pending</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {isLoading ? (
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                  </div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Donatur</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Jumlah</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Pesan</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Metode</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-text-muted uppercase tracking-wider">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.data.map((tx) => {
                  const status = statusConfig[tx.status];
                  const paymentMethod = tx.midtransPaymentType 
                    ? paymentMethodLabels[tx.midtransPaymentType] || tx.midtransPaymentType.replace(/_/g, ' ')
                    : null;
                  
                  return (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cta flex items-center justify-center text-white font-semibold text-sm">
                            {tx.donorName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-text-primary">{tx.donorName}</p>
                            <p className="text-sm text-text-muted truncate max-w-[200px]">
                              {tx.donorEmail || 'Email tidak tersedia'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-text-primary">
                          {formatCurrency(tx.amount)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {tx.message ? (
                          <p className="text-sm text-text-muted max-w-xs truncate" title={tx.message}>
                            "{tx.message}"
                          </p>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Tidak ada pesan</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          status.bg, status.color
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            tx.status === DonationStatus.COMPLETED && "bg-emerald-500",
                            tx.status === DonationStatus.PENDING && "bg-amber-500",
                            tx.status === DonationStatus.FAILED && "bg-red-500",
                            tx.status === DonationStatus.EXPIRED && "bg-gray-400"
                          )} />
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {paymentMethod ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-xs font-medium text-text-secondary">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                            </svg>
                            {paymentMethod}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-text-muted">
                        {formatDateTime(tx.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">Belum ada transaksi</h3>
            <p className="text-text-muted mb-6">Transaksi akan muncul ketika ada donatur yang berdonasi</p>
            <Link 
              to="/admin/donasi"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Kembali ke Donasi
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
