import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';
import type { HomeService } from '../../hooks/useHome';

interface ServicesSectionProps {
  services?: HomeService[];
}

const IconComponent = ({ icon, className }: { icon: string; className?: string }) => {
  const icons: Record<string, ReactNode> = {
    lightning: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    book: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    briefcase: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    heart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    home: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    medical: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  };
  return icons[icon] || icons.heart;
};

const colorConfig: Record<string, { 
  bg: string; 
  gradient: string; 
  text: string; 
  border: string;
  shadow: string;
  emoji: string;
}> = {
  orange: {
    bg: 'bg-gradient-to-br from-[#FF6B35] via-[#F7931E] to-[#FF4757]',
    gradient: 'from-[#FF6B35] to-[#FF4757]',
    text: 'text-[#FF6B35]',
    border: 'border-orange-200',
    shadow: 'hover:shadow-[0_15px_40px_-10px_rgba(255,107,53,0.3)]',
    emoji: '⚡',
  },
  blue: {
    bg: 'bg-gradient-to-br from-[#0066FF] to-[#00D4FF]',
    gradient: 'from-primary to-[#00D4FF]',
    text: 'text-primary',
    border: 'border-primary/20',
    shadow: 'hover:shadow-[0_15px_40px_-10px_rgba(0,102,255,0.3)]',
    emoji: '📚',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    gradient: 'from-emerald-500 to-teal-500',
    text: 'text-emerald-500',
    border: 'border-emerald-500/20',
    shadow: 'hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.3)]',
    emoji: '💼',
  },
  purple: {
    bg: 'bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600',
    gradient: 'from-violet-600 to-fuchsia-600',
    text: 'text-violet-600',
    border: 'border-violet-200',
    shadow: 'hover:shadow-[0_15px_40px_-10px_rgba(139,92,246,0.5)]',
    emoji: '💜',
  },
};

export function ServicesSection({ services = [] }: ServicesSectionProps) {
  const servicesReveal = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  
  const sortedServices = [...services].sort((a, b) => a.order - b.order);
  const featuredService = sortedServices.find((s) => s.isFeatured);
  const regularServices = sortedServices.filter((s) => !s.isFeatured);

  return (
    <section 
      ref={servicesReveal.setRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-cta/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cta/20 rounded-full" />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div 
          className={cn(
            "text-center max-w-2xl mx-auto mb-16",
            "opacity-0 translate-y-8 transition-all duration-700",
            servicesReveal.isVisible && "opacity-100 translate-y-0"
          )}
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-3">
            <span className="w-8 h-px bg-primary/50" />
            Layanan
            <span className="w-8 h-px bg-primary/50" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Cara Kami{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">Membantu</span>
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-cta/30" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0,4 Q25,0 50,4 T100,4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-text-secondary text-lg">
            Tiga pilar utama yang menjadi fokus misi kemanusiaan kami
          </p>
        </div>

        {/* Cards Grid */}
        <div className="space-y-6">
          {/* Featured Hero Card */}
          {featuredService && (
            <div 
              className={cn(
                "group relative overflow-hidden rounded-[2rem] min-h-[300px]",
                colorConfig[featuredService.color]?.bg || colorConfig.orange.bg,
                "transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(255,107,53,0.5)]",
                "opacity-0 translate-y-12",
                servicesReveal.isVisible && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: servicesReveal.isVisible ? '100ms' : '0ms', perspective: '1000px' }}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                  backgroundSize: '32px 32px'
                }} />
              </div>
              
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute top-8 right-8 text-white/20 text-6xl">{colorConfig[featuredService.color]?.emoji || '⚡'}</div>

              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">Prioritas Utama</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      <IconComponent icon={featuredService.icon} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white">{featuredService.title}</h3>
                  </div>

                  <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                    {featuredService.description}
                  </p>

                  <Link 
                    to="/kegiatan" 
                    className={cn(
                      "inline-flex items-center gap-3 px-6 py-3 bg-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:gap-4",
                      colorConfig[featuredService.color]?.text || 'text-[#FF6B35]'
                    )}
                  >
                    Pelajari lebih lanjut
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {featuredService.stats && (
                  <div className="flex md:flex-col gap-6 md:gap-4 md:text-right">
                    <div>
                      <p className="text-4xl md:text-5xl font-accent text-white font-bold">{featuredService.stats}</p>
                      <p className="text-white/70 text-sm">{featuredService.statsLabel}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 rounded-[2rem] border-2 border-white/0 group-hover:border-white/30 transition-colors duration-500" />
            </div>
          )}

          {/* Regular Service Cards + CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularServices.map((service, index) => {
              const colors = colorConfig[service.color] || colorConfig.blue;
              return (
                <div 
                  key={service.id}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl p-8 min-h-[320px]",
                    `bg-gradient-to-br ${colors.gradient}/10`,
                    `border ${colors.border} backdrop-blur-sm`,
                    `transition-all duration-500 ${colors.shadow} hover:-translate-y-2`,
                    "opacity-0 translate-y-12",
                    servicesReveal.isVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: servicesReveal.isVisible ? `${200 + index * 100}ms` : '0ms' }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-current/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute top-4 right-4 text-current/10 text-5xl">{colors.emoji}</div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg",
                      colors.bg
                    )}>
                      <IconComponent icon={service.icon} className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-3">{service.title}</h3>
                    <p className="text-text-secondary flex-1 mb-6">{service.description}</p>
                    
                    <div className="flex items-end justify-between">
                      {service.stats && (
                        <div>
                          <span className={cn("text-5xl font-accent font-bold text-transparent bg-clip-text bg-gradient-to-r", colors.gradient)}>
                            {service.stats}
                          </span>
                          <p className="text-sm text-text-muted mt-1">{service.statsLabel}</p>
                        </div>
                      )}
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        `bg-current/10 group-hover:${colors.bg}`
                      )}>
                        <svg className={cn("w-5 h-5 transition-colors", colors.text, "group-hover:text-white")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Card - Always show */}
            <div 
              className={cn(
                "group relative overflow-hidden rounded-3xl min-h-[320px]",
                "bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600",
                "transition-all duration-500 hover:shadow-[0_15px_40px_-10px_rgba(139,92,246,0.5)] hover:-translate-y-2",
                "opacity-0 translate-y-12",
                servicesReveal.isVisible && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: servicesReveal.isVisible ? `${200 + regularServices.length * 100}ms` : '0ms' }}
            >
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-white/10 via-transparent to-transparent" />
              </div>
              
              <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/20 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-white/10 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute top-6 right-6 text-white/20 text-3xl">💜</div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/30 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">Bergabung Bersama Kami</h3>
                  <p className="text-white/80">
                    Jadilah bagian dari perubahan positif. Setiap kontribusi membawa harapan.
                  </p>
                </div>
                
                <Link 
                  to="/donasi" 
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-violet-600 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group-hover:gap-3"
                >
                  Mulai Donasi
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
