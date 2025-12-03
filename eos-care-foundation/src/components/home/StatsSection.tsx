import { useMemo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import { cn } from '../../lib/utils';

function StatNumber({ value, suffix = '', enabled }: { value: number; suffix?: string; enabled: boolean }) {
  const count = useCountUp({ end: value, duration: 2500, enabled });
  return <>{count.toLocaleString('id-ID')}{suffix}</>;
}

interface HomeStats {
  familiesHelped?: number;
  totalKegiatan?: number;
  totalFunds?: number;
}

interface StatsSectionProps {
  stats?: HomeStats;
  isLoading?: boolean;
}

export function StatsSection({ stats, isLoading }: StatsSectionProps) {
  const statsReveal = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  const fundsInMillions = useMemo(() => {
    if (!stats?.totalFunds) return 0;
    return Math.round(stats.totalFunds / 1_000_000);
  }, [stats?.totalFunds]);

  const statsData = useMemo(() => [
    { 
      num: 1, 
      value: stats?.familiesHelped || 0, 
      suffix: '+', 
      label: 'Keluarga Terbantu', 
      desc: 'Mendapatkan bantuan langsung dari program-program kami' 
    },
    { 
      num: 2, 
      value: stats?.totalKegiatan || 0, 
      suffix: '+', 
      label: 'Kegiatan Sosial', 
      desc: 'Diselenggarakan sepanjang tahun di berbagai daerah' 
    },
    { 
      num: 3, 
      value: fundsInMillions, 
      suffix: 'Jt+', 
      label: 'Dana Tersalur', 
      desc: 'Disalurkan secara transparan kepada yang membutuhkan', 
      prefix: 'Rp ' 
    },
  ], [stats, fundsInMillions]);

  return (
    <section 
      ref={statsReveal.setRef}
      className="py-24 relative"
    >
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div 
            className={cn(
              "mb-16",
              "opacity-0 -translate-x-8 transition-all duration-700",
              statsReveal.isVisible && "opacity-100 translate-x-0"
            )}
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Dampak Kami</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2">
              Angka yang <span className="font-accent italic">Berbicara</span>
            </h2>
          </div>

          {/* Stats list */}
          <div className="space-y-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-6 p-6 animate-pulse">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-10 w-32 bg-gray-200 rounded" />
                    <div className="h-6 w-48 bg-gray-200 rounded" />
                    <div className="h-4 w-64 bg-gray-200 rounded" />
                  </div>
                </div>
              ))
            ) : statsData.map((stat, i) => (
              <div 
                key={stat.num}
                className={cn(
                  "group flex items-start gap-6 p-6 rounded-2xl transition-all duration-500",
                  "opacity-0 translate-y-8",
                  "hover:bg-white/50 hover:backdrop-blur-sm hover:shadow-soft",
                  statsReveal.isVisible && "opacity-100 translate-y-0"
                )}
                style={{ transitionDelay: statsReveal.isVisible ? `${i * 150}ms` : '0ms' }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-display font-bold text-primary">0{stat.num}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl sm:text-5xl font-accent text-primary tabular-nums">
                      {stat.prefix}
                      <StatNumber value={stat.value} suffix={stat.suffix} enabled={statsReveal.isVisible} />
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-text-primary mb-1">{stat.label}</h3>
                  <p className="text-text-secondary">{stat.desc}</p>
                </div>

                <svg 
                  className="w-6 h-6 text-text-muted opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
