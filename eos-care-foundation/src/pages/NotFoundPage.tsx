import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-8xl font-display font-bold text-primary/20">404</h1>
        <h2 className="text-2xl font-semibold text-ink mt-4 mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-text-muted mb-8 max-w-md">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
