import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { cn, getImageUrl } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../lib/types';
import { ThemeToggle } from '../ui/ThemeToggle';

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/about', label: 'Tentang' },
  { to: '/berita', label: 'Berita' },
  { to: '/kegiatan', label: 'Kegiatan' },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const avatar = user?.photo ? (
    <img
      src={getImageUrl(user.photo)}
      alt={user.name}
      className="w-7 h-7 rounded-full object-cover border border-primary/30"
    />
  ) : (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gradient-lavender to-gradient-azure flex items-center justify-center">
      <span className="text-xs font-semibold text-primary">
        {user?.name?.charAt(0).toUpperCase()}
      </span>
    </div>
  );

  const firstName = user?.name?.split(' ')[0] ?? '';

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-soft py-2 border-white/50 dark:bg-ink/90 dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]" 
          : "bg-transparent py-4 dark:bg-transparent"
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            {/* Logo mark */}
            <div className={cn(
              "relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
              "shadow-md"
            )}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-text-primary leading-tight">EOSCare</span>
              <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">Foundation</span>
            </div>
          </Link>

          {/* Desktop nav links - with animated underline */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "text-primary" 
                      : "text-text-secondary hover:text-text-primary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Animated underline */}
                    <span 
                      className={cn(
                        "absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left",
                        isActive ? "scale-x-100" : "scale-x-0"
                      )} 
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side: Auth + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.role === Role.ADMIN && (
                  <Link 
                    to="/admin" 
                    className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                
                {/* User dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-colors dark:bg-white/10 dark:border-white/15 dark:hover:bg-white/20"
                  >
                    {avatar}
                    <span className="text-sm font-medium text-text-primary max-w-[100px] truncate">
                      {firstName}
                    </span>
                    <svg
                      className={cn(
                        'w-4 h-4 text-text-muted transition-transform',
                        isUserMenuOpen ? 'rotate-180' : 'rotate-0'
                      )}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 8l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg border border-gray-100 py-1.5 z-50 text-sm dark:bg-ink dark:border-white/10 dark:text-white">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigate('/profile/setup');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-text-primary hover:bg-gray-50 dark:text-white dark:hover:bg-white/10"
                      >
                        <span>Profil</span>
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          setIsUserMenuOpen(false);
                          await handleLogout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left text-status-urgent hover:bg-status-urgent/5 dark:hover:bg-status-urgent/20"
                      >
                        <span>Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link 
                to="/auth/login" 
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors dark:text-white"
              >
                Masuk
              </Link>
            )}
            
            {/* CTA Button with glow */}
            <Link 
              to="/donasi" 
              className="group relative px-5 py-2.5 bg-cta text-white text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Donasi
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </span>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cta-hover to-cta opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-1 bg-cta/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </Link>
          </div>

          {/* Mobile quick actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle size="compact" />
          </div>
        </div>
      </div>
    </nav>
  );
}
