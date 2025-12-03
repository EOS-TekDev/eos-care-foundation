import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDashboardStats, useRecentActivity } from '../../hooks/useDashboard';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency, cn } from '../../lib/utils';
import { StatCard, DonutChart, ActivityFeed } from '../../components/admin';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat pagi';
  if (hour < 17) return 'Selamat siang';
  if (hour < 19) return 'Selamat sore';
  return 'Selamat malam';
}

export function AdminDashboard() {
  const { data: stats, isLoading } = useDashboardStats();
  const { data: activityData, isLoading: activitiesLoading } = useRecentActivity();
  const { user } = useAuth();

  const donationProgress = stats?.donasi
    ? Math.round((stats.donasi.totalCollected / stats.donasi.totalTarget) * 100)
    : 0;

  // Convert API activities to include Date objects
  const activities = useMemo(() => {
    if (!activityData) return [];
    return activityData.map(a => ({
      ...a,
      timestamp: new Date(a.timestamp),
    }));
  }, [activityData]);

  return (
    <div className="space-y-8">
      {/* Header with greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-forest mb-1 animate-fade-up dark:text-white" style={{ animationDelay: '0ms' }}>
            {getGreeting()}, {user?.name?.split(' ')[0]}!
          </p>
          <h1 
            className="text-2xl sm:text-3xl font-display font-bold text-ink animate-fade-up dark:text-white" 
            style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}
          >
            Ringkasan <span className="font-accent italic text-forest dark:text-white">Hari Ini</span>
          </h1>
        </div>
        <p 
          className="text-sm text-text-muted animate-fade-up dark:text-gray-400" 
          style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
        >
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="Total Users"
          value={isLoading ? '-' : stats?.users.total || 0}
          subtext={`${stats?.users.admins || 0} admin`}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
          color="ocean"
          delay={150}
        />
        <StatCard
          label="Berita"
          value={isLoading ? '-' : stats?.berita.total || 0}
          subtext={`${stats?.berita.published || 0} dipublikasi`}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
          }
          color="forest"
          link="/admin/berita"
          delay={200}
        />
        <StatCard
          label="Kegiatan"
          value={isLoading ? '-' : stats?.kegiatan.total || 0}
          subtext={`${stats?.kegiatan.active || 0} aktif`}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          }
          color="terracotta"
          link="/admin/kegiatan"
          delay={250}
        />
        <StatCard
          label="Program Donasi"
          value={isLoading ? '-' : stats?.donasi.total || 0}
          subtext={`${stats?.donasi.active || 0} aktif`}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          }
          color="sunset"
          link="/admin/donasi"
          delay={300}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donation progress card - spans 2 columns */}
        <div 
          className={cn(
            "lg:col-span-2 bg-white rounded-2xl border border-warm-100 p-6 shadow-soft dark:bg-white/10 dark:border-white/10",
            "opacity-0 animate-fade-up"
          )}
          style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-display font-semibold text-ink dark:text-white">Progress Donasi</h2>
                  <p className="text-sm text-text-muted dark:text-gray-400">Total semua program aktif</p>
                </div>
                <Link 
                  to="/admin/donasi" 
                  className="text-sm font-medium text-forest hover:text-forest-dark transition-colors hidden sm:block"
                >
                  Lihat semua →
                </Link>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-2 bg-warm-100 rounded-full animate-pulse" />
                  <div className="flex justify-between">
                    <div className="h-6 w-32 bg-warm-100 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-warm-100 rounded animate-pulse" />
                  </div>
                </div>
              ) : stats?.donasi ? (
                <>
                  {/* Progress bar */}
                  <div className="relative h-3 bg-warm-100 rounded-full overflow-hidden mb-4">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-forest to-ocean rounded-full"
                      style={{ width: `${Math.min(donationProgress, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                    {/* Milestone markers */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1 h-1 bg-white/50 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-1 h-1 bg-white/50 rounded-full" />
                    <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-1 h-1 bg-white/50 rounded-full" />
                  </div>

                  {/* Stats row */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-white">
                        {formatCurrency(stats.donasi.totalCollected)}
                      </p>
                      <p className="text-sm text-text-muted dark:text-gray-400">Terkumpul</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-text-secondary dark:text-gray-300">
                        {formatCurrency(stats.donasi.totalTarget)}
                      </p>
                      <p className="text-sm text-text-muted dark:text-gray-400">Target</p>
                    </div>
                  </div>

                  {/* Mobile link */}
                  <Link 
                    to="/admin/donasi" 
                    className="text-sm font-medium text-forest hover:text-forest-dark transition-colors mt-4 inline-block sm:hidden"
                  >
                    Lihat semua →
                  </Link>
                </>
              ) : (
                <p className="text-text-muted text-center py-8">Tidak ada data donasi</p>
              )}
            </div>

            {/* Donut chart */}
            {stats?.donasi && stats.donasi.totalTarget > 0 && (
              <div className="flex-shrink-0 flex justify-center">
                <DonutChart
                  value={stats.donasi.totalCollected}
                  max={stats.donasi.totalTarget}
                  color="forest"
                  label="tercapai"
                />
              </div>
            )}
          </div>
        </div>

        {/* Quick actions card */}
        <div 
          className={cn(
            "bg-white rounded-2xl p-6 shadow-lifted border border-gray-100 dark:bg-white/10 dark:border-white/10",
            "opacity-0 animate-fade-up"
          )}
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">Aksi Cepat</h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 dark:text-gray-400">Kelola konten dengan mudah</p>
          
          <div className="space-y-2">
            {[
              { to: '/admin/berita', label: 'Tambah Berita', icon: 'M12 4.5v15m7.5-7.5h-15' },
              { to: '/admin/kegiatan', label: 'Tambah Kegiatan', icon: 'M12 4.5v15m7.5-7.5h-15' },
              { to: '/admin/donasi', label: 'Buat Program Donasi', icon: 'M12 4.5v15m7.5-7.5h-15' },
            ].map((action, i) => (
              <Link
                key={action.to}
                to={action.to}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 shadow-sm dark:bg-white/5 dark:hover:bg-white/10",
                  "hover:translate-x-1 group"
                )}
                style={{ animationDelay: `${450 + i * 50}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center dark:bg-white/10">
                  <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                  </svg>
                </div>
                <span className="text-sm font-medium flex-1 text-gray-900 dark:text-white">{action.label}</span>
                <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div 
        className={cn(
          "bg-white rounded-2xl border border-warm-100 p-6 shadow-soft dark:bg-white/10 dark:border-white/10",
          "opacity-0 animate-fade-up"
        )}
        style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-semibold text-ink dark:text-white">Aktivitas Terbaru</h2>
            <p className="text-sm text-text-muted dark:text-gray-400">Update terkini dari platform</p>
          </div>
        </div>
        
        {activitiesLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start gap-3 animate-pulse">
                <div className="w-8 h-8 bg-warm-100 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-warm-100 rounded w-1/3" />
                  <div className="h-3 bg-warm-100 rounded w-2/3" />
                </div>
                <div className="h-3 bg-warm-100 rounded w-16" />
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <p className="text-center text-text-muted py-8">Belum ada aktivitas</p>
        ) : (
          <ActivityFeed activities={activities} />
        )}
      </div>

      {/* Tips section */}
      <div 
        className={cn(
          "bg-warm-50 rounded-2xl p-6 dark:bg-white/5",
          "opacity-0 animate-fade-up"
        )}
        style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}
      >
        <h2 className="text-lg font-display font-semibold text-ink mb-4 dark:text-white">Tips Pengelolaan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Perbarui Berita', desc: 'Publikasikan berita minimal seminggu sekali', color: 'ocean' },
            { title: 'Monitor Donasi', desc: 'Pantau transaksi dan progress secara berkala', color: 'forest' },
            { title: 'Update Kegiatan', desc: 'Pastikan jadwal kegiatan selalu up-to-date', color: 'terracotta' },
          ].map((tip, i) => (
            <div 
              key={tip.title} 
              className="bg-white rounded-xl p-4 border border-warm-100 dark:bg-white/10 dark:border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
                  tip.color === 'ocean' && "bg-ocean",
                  tip.color === 'forest' && "bg-forest",
                  tip.color === 'terracotta' && "bg-terracotta"
                )}>
                  {i + 1}
                </div>
                <h3 className="font-medium text-ink text-sm dark:text-white">{tip.title}</h3>
              </div>
              <p className="text-xs text-text-muted dark:text-gray-400">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
