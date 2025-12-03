import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

interface HeroContent {
  badge?: string;
  headline?: string;
  subheadline?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  cardTitle?: string;
  cardDesc?: string;
  volunteerCount?: string;
  cardBadge?: string;
  todayAmount?: string;
}

interface HeroSectionProps {
  content?: HeroContent | null;
}

export function HeroSection({ content }: HeroSectionProps) {
  const heroReveal = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      ref={heroReveal.setRef}
      className="min-h-[85vh] flex items-center relative"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left content - spans 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow */}
            <div 
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-subtle",
                "opacity-0 translate-y-6 transition-all duration-700",
                heroReveal.isVisible && "opacity-100 translate-y-0"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span className="text-sm font-medium text-text-secondary">{content?.badge || 'Yayasan Sosial Terpercaya'}</span>
            </div>

            {/* Headline */}
            <h1 
              className={cn(
                "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] tracking-tight",
                "opacity-0 translate-y-8 transition-all duration-700 delay-100",
                heroReveal.isVisible && "opacity-100 translate-y-0"
              )}
            >
              {(content?.headline || 'Bersama\nMembangun\nHarapan').split('\n').map((line, i, arr) => (
                i === arr.length - 1 ? (
                  <span key={i} className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
                      {line}
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-cta/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                ) : (
                  <span key={i}>
                    <span className="text-text-primary">{line}</span>
                    <br />
                  </span>
                )
              ))}
            </h1>

            {/* Subheading */}
            <p 
              className={cn(
                "text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed",
                "opacity-0 translate-y-8 transition-all duration-700 delay-200",
                heroReveal.isVisible && "opacity-100 translate-y-0"
              )}
              dangerouslySetInnerHTML={{ 
                __html: content?.subheadline || 'Bergabunglah dalam misi kemanusiaan untuk menghadirkan <span class="font-semibold text-text-primary"> perubahan nyata </span> bagi mereka yang membutuhkan.' 
              }}
            />

            {/* CTA Buttons */}
            <div 
              className={cn(
                "flex flex-wrap gap-4",
                "opacity-0 translate-y-8 transition-all duration-700 delay-300",
                heroReveal.isVisible && "opacity-100 translate-y-0"
              )}
            >
              <Link 
                to="/donasi" 
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cta text-white font-semibold text-lg rounded-2xl shadow-medium overflow-hidden transition-all duration-300 hover:shadow-strong hover:scale-[1.02]"
              >
                <span className="relative z-10">{content?.ctaPrimary || 'Donasi Sekarang'}</span>
                <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-cta-hover to-cta opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                to="/kegiatan" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/70 dark:bg-white/10 backdrop-blur-sm text-text-primary font-semibold rounded-2xl border border-white/50 dark:border-white/10 shadow-soft transition-all duration-300 hover:bg-white dark:hover:bg-white/20 hover:shadow-medium"
              >
                {content?.ctaSecondary || 'Lihat Kegiatan'}
              </Link>
            </div>
          </div>

          {/* Right visual - spans 5 columns */}
          <div 
            className={cn(
              "lg:col-span-5 relative hidden lg:block",
              "opacity-0 translate-x-12 transition-all duration-1000 delay-200",
              heroReveal.isVisible && "opacity-100 translate-x-0"
            )}
          >
            {/* Stacked cards visual */}
            <div className="relative h-[500px]">
              <div className="absolute top-8 left-8 w-72 h-80 bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-3xl border border-white/50 dark:border-white/10 rotate-6 shadow-soft" />
              <div className="absolute top-4 left-4 w-72 h-80 bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-3xl border border-white/50 dark:border-white/10 rotate-3 shadow-medium" />
              
              {/* Front card */}
              <div className="absolute top-0 left-0 w-72 h-80 bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-3xl border border-white/50 dark:border-white/10 shadow-strong p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-2">{content?.cardTitle || 'Bantuan Bencana'}</h3>
                  <p className="text-sm text-text-secondary">{content?.cardDesc || 'Respon cepat untuk korban bencana alam di seluruh Indonesia'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-rose border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-gradient-azure border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-gradient-mint border-2 border-white" />
                  </div>
                  <span className="text-xs text-text-muted">{content?.volunteerCount || '+500 relawan'}</span>
                </div>
              </div>

              <div className="absolute -right-4 top-24 px-4 py-2 bg-status-success text-white text-sm font-medium rounded-full shadow-medium">
                {content?.cardBadge || 'Aktif Membantu'}
              </div>

              <div className="absolute bottom-12 -right-8 px-5 py-4 bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-strong border border-white/50 dark:border-white/10">
                <p className="text-2xl font-accent text-primary font-semibold">{content?.todayAmount || 'Rp 2.5M'}</p>
                <p className="text-xs text-text-muted">Terkumpul hari ini</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
