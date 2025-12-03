import { Link } from 'react-router-dom';
import { usePublicAbout } from '../hooks/useAbout';
import { usePublicTeam } from '../hooks/useTeam';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import { getImageUrl, cn } from '../lib/utils';
import { TeamMemberCard } from '../components/about/TeamMemberCard';

function StatNumber({ value, suffix = '', prefix = '', enabled }: { value: number; suffix?: string; prefix?: string; enabled: boolean }) {
  const count = useCountUp({ end: value, duration: 2500, enabled });
  return <>{prefix}{count.toLocaleString('id-ID')}{suffix}</>;
}

const defaultSections = [
  {
    id: 'default-1',
    title: 'Visi Kami',
    content: 'Menjadi yayasan sosial terdepan yang membawa perubahan nyata bagi masyarakat Indonesia. Kami percaya bahwa setiap individu berhak mendapatkan kesempatan untuk hidup lebih baik, dan kami berkomitmen untuk mewujudkan hal tersebut melalui program-program yang berkelanjutan dan berdampak.',
    image: null,
  },
  {
    id: 'default-2',
    title: 'Misi Kami',
    content: 'Memberikan bantuan langsung kepada masyarakat yang membutuhkan melalui program tanggap bencana, pendidikan, dan pemberdayaan ekonomi. Kami bekerja sama dengan berbagai pihak untuk memastikan bantuan sampai kepada yang paling membutuhkan dengan cara yang transparan dan akuntabel.',
    image: null,
  },
  {
    id: 'default-3',
    title: 'Nilai-Nilai Kami',
    content: 'Transparansi, integritas, dan keberlanjutan adalah fondasi dari setiap langkah kami. Kami percaya bahwa kepercayaan dari donatur dan masyarakat adalah aset terpenting yang harus dijaga. Setiap rupiah yang dipercayakan kepada kami akan dikelola dengan penuh tanggung jawab.',
    image: null,
  },
];

