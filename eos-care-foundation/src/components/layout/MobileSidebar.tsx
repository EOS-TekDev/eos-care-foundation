import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../lib/types';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { 
    to: '/', 
    label: 'Beranda',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    )
  },
  { 
    to: '/about', 
    label: 'Tentang Kami',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    )
  },
  { 
    to: '/berita', 
    label: 'Berita',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    )
  },
  { 
    to: '/kegiatan', 
    label: 'Kegiatan',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    )
  },
  { 
    to: '/donasi', 
    label: 'Donasi',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    highlight: true
  },
];

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate('/');
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 transition-all duration-300 md:hidden',
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      >
        {/* Gradient blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent backdrop-blur-sm" />
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 z-50 transition-transform duration-300 ease-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Glass container */}
        <div className="h-full bg-white/95 backdrop-blur-xl shadow-strong flex flex-col dark:bg-ink/95 dark:text-white">
          {/* Header with gradient accent */}
          <div className="relative px-6 pt-6 pb-4">
            {/* Decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gradient-rose via-gradient-iris to-gradient-mint" />
            
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <span className="font-display font-bold text-text-primary">EOS Care</span>
              </div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded-xl transition-colors dark:hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* User section */}
          {isAuthenticated && (
            <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-gradient-lavender/50 to-gradient-azure/50 rounded-2xl">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-soft">
                  <span className="text-lg font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary truncate">{user?.name}</p>
                  <p className="text-sm text-text-muted truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-4 overflow-y-auto">
            <div className="space-y-1">
              {menuLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                      link.highlight && !isActive && 'bg-cta/10 text-cta hover:bg-cta/20',
                      link.highlight && isActive && 'bg-cta text-white shadow-md',
                      !link.highlight && isActive && 'bg-primary/10 text-primary dark:bg-primary/30 dark:text-white',
                      !link.highlight && !isActive && 'text-text-secondary hover:bg-gray-100 hover:text-text-primary dark:hover:bg-white/10'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={cn(
                        link.highlight && isActive && 'text-white',
                        link.highlight && !isActive && 'text-cta'
                      )}>
                        {link.icon}
                      </span>
                      {link.label}
                      {isActive && !link.highlight && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-gray-100 dark:border-white/10">
            {isAuthenticated ? (
              <div className="space-y-2">
                {user?.role === Role.ADMIN && (
                  <Link
                    to="/admin"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-status-urgent hover:bg-red-50 font-medium transition-colors dark:hover:bg-status-urgent/10"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Keluar
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/auth/login"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-white font-medium shadow-soft hover:shadow-medium transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Masuk
                </Link>
                <Link
                  to="/auth/register"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-text-secondary font-medium hover:border-primary hover:text-primary transition-colors dark:border-white/20 dark:text-white dark:hover:border-white"
                >
                  Daftar Akun
                </Link>
              </div>
            )}
            
            {/* Copyright */}
            <p className="text-center text-xs text-text-disabled mt-4">
              © 2024 EOS Care Foundation
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
