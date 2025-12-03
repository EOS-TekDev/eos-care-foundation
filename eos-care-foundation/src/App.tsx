import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Layouts
import { PageLayout } from './components/layout/PageLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public pages
import { HomePage } from './pages/home';
import { AboutPage } from './pages/AboutPage';
import { BeritaListPage } from './pages/berita/BeritaListPage';
import { BeritaDetailPage } from './pages/berita/BeritaDetailPage';
import { KegiatanListPage } from './pages/kegiatan/KegiatanListPage';
import { KegiatanDetailPage } from './pages/kegiatan/KegiatanDetailPage';
import { DonasiListPage } from './pages/donasi/DonasiListPage';
import { DonasiDetailPage } from './pages/donasi/DonasiDetailPage';

// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ProfileSetupPage } from './pages/profile/ProfileSetupPage';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminBerita } from './pages/admin/AdminBerita';
import { AdminAbout } from './pages/admin/AdminAbout';
import { AdminTeam } from './pages/admin/AdminTeam';
import { AdminKegiatan } from './pages/admin/AdminKegiatan';
import { AdminDonasi } from './pages/admin/AdminDonasi';
import { AdminTransactions } from './pages/admin/AdminTransactions';
import { AdminHomeHero } from './pages/admin/AdminHomeHero';
import { AdminHomeServices } from './pages/admin/AdminHomeServices';
import { AdminHomeCta } from './pages/admin/AdminHomeCta';
import { NotFoundPage } from './pages/NotFoundPage';

// Components
import { ProtectedRoute } from './components/layout/ProtectedRoute';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => toast.error(error.message),
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ThemedToaster />
          <AuthProvider>
            <BrowserRouter>
            <Routes>
            {/* Public routes */}
            <Route element={<PageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="berita" element={<BeritaListPage />} />
              <Route path="berita/:id" element={<BeritaDetailPage />} />
              <Route path="kegiatan" element={<KegiatanListPage />} />
              <Route path="kegiatan/:id" element={<KegiatanDetailPage />} />
              <Route path="donasi" element={<DonasiListPage />} />
              <Route path="donasi/:id" element={<DonasiDetailPage />} />
              <Route
                path="profile/setup"
                element={
                  <ProtectedRoute>
                    <ProfileSetupPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Auth routes */}
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />

            {/* Admin routes */}
            <Route
              path="admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="berita" element={<AdminBerita />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="kegiatan" element={<AdminKegiatan />} />
              <Route path="donasi" element={<AdminDonasi />} />
              <Route path="donasi/:id/transactions" element={<AdminTransactions />} />
              <Route path="home-hero" element={<AdminHomeHero />} />
              <Route path="home-services" element={<AdminHomeServices />} />
              <Route path="home-cta" element={<AdminHomeCta />} />
              </Route>

              {/* 404 catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return <Toaster position="top-right" richColors theme={resolvedTheme} />;
}

export default App;
