import { useParams, Link } from 'react-router-dom';
import { usePublicBeritaDetail } from '../../hooks/useBerita';
import { formatDate, getImageUrl, cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { BeritaComments } from '../../components/berita/BeritaComments';

function LoadingSkeleton() {
  return (
    <div className="section-tight">
      <div className="container-narrow">
        <div className="skeleton h-4 w-32 mb-6" />
        <div className="skeleton h-[400px] w-full rounded-3xl mb-8" />
        <div className="skeleton h-12 w-3/4 mb-4" />
        <div className="flex items-center gap-4 mb-8">
          <div className="skeleton h-10 w-10 rounded-full" />
          <div>
            <div className="skeleton h-4 w-24 mb-1" />
            <div className="skeleton h-3 w-32" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function BeritaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: berita, isLoading } = usePublicBeritaDetail(id!);
  const { setRef: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { setRef: contentRef, isVisible: contentVisible } = useScrollReveal();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!berita) {
    return (
      <div className="section">
        <div className="container-narrow text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center">
            <svg className="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold mb-3">Berita Tidak Ditemukan</h1>
          <p className="text-text-muted mb-6">Maaf, berita yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link to="/berita" className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="section-tight">
      <div className="container-narrow">
        {/* Back Link */}
        <Link 
          to="/berita" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm mb-6 transition-colors group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Berita
        </Link>

        {/* Hero Image */}
        <div 
          ref={heroRef}
          className={cn(
            "relative mb-8 transition-all duration-700",
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {berita.image ? (
            <div className="relative rounded-3xl overflow-hidden shadow-soft">
              <img
                src={getImageUrl(berita.image)}
                alt={berita.title}
                className="w-full h-64 md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-64 md:h-[400px] rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <svg className="w-20 h-20 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div 
          ref={contentRef}
          className={cn(
            "transition-all duration-700 delay-200",
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-tight mb-6">
            {berita.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 pb-6 mb-8 border-b border-gray-100">
            {berita.author && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-semibold text-sm">
                  {berita.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-text-primary text-sm">{berita.author.name}</p>
                  <p className="text-text-muted text-xs">Penulis</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(berita.createdAt)}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed whitespace-pre-wrap">
            {berita.content}
          </div>

          {/* Donation CTA */}
          {berita.showDonationButton && berita.donasiId && (
            <div className="mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-cta/10 via-cta/5 to-transparent p-8 border border-cta/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cta/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-cta font-medium mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Bantu Sekarang
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                  Ingin Berkontribusi?
                </h3>
                <p className="text-text-secondary mb-6">
                  Anda dapat berdonasi untuk mendukung program terkait berita ini. Setiap bantuan sangat berarti.
                </p>
                <Link 
                  to={`/donasi/${berita.donasiId}`} 
                  className="inline-flex items-center gap-2 btn-cta"
                >
                  <span>Donasi Sekarang</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-text-muted text-sm mb-4">Bagikan berita ini</p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </button>
              <button 
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(berita.title)}`, '_blank')}
                className="w-10 h-10 rounded-full bg-black/5 text-black hover:bg-black hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button 
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(berita.title + ' ' + window.location.href)}`, '_blank')}
                className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="w-10 h-10 rounded-full bg-gray-100 text-text-muted hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                title="Salin link"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <BeritaComments beritaId={berita.id} />
          </div>
        </div>
      </div>
    </article>
  );
}
