import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

interface CTAContent {
  headline?: string;
  subheadline?: string;
  description?: string;
  minDonation?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  trustBadges?: string;
  cardTitle?: string;
  cardProgress?: number;
  testimonial?: string | null;
  testimonialAuthor?: string | null;
}

interface CTASectionProps {
  content?: CTAContent | null;
}

export function CTASection({ content }: CTASectionProps) {
  const ctaReveal = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  const trustBadges = useMemo(() => {
    if (!content?.trustBadges) return [];
    try {
      return JSON.parse(content.trustBadges) as string[];
    } catch {
      return [];
    }
  }, [content?.trustBadges]);

  return (
    <section 
      ref={ctaReveal.setRef}
      className="py-24"
    >
      <div className="container-wide">
        <div 
          className={cn(
            "relative overflow-hidden rounded-[2.5rem] min-h-[500px]",
            "bg-gradient-to-br from-[#0052CC] via-primary to-[#0747A6]",
            "opacity-0 scale-95 transition-all duration-700",
            ctaReveal.isVisible && "opacity-100 scale-100"
          )}
        >
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-tr from-cta/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            <div className="absolute -bottom-32 right-0 w-96 h-96 bg-gradient-to-tl from-[#00875A]/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />

          {/* Floating shapes */}
          <div className="absolute top-16 right-[15%] w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl rotate-12 border border-white/20 hidden lg:block" />
          <div className="absolute bottom-24 left-[10%] w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl -rotate-6 border border-white/20 hidden lg:block" />

          {/* Content Grid */}
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 p-8 md:p-12 lg:p-16 items-center min-h-[500px]">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust badges */}
              <div 
                className={cn(
                  "inline-flex flex-wrap items-center gap-4 text-sm text-white/70",
                  "opacity-0 translate-y-4 transition-all duration-500 delay-100",
                  ctaReveal.isVisible && "opacity-100 translate-y-0"
                )}
              >
                {(trustBadges.length > 0 ? trustBadges : ['100% Transparan', 'Terpercaya Sejak 2020']).map((badge, i, arr) => (
                  <span key={i} className="contents">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {badge}
                    </span>
                    {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-white/40" />}
                  </span>
                ))}
              </div>

              {/* Headline */}
              <h2 
                className={cn(
                  "opacity-0 translate-y-6 transition-all duration-700 delay-200",
                  ctaReveal.isVisible && "opacity-100 translate-y-0"
                )}
              >
                <span className="block text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-[1.1]">
                  {content?.headline || 'Setiap Bantuan'}
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl font-accent italic text-white/90 mt-2">
                  {content?.subheadline || 'Membawa Harapan'}
                </span>
              </h2>

              {/* Description */}
              <p 
                className={cn(
                  "text-lg sm:text-xl text-white/80 max-w-lg leading-relaxed",
                  "opacity-0 translate-y-6 transition-all duration-700 delay-300",
                  ctaReveal.isVisible && "opacity-100 translate-y-0"
                )}
              >
                {content?.description ? (
                  <>
                    {content.description.split(content.minDonation || 'Rp 10.000')[0]}
                    <span className="text-white font-semibold"> {content.minDonation || 'Rp 10.000'}</span>
                    {content.description.split(content.minDonation || 'Rp 10.000')[1]}
                  </>
                ) : (
                  <>
                    Tidak ada yang terlalu kecil ketika kita berbagi. Mulai dari 
                    <span className="text-white font-semibold"> Rp 10.000</span>, 
                    kamu sudah bisa membantu seseorang yang membutuhkan.
                  </>
                )}
              </p>

              {/* CTA Buttons */}
              <div 
                className={cn(
                  "flex flex-wrap gap-4 pt-2",
                  "opacity-0 translate-y-6 transition-all duration-700 delay-400",
                  ctaReveal.isVisible && "opacity-100 translate-y-0"
                )}
              >
                <Link 
                  to="/donasi" 
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-semibold text-lg rounded-2xl shadow-strong overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
                >
                  <span className="relative z-10">{content?.ctaPrimary || 'Donasi Sekarang'}</span>
                  <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <div className="absolute inset-0 rounded-2xl ring-4 ring-white/0 group-hover:ring-white/50 transition-all duration-300" />
                </Link>
                <Link 
                  to="/about" 
                  className="group inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                >
                  <span>{content?.ctaSecondary || 'Tentang Kami'}</span>
                  <span className="w-0 group-hover:w-5 overflow-hidden transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div 
              className={cn(
                "lg:col-span-5 relative hidden lg:flex items-center justify-center",
                "opacity-0 translate-x-12 transition-all duration-1000 delay-300",
                ctaReveal.isVisible && "opacity-100 translate-x-0"
              )}
            >
              <div className="relative">
                {/* Main card */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-strong w-72 transform hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-cta flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">{content?.cardTitle || 'Donasi Hari Ini'}</p>
                      <p className="text-lg font-bold text-text-primary">Rp 2.500.000</p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-text-muted">Progress</span>
                      <span className="font-semibold text-primary">{content?.cardProgress || 85}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-cta rounded-full relative overflow-hidden" style={{ width: `${content?.cardProgress || 85}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">A</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">B</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">C</div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">+5</div>
                    </div>
                    <span className="text-xs text-text-muted">8 donatur hari ini</span>
                  </div>
                </div>

                {/* Floating testimonial */}
                <div className="absolute -bottom-16 -left-8 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-medium w-56 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                  <p className="text-sm text-text-secondary italic mb-2">"{content?.testimonial || 'Terima kasih sudah membantu keluarga kami...'}"</p>
                  <p className="text-xs font-medium text-text-primary">— {content?.testimonialAuthor || 'Ibu Sari, Penerima Manfaat'}</p>
                </div>

                {/* Success badge */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-full shadow-medium flex items-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>

                <div className="absolute -top-8 left-8 text-2xl animate-pulse" style={{ animationDuration: '2s' }}>✨</div>
                <div className="absolute bottom-4 right-[-20px] text-xl animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>💝</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
