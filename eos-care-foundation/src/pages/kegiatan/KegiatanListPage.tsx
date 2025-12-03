import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePublicKegiatan } from '../../hooks/useKegiatan';
import { formatDate, getImageUrl, cn } from '../../lib/utils';
import { KegiatanCategory } from '../../lib/types';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const categories = [
  { value: undefined, label: 'Semua', icon: '✦', color: 'gray', gradient: 'from-gray-500 to-gray-600' },
  { value: KegiatanCategory.SOSIAL, label: 'Sosial', icon: '', color: 'rose', gradient: 'from-rose-500 to-pink-500' },
  { value: KegiatanCategory.PENDIDIKAN, label: 'Pendidikan', icon: '', color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
  { value: KegiatanCategory.PELATIHAN, label: 'Pelatihan', icon: '', color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
];

const categoryStyles: Record<string, { 
  border: string; 
  bg: string; 
  text: string; 
  accent: string;
  light: string;
  gradient: string;
}> = {
  SOSIAL: { 
    border: 'border-l-rose-500', 
    bg: 'bg-rose-50', 
    text: 'text-rose-600', 
    accent: 'bg-rose-500',
    light: 'bg-rose-100',
    gradient: 'from-rose-500 to-pink-500'
  },
  PENDIDIKAN: { 
    border: 'border-l-blue-500', 
    bg: 'bg-blue-50', 
    text: 'text-blue-600', 
    accent: 'bg-blue-500',
    light: 'bg-blue-100',
    gradient: 'from-blue-500 to-indigo-500'
  },
  PELATIHAN: { 
    border: 'border-l-emerald-500', 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-600', 
    accent: 'bg-emerald-500',
    light: 'bg-emerald-100',
    gradient: 'from-emerald-500 to-teal-500'
  },
};

interface ActivityCardProps {
  kegiatan: {
    id: string;
    title: string;
    description: string;
    image?: string;
    date: string;
    category: string;
  };
  index: number;
}

function ActivityCard({ kegiatan, index }: ActivityCardProps) {
  const { setRef: ref, isVisible } = useScrollReveal<HTMLAnchorElement>();
  const styles = categoryStyles[kegiatan.category] || categoryStyles.SOSIAL;

  return (
    <Link
      ref={ref}
      to={`/kegiatan/${kegiatan.id}`}
      className={cn(
        "group relative rounded-xl overflow-hidden h-48 shadow-soft hover:shadow-medium",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      
      {/* Full-bleed image */}
      {kegiatan.image ? (
        <img
          src={getImageUrl(kegiatan.image)}
          alt={kegiatan.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={cn("w-full h-full bg-gradient-to-br", styles.gradient, "opacity-40")} />
      )}
      
      {/* Category badge */}
      <span className={cn(
        "absolute top-2 left-2 z-20 px-2 py-0.5 text-white text-[10px] font-medium rounded",
        styles.accent
      )}>
        {kegiatan.category}
      </span>
      
      {/* Text overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        <h3 className="text-sm font-display font-semibold text-white mb-1 group-hover:text-primary-light transition-colors line-clamp-2">
          {kegiatan.title}
        </h3>
        <div className="flex items-center gap-2 text-white/60 text-xs">
          <span>{formatDate(kegiatan.date)}</span>
        </div>
      </div>
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="skeleton h-48 w-full rounded-xl" />
      ))}
    </div>
  );
}

function EmptyState({ category, onReset }: { category?: KegiatanCategory; onReset: () => void }) {
  const categoryLabel = categories.find(c => c.value === category)?.label;
  
  return (
    <div className="text-center py-20">
      {/* Illustrated empty state */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full" />
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        {/* Floating elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-100 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-blue-100 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
      </div>

      <h3 className="text-2xl font-display font-bold mb-3 text-text-primary">
        {category ? 'Tidak Ada Kegiatan' : 'Belum Ada Kegiatan'}
      </h3>
      <p className="text-text-muted mb-6 max-w-md mx-auto">
        {category 
          ? `Saat ini belum ada kegiatan dalam kategori "${categoryLabel}". Coba lihat kategori lainnya!`
          : 'Kegiatan akan segera hadir. Pantau terus untuk update terbaru!'}
      </p>
      
      {category && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Lihat Semua Kegiatan
        </button>
      )}
    </div>
  );
}

export function KegiatanListPage() {
  const [category, setCategory] = useState<KegiatanCategory | undefined>();
  const { data, isLoading } = usePublicKegiatan({ category, limit: 12 });
  const heroReveal = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const activities = data?.data || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Asymmetric Layout */}
      <section 
        ref={heroReveal.setRef}
        className="relative py-12 lg:py-20 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/50 to-teal-50/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-100/40 to-indigo-50/20 rounded-full blur-3xl -z-10" />

        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left - Floating photos visual */}
            <div 
              className={cn(
                "lg:col-span-5 relative hidden lg:block h-[400px]",
                "transition-all duration-1000",
                heroReveal.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              )}
            >
              {/* Stacked photo effect */}
              <div className="absolute top-8 left-8 w-48 h-56 bg-gradient-to-br from-rose-200 to-rose-100 rounded-2xl rotate-6 shadow-soft" />
              <div className="absolute top-4 left-4 w-48 h-56 bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl rotate-3 shadow-medium" />
              <div className="absolute top-0 left-0 w-48 h-56 bg-white rounded-2xl shadow-strong overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                  <span className="text-5xl">🤝</span>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute bottom-8 right-0 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-medium">
                <p className="text-xs text-text-muted mb-1">Total Kegiatan</p>
                <p className="text-2xl font-display font-bold text-emerald-600">{activities.length}+</p>
              </div>
            </div>

            {/* Right - Title & Filter */}
            <div className="lg:col-span-7 space-y-8">
              {/* Eyebrow */}
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100",
                  "transition-all duration-700",
                  heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Program Kegiatan</span>
              </div>

              {/* Title with typography play */}
              <h1 
                className={cn(
                  "text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1]",
                  "transition-all duration-700 delay-100",
                  heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <span className="text-text-primary">Kegiatan</span>
                <br />
                <span className="relative">
                  <span className="font-accent italic text-emerald-600">Sosial</span>
                  {/* Animated underline */}
                  <svg 
                    className={cn(
                      "absolute -bottom-2 left-0 w-full h-3 text-emerald-300 transition-all duration-1000 delay-500",
                      heroReveal.isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    )}
                    style={{ transformOrigin: 'left' }}
                    viewBox="0 0 200 12" 
                    preserveAspectRatio="none"
                  >
                    <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="text-text-primary"> Kami</span>
              </h1>

              {/* Subtitle */}
              <p 
                className={cn(
                  "text-lg text-text-secondary max-w-xl leading-relaxed",
                  "transition-all duration-700 delay-200",
                  heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                Berbagai program kegiatan yang kami jalankan untuk 
                <span className="font-semibold text-text-primary"> membawa perubahan positif </span>
                bagi masyarakat.
              </p>

              {/* Category Filter - Tab style */}
              <div 
                className={cn(
                  "flex flex-wrap gap-2 transition-all duration-700 delay-300",
                  heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                {categories.map((cat) => {
                  const isActive = category === cat.value;
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setCategory(cat.value)}
                      className={cn(
                        "relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                        "hover:scale-105 active:scale-95",
                        isActive 
                          ? "bg-white shadow-medium text-text-primary"
                          : "bg-white/50 text-text-tertiary hover:bg-white/80 hover:text-text-secondary"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className={cn(
                          "text-base transition-transform duration-300",
                          isActive && "animate-bounce"
                        )}>
                          {cat.icon}
                        </span>
                        {cat.label}
                      </span>
                      {/* Active underline */}
                      {isActive && (
                        <div className={cn(
                          "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-gradient-to-r",
                          cat.gradient
                        )} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 lg:py-16">
        <div className="container-wide">
          {isLoading ? (
            <LoadingSkeleton />
          ) : activities.length === 0 ? (
            <EmptyState category={category} onReset={() => setCategory(undefined)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((kegiatan, index) => (
                <ActivityCard key={kegiatan.id} kegiatan={kegiatan} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
