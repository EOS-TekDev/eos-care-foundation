import { useParams, Link } from 'react-router-dom';
import { usePublicKegiatanDetail } from '../../hooks/useKegiatan';
import { formatDate, getImageUrl, cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useEffect, useState } from 'react';

const categoryStyles: Record<string, { 
  bg: string; 
  text: string; 
  border: string; 
  gradient: string; 
  light: string;
  overlay: string;
}> = {
  SOSIAL: { 
    bg: 'bg-rose-50', 
    text: 'text-rose-600', 
    border: 'border-rose-200', 
    gradient: 'from-rose-500 to-pink-500', 
    light: 'bg-rose-100',
    overlay: 'from-rose-900/80'
  },
  PENDIDIKAN: { 
    bg: 'bg-blue-50', 
    text: 'text-blue-600', 
    border: 'border-blue-200', 
    gradient: 'from-blue-500 to-indigo-500', 
    light: 'bg-blue-100',
    overlay: 'from-blue-900/80'
  },
  PELATIHAN: { 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-600', 
    border: 'border-emerald-200', 
    gradient: 'from-emerald-500 to-teal-500', 
    light: 'bg-emerald-100',
    overlay: 'from-emerald-900/80'
  },
};

function LoadingSkeleton() {
  return (
    <div>
      <div className="h-[50vh] skeleton" />
      <div className="container-narrow -mt-20 relative z-10">
        <div className="skeleton h-32 rounded-2xl mb-8" />
        <div className="skeleton h-12 w-3/4 mb-4" />
        <div className="space-y-3">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

function ShareButton({ 
  icon, 
  label, 
  onClick, 
  bgColor, 
  hoverBg 
}: { 
  icon: React.ReactNode; 
  label: string;
  onClick: () => void;
  bgColor: string;
  hoverBg: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onClick();
    if (label === 'Salin') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
        "hover:scale-110 active:scale-95",
        bgColor, hoverBg
      )}
      title={copied ? 'Tersalin!' : label}
    >
      {copied ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : icon}
    </button>
  );
}

