import { Link } from 'react-router-dom';
import { usePublicDonasi } from '../../hooks/useDonasi';
import { formatCurrency, calculateProgress, getImageUrl, getDaysRemaining } from '../../lib/utils';

export function DonasiListPage() {
  const { data, isLoading } = usePublicDonasi({ limit: 12 });

  if (isLoading) {
    return (
      <div className="section">
        <div className="container-wide">
          <h1 className="text-4xl font-display font-bold text-center mb-12">Program Donasi</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card">
                <div className="skeleton h-48 w-full rounded-xl mb-4"></div>
                <div className="skeleton h-6 w-3/4 mb-4"></div>
                <div className="skeleton h-2 w-full mb-2"></div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="text-4xl font-display font-bold text-center mb-4">Program Donasi</h1>
        <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
          Pilih program donasi yang ingin Anda dukung dan bantu kami mewujudkan harapan bagi mereka yang membutuhkan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((donasi) => {
            const progress = calculateProgress(donasi.currentAmount, donasi.targetAmount);
            const daysLeft = donasi.deadline ? getDaysRemaining(donasi.deadline) : null;

            return (
              <div key={donasi.id} className="card-interactive">
                {donasi.image && (
                  <img
                    src={getImageUrl(donasi.image)}
                    alt={donasi.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}
                <h3 className="text-lg font-display mb-4">{donasi.title}</h3>

                {/* Progress bar */}
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="flex justify-between text-sm mb-4">
                  <span className="text-text-primary font-medium">
                    {formatCurrency(donasi.currentAmount)}
                  </span>
                  <span className="text-text-muted">{progress}%</span>
                </div>

                <p className="text-text-muted text-sm mb-4">
                  Terkumpul dari target {formatCurrency(donasi.targetAmount)}
                </p>

                {daysLeft !== null && daysLeft > 0 && (
                  <p className="text-text-muted text-xs mb-4">
                    {daysLeft} hari tersisa
                  </p>
                )}

                <Link to={`/donasi/${donasi.id}`} className="btn-cta w-full">
                  Donasi Sekarang
                </Link>
              </div>
            );
          })}
        </div>

        {data?.data.length === 0 && (
          <p className="text-center text-text-muted">Belum ada program donasi aktif</p>
        )}
      </div>
    </div>
  );
}
