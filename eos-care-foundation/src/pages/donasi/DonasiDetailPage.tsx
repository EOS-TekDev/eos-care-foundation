import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePublicDonasiDetail, useCreateDonation } from '../../hooks/useDonasi';
import { formatCurrency, calculateProgress, getImageUrl, getDaysRemaining } from '../../lib/utils';
import { showToast } from '../../hooks/useToast';

const donateSchema = z.object({
  donorName: z.string().min(2, 'Nama minimal 2 karakter'),
  donorEmail: z.string().email('Email tidak valid').optional().or(z.literal('')),
  amount: z.number().min(10000, 'Minimal donasi Rp 10.000'),
  message: z.string().optional(),
});

type DonateFormData = z.infer<typeof donateSchema>;

const quickAmounts = [50000, 100000, 250000, 500000, 1000000];

export function DonasiDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: donasi, isLoading } = usePublicDonasiDetail(id!);
  const createDonation = useCreateDonation(id!);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonateFormData>({
    resolver: zodResolver(donateSchema),
    defaultValues: {
      amount: 100000,
    },
  });

  const currentAmount = watch('amount');

  const onSubmit = async (data: DonateFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createDonation.mutateAsync({
        donorName: data.donorName,
        donorEmail: data.donorEmail || undefined,
        amount: data.amount,
        message: data.message,
      });

      // Open Midtrans Snap
      if (result?.snapToken && window.snap) {
        window.snap.pay(result.snapToken, {
          onSuccess: () => {
            showToast.success('Pembayaran berhasil! Terima kasih atas donasi Anda.');
            window.location.reload();
          },
          onPending: () => {
            showToast.info('Pembayaran pending. Silakan selesaikan pembayaran Anda.');
          },
          onError: () => {
            showToast.error('Pembayaran gagal. Silakan coba lagi.');
          },
          onClose: () => {
            console.log('Payment popup closed');
          },
        });
      }
    } catch {
      showToast.error('Gagal membuat transaksi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="skeleton h-64 w-full rounded-xl mb-8"></div>
              <div className="skeleton h-8 w-3/4 mb-4"></div>
              <div className="skeleton h-4 w-full mb-2"></div>
              <div className="skeleton h-4 w-full mb-2"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
            <div className="card">
              <div className="skeleton h-8 w-1/2 mb-6"></div>
              <div className="skeleton h-12 w-full mb-4"></div>
              <div className="skeleton h-12 w-full mb-4"></div>
              <div className="skeleton h-12 w-full mb-4"></div>
              <div className="skeleton h-12 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!donasi) {
    return (
      <div className="section">
        <div className="container-narrow text-center">
          <h1 className="text-2xl font-display mb-4">Program donasi tidak ditemukan</h1>
          <Link to="/donasi" className="btn-primary">
            Kembali ke Donasi
          </Link>
        </div>
      </div>
    );
  }

  const progress = calculateProgress(donasi.currentAmount, donasi.targetAmount);
  const daysLeft = donasi.deadline ? getDaysRemaining(donasi.deadline) : null;

  return (
    <div className="section">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Info */}
          <div>
            {donasi.image && (
              <img
                src={getImageUrl(donasi.image)}
                alt={donasi.title}
                className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
              />
            )}

            <h1 className="text-3xl font-display font-bold mb-6">{donasi.title}</h1>

            {/* Progress card */}
            <div className="card mb-6">
              <div className="progress-bar h-3 mb-3">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-2xl font-display text-primary">
                    {formatCurrency(donasi.currentAmount)}
                  </p>
                  <p className="text-text-muted text-sm">
                    dari target {formatCurrency(donasi.targetAmount)}
                  </p>
                </div>
                <p className="text-xl font-semibold text-primary">{progress}%</p>
              </div>
              <div className="flex gap-4 text-sm text-text-muted">
                {donasi._count && (
                  <span>{donasi._count.transactions} donatur</span>
                )}
                {daysLeft !== null && daysLeft > 0 && (
                  <span>{daysLeft} hari tersisa</span>
                )}
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-text-secondary whitespace-pre-wrap">
              {donasi.description}
            </div>

            <div className="mt-6">
              <Link to="/donasi" className="text-primary hover:text-primary-hover">
                &larr; Kembali ke Donasi
              </Link>
            </div>
          </div>

          {/* Right: Donate form */}
          <div>
            <div className="card-solid sticky top-24">
              <h2 className="text-xl font-display mb-6">Donasi Sekarang</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Quick amounts */}
                <div>
                  <label className="label">Pilih Nominal</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setValue('amount', amount)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          currentAmount === amount
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                        }`}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                    placeholder="Atau masukkan nominal lain"
                    className={`input ${errors.amount ? 'input-error' : ''}`}
                  />
                  {errors.amount && (
                    <p className="text-status-urgent text-sm mt-1">{errors.amount.message}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="label">Nama Donatur *</label>
                  <input
                    type="text"
                    {...register('donorName')}
                    placeholder="Nama Anda"
                    className={`input ${errors.donorName ? 'input-error' : ''}`}
                  />
                  {errors.donorName && (
                    <p className="text-status-urgent text-sm mt-1">{errors.donorName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="label">Email (opsional)</label>
                  <input
                    type="email"
                    {...register('donorEmail')}
                    placeholder="email@example.com"
                    className={`input ${errors.donorEmail ? 'input-error' : ''}`}
                  />
                  {errors.donorEmail && (
                    <p className="text-status-urgent text-sm mt-1">{errors.donorEmail.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="label">Pesan / Doa (opsional)</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Tulis pesan atau doa Anda..."
                    className="input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cta w-full disabled:opacity-50"
                >
                  {isSubmitting ? 'Memproses...' : `Donasi ${formatCurrency(currentAmount || 0)}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for Midtrans
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: () => void;
          onPending?: () => void;
          onError?: () => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}