export function KegiatanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: kegiatan, isLoading } = usePublicKegiatanDetail(id!);
  const contentReveal = useScrollReveal<HTMLDivElement>();
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!kegiatan) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          {/* Illustrated 404 */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full animate-pulse" />
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-soft">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold mb-3 text-text-primary">
            Kegiatan Tidak Ditemukan
          </h1>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            Maaf, kegiatan yang Anda cari tidak tersedia atau telah berakhir.
          </p>
          <Link 
            to="/kegiatan" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-all hover:gap-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Kegiatan
          </Link>
        </div>
      </div>
    );
  }

  const styles = categoryStyles[kegiatan.category] || categoryStyles.SOSIAL;

  return (
    <article className="min-h-screen">
      {/* Immersive Hero - Full width with parallax */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        {/* Background image with parallax */}
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          {kegiatan.image ? (
            <img
              src={getImageUrl(kegiatan.image)}
              alt={kegiatan.title}
              className="w-full h-[120%] object-cover"
            />
          ) : (
            <div className={cn("w-full h-full bg-gradient-to-br", styles.gradient, "opacity-30")} />
          )}
        </div>

        {/* Category-tinted overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t via-black/30 to-black/10",
          styles.overlay
        )} />

        {/* Breadcrumb navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container-wide py-6">
            <Link 
              to="/kegiatan"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kegiatan</span>
              <span className="text-white/50">/</span>
              <span className="text-white/60 truncate max-w-[200px]">{kegiatan.title}</span>
            </Link>
          </div>
        </div>

        {/* Floating category badge */}
        <div className="absolute top-24 left-0 z-20">
          <div className="container-wide">
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-white/20 backdrop-blur-md border border-white/30",
              "text-white text-sm font-medium"
            )}>
              <span className={cn("w-2 h-2 rounded-full animate-pulse", styles.light)} />
              {kegiatan.category}
            </div>
          </div>
        </div>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="container-wide pb-24 lg:pb-32">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight max-w-3xl">
              {kegiatan.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Floating Info Card */}
      <section className="relative z-30">
        <div className="container-narrow">
          <div className={cn(
            "-mt-16 bg-white/95 backdrop-blur-md rounded-2xl shadow-strong border border-white/50",
            "p-4 sm:p-6"
          )}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", styles.light)}>
                    <svg className={cn("w-5 h-5", styles.text)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs">Tanggal</p>
                    <p className="font-medium text-text-primary text-sm">{formatDate(kegiatan.date)}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-10 bg-gray-200" />

                {/* Category */}
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", styles.light)}>
                    <svg className={cn("w-5 h-5", styles.text)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs">Kategori</p>
                    <p className={cn("font-medium text-sm", styles.text)}>{kegiatan.category}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-10 bg-gray-200" />

                {/* Status */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs">Status</p>
                    <p className="font-medium text-emerald-600 text-sm">Aktif</p>
                  </div>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <span className="text-text-muted text-xs mr-2 hidden sm:block">Bagikan:</span>
                <ShareButton
                  icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>}
                  label="Facebook"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  bgColor="bg-[#1877F2]/10 text-[#1877F2]"
                  hoverBg="hover:bg-[#1877F2] hover:text-white"
                />
                <ShareButton
                  icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                  label="Twitter"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(kegiatan.title)}`, '_blank')}
                  bgColor="bg-black/5 text-black"
                  hoverBg="hover:bg-black hover:text-white"
                />
                <ShareButton
                  icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
                  label="WhatsApp"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(kegiatan.title + ' ' + window.location.href)}`, '_blank')}
                  bgColor="bg-[#25D366]/10 text-[#25D366]"
                  hoverBg="hover:bg-[#25D366] hover:text-white"
                />
                <ShareButton
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>}
                  label="Salin"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  bgColor="bg-gray-100 text-text-muted"
                  hoverBg="hover:bg-primary hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16">
        <div className="container-narrow">
          <div 
            ref={contentReveal.setRef}
            className={cn(
              "transition-all duration-700",
              contentReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Description with drop cap */}
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap first-letter:text-5xl first-letter:font-accent first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary">
                {kegiatan.description}
              </p>
            </div>

            {/* Donation CTA - Asymmetric */}
            {kegiatan.showDonationButton && kegiatan.donasiId && (
              <div className="mt-16 relative">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* Left - Content */}
                  <div className="lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cta/10 via-cta/5 to-transparent p-8 lg:p-10 border border-cta/20">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-cta/10 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl" />
                      
                      <div className="relative">
                        {/* Animated heart */}
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cta to-orange-500 flex items-center justify-center mb-6 shadow-medium">
                          <svg className="w-7 h-7 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-text-primary mb-3">
                          Dukung Kegiatan Ini
                        </h3>
                        <p className="text-text-secondary mb-8 max-w-md">
                          Anda dapat berdonasi untuk mendukung kegiatan ini. Setiap bantuan Anda sangat berarti bagi mereka yang membutuhkan.
                        </p>

                        <Link 
                          to={`/donasi/${kegiatan.donasiId}`}
                          className="inline-flex items-center gap-3 px-8 py-4 bg-cta text-white font-semibold text-lg rounded-2xl shadow-medium hover:shadow-strong hover:scale-[1.02] transition-all group"
                        >
                          Donasi Sekarang
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right - Stats/Visual */}
                  <div className="lg:col-span-5 hidden lg:block">
                    <div className="space-y-4">
                      {/* Impact stat cards */}
                      <div className="p-5 bg-white rounded-2xl shadow-soft border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-2xl font-display font-bold text-text-primary">100+</p>
                            <p className="text-sm text-text-muted">Orang Terbantu</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-white rounded-2xl shadow-soft border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-2xl font-display font-bold text-text-primary">Terverifikasi</p>
                            <p className="text-sm text-text-muted">Program Resmi</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Back to list */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <Link 
                to="/kegiatan"
                className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Kembali ke Daftar Kegiatan</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