export function AboutPage() {
  const { data: apiSections, isLoading } = usePublicAbout();
  const { data: teamMembers } = usePublicTeam();
  const sections = apiSections && apiSections.length > 0 ? apiSections : defaultSections;
  const heroReveal = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const sectionsReveal = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const statsReveal = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const teamReveal = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const ctaReveal = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Hero skeleton */}
        <div className="relative h-[70vh] bg-gradient-to-br from-primary/5 to-cta/5 flex items-center">
          <div className="container-wide">
            <div className="max-w-3xl">
              <div className="skeleton h-6 w-32 rounded-full mb-6" />
              <div className="skeleton h-16 w-3/4 rounded-2xl mb-4" />
              <div className="skeleton h-16 w-1/2 rounded-2xl mb-8" />
              <div className="skeleton h-6 w-full rounded-xl mb-2" />
              <div className="skeleton h-6 w-2/3 rounded-xl" />
            </div>
          </div>
        </div>
        {/* Content skeleton */}
        <div className="container-wide py-24">
          <div className="space-y-32">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-16 items-center">
                <div className={cn("space-y-6", i % 2 === 0 && "lg:order-2")}>
                  <div className="skeleton h-8 w-1/4 rounded-xl" />
                  <div className="skeleton h-10 w-3/4 rounded-xl" />
                  <div className="skeleton h-4 w-full rounded-lg" />
                  <div className="skeleton h-4 w-full rounded-lg" />
                  <div className="skeleton h-4 w-2/3 rounded-lg" />
                </div>
                <div className={cn(i % 2 === 0 && "lg:order-1")}>
                  <div className="skeleton h-80 rounded-3xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { value: 2020, suffix: '', prefix: '', label: 'Tahun Berdiri', desc: 'Melayani masyarakat Indonesia' },
    { value: 1200, suffix: '+', prefix: '', label: 'Keluarga Terbantu', desc: 'Di seluruh penjuru nusantara' },
    { value: 50, suffix: '+', prefix: '', label: 'Program Sosial', desc: 'Dijalankan secara konsisten' },
    { value: 500, suffix: '+', prefix: '', label: 'Relawan Aktif', desc: 'Siap membantu kapan saja' },
  ];

  return (
    <div>
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-gradient-rose/30 to-gradient-lavender/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gradient-to-tr from-gradient-azure/30 to-gradient-mint/20 rounded-full blur-3xl" />
      </div>

      {/* Hero Section - Full Viewport with Gradient */}
      <section 
        ref={heroReveal.setRef}
        className="relative min-h-[70vh] flex items-center overflow-hidden"
      >
        {/* Gradient overlay background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cta/5" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-32 left-[10%] w-32 h-32 bg-cta/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />

        <div className="container-wide relative">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div 
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 shadow-subtle mb-8",
                "opacity-0 translate-y-6 transition-all duration-700",
                heroReveal.isVisible && "opacity-100 translate-y-0"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-text-secondary">Yayasan EOS Care</span>
            </div>

            {/* Main headline with typography play */}
            <h1 
              className={cn(
                "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-8",
                "opacity-0 translate-y-8 transition-all duration-700 delay-100",
                heroReveal.isVisible && "opacity-100 translate-y-0"
              )}
            >
              <span className="text-text-primary">Tentang</span>
              <br />
              <span className="relative">
                <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
                  Kami
                </span>
                {/* Decorative underline */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-cta/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Hero description */}
            <p 
              className={cn(
                "text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10",
                "opacity-0 translate-y-8 transition-all duration-700 delay-200",
                heroReveal.isVisible && "opacity-100 translate-y-0"
              )}
            >
              Didirikan dengan tekad untuk menghadirkan{' '}
              <span className="font-semibold text-text-primary">perubahan nyata</span>{' '}
              bagi masyarakat yang membutuhkan. Setiap langkah kami adalah langkah menuju Indonesia yang lebih baik.
            </p>

            {/* Scroll indicator */}
            <div 
              className={cn(
                "flex items-center gap-3 text-text-muted",
                "opacity-0 transition-all duration-700 delay-500",
                heroReveal.isVisible && "opacity-100"
              )}
            >
              <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDuration: '1.5s' }} />
              </div>
              <span className="text-sm">Scroll untuk membaca cerita kami</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections - Alternating Layout */}
      <section 
        ref={sectionsReveal.setRef}
        className="py-24"
      >
        <div className="container-wide">
          <div className="space-y-32">
            {sections?.map((section, index) => {
              const isEven = index % 2 === 0;
              const sectionNum = String(index + 1).padStart(2, '0');
              
              return (
                <div 
                  key={section.id}
                  className={cn(
                    "relative grid lg:grid-cols-12 gap-8 lg:gap-16 items-center",
                    "opacity-0 translate-y-12 transition-all duration-700",
                    sectionsReveal.isVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: sectionsReveal.isVisible ? `${index * 150}ms` : '0ms' }}
                >
                  {/* Large faded section number */}
                  <div 
                    className={cn(
                      "absolute -top-8 font-accent text-[12rem] leading-none font-bold text-primary/5 select-none pointer-events-none hidden lg:block",
                      isEven ? "left-0" : "right-0"
                    )}
                  >
                    {sectionNum}
                  </div>

                  {/* Text Content - 7 columns */}
                  <div className={cn(
                    "lg:col-span-7 relative z-10",
                    !isEven && "lg:order-2"
                  )}>
                    {/* Section number badge (mobile) */}
                    <div className="inline-flex items-center gap-2 mb-6 lg:hidden">
                      <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-display font-bold text-primary">{sectionNum}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
                      {section.title}
                    </h2>

                    {/* Content with drop cap on first section */}
                    <div className={cn(
                      "text-text-secondary text-lg leading-relaxed whitespace-pre-wrap",
                      index === 0 && "first-letter:text-6xl first-letter:font-accent first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-none"
                    )}>
                      {section.content}
                    </div>
                  </div>

                  {/* Image - 5 columns */}
                  <div className={cn(
                    "lg:col-span-5 relative",
                    !isEven && "lg:order-1"
                  )}>
                    {section.image ? (
                      <div className="group relative">
                        {/* Image frame effect */}
                        <div className={cn(
                          "absolute inset-0 rounded-3xl bg-gradient-to-br transition-transform duration-500",
                          isEven 
                            ? "from-primary/20 to-cta/20 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6" 
                            : "from-cta/20 to-primary/20 -translate-x-4 translate-y-4 group-hover:-translate-x-6 group-hover:translate-y-6"
                        )} />
                        
                        {/* Main image */}
                        <div className="relative overflow-hidden rounded-3xl shadow-strong">
                          <img
                            src={getImageUrl(section.image)}
                            alt={section.title}
                            className="w-full h-72 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Gradient overlay on hover */}
                          <div className={cn(
                            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                            isEven 
                              ? "bg-gradient-to-t from-primary/20 to-transparent" 
                              : "bg-gradient-to-t from-cta/20 to-transparent"
                          )} />
                        </div>

                        {/* Floating decorative badge */}
                        <div className={cn(
                          "absolute -bottom-4 px-5 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-medium border border-white/50",
                          isEven ? "-right-4" : "-left-4"
                        )}>
                          <span className="text-sm font-medium text-text-secondary">Bagian {sectionNum}</span>
                        </div>
                      </div>
                    ) : (
                      // Decorative placeholder when no image
                      <div className="relative h-72 lg:h-96 rounded-3xl bg-gradient-to-br from-primary/10 to-cta/10 flex items-center justify-center border border-white/50">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/50 flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                          <p className="text-sm text-text-muted">EOS Care Foundation</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section 
        ref={statsReveal.setRef}
        className="py-24 relative"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container-wide relative">
          {/* Section header */}
          <div 
            className={cn(
              "text-center max-w-2xl mx-auto mb-16",
              "opacity-0 translate-y-8 transition-all duration-700",
              statsReveal.isVisible && "opacity-100 translate-y-0"
            )}
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-3">
              <span className="w-8 h-px bg-primary/50" />
              Pencapaian
              <span className="w-8 h-px bg-primary/50" />
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Perjalanan{' '}
              <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">Kami</span>
            </h2>
            <p className="text-text-secondary text-lg">
              Angka-angka yang mewakili dedikasi dan komitmen kami dalam membantu sesama
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div 
                key={stat.label}
                className={cn(
                  "group relative p-6 lg:p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-soft",
                  "transition-all duration-500 hover:shadow-medium hover:-translate-y-1",
                  "opacity-0 translate-y-8",
                  statsReveal.isVisible && "opacity-100 translate-y-0"
                )}
                style={{ transitionDelay: statsReveal.isVisible ? `${i * 100}ms` : '0ms' }}
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-3xl rounded-bl-3xl" />
                
                <div className="relative">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-accent text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta font-bold tabular-nums">
                    <StatNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} enabled={statsReveal.isVisible} />
                  </span>
                  <h3 className="text-lg font-display font-semibold text-text-primary mt-2 mb-1">{stat.label}</h3>
                  <p className="text-sm text-text-muted">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers && teamMembers.length > 0 && (
        <section
          ref={teamReveal.setRef}
          className="py-24 relative"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cta/5 to-transparent" />

          <div className="container-wide relative">
            {/* Section header */}
            <div
              className={cn(
                "text-center max-w-2xl mx-auto mb-16",
                "opacity-0 translate-y-8 transition-all duration-700",
                teamReveal.isVisible && "opacity-100 translate-y-0"
              )}
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium text-cta uppercase tracking-wider mb-3">
                <span className="w-8 h-px bg-cta/50" />
                Tim Kami
                <span className="w-8 h-px bg-cta/50" />
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                Orang-Orang{' '}
                <span className="font-accent italic text-transparent bg-clip-text bg-gradient-to-r from-cta to-primary">Hebat</span>
              </h2>
              <p className="text-text-secondary text-lg">
                Kenali para penggerak di balik setiap program dan kegiatan kami
              </p>
            </div>

            {/* Team grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 lg:gap-10">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  isVisible={teamReveal.isVisible}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section 
        ref={ctaReveal.setRef}
        className="py-24"
      >
        <div className="container-wide">
          <div 
            className={cn(
              "relative overflow-hidden rounded-[2.5rem]",
              "bg-gradient-to-br from-[#0052CC] via-primary to-[#0747A6]",
              "opacity-0 scale-95 transition-all duration-700",
              ctaReveal.isVisible && "opacity-100 scale-100"
            )}
          >
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tr from-cta/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
              {/* Trust badge */}
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8",
                  "opacity-0 translate-y-4 transition-all duration-500 delay-100",
                  ctaReveal.isVisible && "opacity-100 translate-y-0"
                )}
              >
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80 text-sm">Jadilah Bagian dari Perubahan</span>
              </div>

              {/* Headline */}
              <h2 
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight mb-6",
                  "opacity-0 translate-y-6 transition-all duration-700 delay-200",
                  ctaReveal.isVisible && "opacity-100 translate-y-0"
                )}
              >
                Bersama Kita{' '}
                <span className="font-accent italic text-white/90">Bisa</span>
                <br className="hidden sm:block" />
                Berbuat Lebih Banyak
              </h2>

              {/* Description */}
              <p 
                className={cn(
                  "text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed",
                  "opacity-0 translate-y-6 transition-all duration-700 delay-300",
                  ctaReveal.isVisible && "opacity-100 translate-y-0"
                )}
              >
                Setiap kontribusi, sekecil apapun, memiliki dampak besar bagi mereka yang membutuhkan. 
                Mari wujudkan harapan bersama.
              </p>

              {/* CTA Buttons */}
              <div 
                className={cn(
                  "flex flex-col sm:flex-row items-center justify-center gap-4",
                  "opacity-0 translate-y-6 transition-all duration-700 delay-400",
                  ctaReveal.isVisible && "opacity-100 translate-y-0"
                )}
              >
                <Link 
                  to="/donasi" 
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-semibold text-lg rounded-2xl shadow-strong overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
                >
                  <span className="relative z-10">Mulai Donasi</span>
                  <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
                <Link 
                  to="/kegiatan" 
                  className="group inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                >
                  <span>Lihat Kegiatan</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
