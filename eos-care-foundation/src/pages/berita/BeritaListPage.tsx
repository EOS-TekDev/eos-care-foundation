import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePublicBerita } from '../../hooks/useBerita';
import { formatDate, getImageUrl, cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function NewsCard({ 
  berita, 
  index = 0,
  isLatest = false
}: { 
  berita: { id: string; title: string; content: string; image?: string; createdAt: string; author?: { name: string } };
  index?: number;
  isLatest?: boolean;
}) {
  const { setRef: ref, isVisible } = useScrollReveal<HTMLAnchorElement>();

  return (
    <Link 
      ref={ref}
      to={`/berita/${berita.id}`} 
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
      <img
        src={getImageUrl(berita.image)}
        alt={berita.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Terbaru badge */}
      {isLatest && (
        <span className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-primary text-white text-[10px] font-medium rounded">
          Terbaru
        </span>
      )}
      
      {/* Text overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        <h3 className="text-sm font-display font-semibold text-white mb-1 group-hover:text-primary-light transition-colors line-clamp-2">
          {berita.title}
        </h3>
        <div className="flex items-center gap-2 text-white/60 text-xs">
          <span>{formatDate(berita.createdAt)}</span>
          {berita.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{berita.author.name}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div className="section">
      <div className="container-wide">
        <div className="text-center mb-10">
          <div className="skeleton h-8 w-48 mx-auto mb-3" />
          <div className="skeleton h-5 w-72 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

const PAGE_SIZE = 9;

export function BeritaListPage() {
  const { data, isLoading } = usePublicBerita({ limit: 100 });
  const { setRef: headerRef, isVisible: headerVisible } = useScrollReveal();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const beritaList = data?.data || [];
  const visibleBerita = beritaList.slice(0, visibleCount);

  return (
    <div className="section">
      <div className="container-wide">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-10 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Kabar Terkini
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Berita <span className="text-primary">Terbaru</span>
          </h1>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Ikuti perkembangan terbaru dari kegiatan dan program sosial kami
          </p>
        </div>
        
        {beritaList.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-display font-semibold mb-2">Belum Ada Berita</h3>
            <p className="text-text-muted text-sm">Berita akan segera hadir, nantikan update dari kami!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleBerita.map((berita, index) => (
                <NewsCard key={berita.id} berita={berita} index={index} isLatest={index === 0} />
              ))}
            </div>

            {visibleCount < beritaList.length && (
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="h-px w-full max-w-md bg-white/40" />
                <p className="text-xs text-text-muted">
                  Menampilkan {visibleBerita.length} dari {beritaList.length} berita
                </p>
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/60 bg-white/40 backdrop-blur-md text-sm font-medium text-text-primary shadow-sm hover:bg-white/80 hover:border-white transition-colors transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 active:scale-[0.97]"
                  onClick={() =>
                    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, beritaList.length))
                  }
                >
                  <span>Muat lebih banyak berita</span>
                  <svg
                    className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
