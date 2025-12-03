import { useState, createContext, useContext } from 'react';
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import { ThemeToggle } from '../ui/ThemeToggle';

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({ isCollapsed: false, setIsCollapsed: () => {} });

export const useSidebar = () => useContext(SidebarContext);

const navGroups = [
  {
    title: 'Konten',
    items: [
      { 
        to: '/admin', 
        label: 'Dashboard', 
        end: true,
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        )
      },
      { 
        to: '/admin/home-hero', 
        label: 'Hero Homepage',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        )
      },
      { 
        to: '/admin/home-services', 
        label: 'Layanan Homepage',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        )
      },
      { 
        to: '/admin/home-cta', 
        label: 'CTA Homepage',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
          </svg>
        )
      },
      { 
        to: '/admin/berita', 
        label: 'Berita',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
        )
      },
      { 
        to: '/admin/kegiatan', 
        label: 'Kegiatan',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        )
      },
    ]
  },
  {
    title: 'Tentang',
    items: [
      { 
        to: '/admin/about', 
        label: 'About',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        )
      },
      { 
        to: '/admin/team', 
        label: 'Tim',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        )
      },
    ]
  },
  {
    title: 'Penggalangan',
    items: [
      { 
        to: '/admin/donasi', 
        label: 'Donasi',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        )
      },
    ]
  },
];

export function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  // Get current page title for breadcrumb
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    for (const group of navGroups) {
      const item = group.items.find(i => i.to === path);
      if (item) return item.label;
    }
    if (path.includes('transactions')) return 'Transaksi';
    return 'Admin';
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="min-h-screen bg-eos-gradient dark:bg-ink dark:text-white">
        {/* Mobile header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-warm-100 px-4 py-3 dark:bg-ink/90 dark:border-white/10">
          <div className="flex items-center justify-between gap-3">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forest to-forest-dark flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              <span className="font-display font-bold text-ink dark:text-white">EOS Care</span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle size="compact" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-text-secondary hover:bg-warm-100 rounded-xl transition-colors dark:hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white/95 backdrop-blur-xl border-r border-white/50 transition-all duration-300 ease-smooth flex flex-col dark:bg-ink/95 dark:border-white/10",
          "lg:translate-x-0",
          isCollapsed ? "w-20" : "w-72",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          {/* Top accent gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest via-ocean to-terracotta" />
          
          {/* Logo */}
          <div className={cn(
            "flex items-center border-b border-warm-100 transition-all duration-300 flex-shrink-0 dark:border-white/10",
            isCollapsed ? "justify-center p-4" : "justify-between p-5"
          )}>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest to-forest-dark flex items-center justify-center shadow-soft flex-shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              {!isCollapsed && (
                <div className="animate-fade-in">
                  <span className="font-display font-bold text-ink block dark:text-white">EOS Care</span>
                  <span className="text-xs text-text-muted">Admin Panel</span>
                </div>
              )}
            </Link>
            
            {/* Collapse toggle - desktop only */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "hidden lg:flex w-8 h-8 items-center justify-center rounded-lg text-text-muted hover:bg-warm-100 hover:text-text-primary transition-all",
                isCollapsed && "absolute -right-4 top-6 bg-white border border-warm-100 shadow-soft"
              )}
            >
              <svg 
                className={cn("w-4 h-4 transition-transform duration-300", isCollapsed && "rotate-180")} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-6 min-h-0">
            {navGroups.map((group) => (
              <div key={group.title}>
                {!isCollapsed && (
                  <p className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    {group.title}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.end}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                          isCollapsed && 'justify-center',
                          isActive
                            ? 'bg-forest/10 text-forest dark:bg-forest/30 dark:text-white'
                            : 'text-text-secondary hover:bg-warm-50 hover:text-text-primary dark:hover:bg-white/10'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-forest rounded-r-full" />
                          )}
                          <span className={cn(
                            "transition-transform duration-200",
                            "group-hover:scale-110"
                          )}>
                            {link.icon}
                          </span>
                          {!isCollapsed && (
                            <span className="animate-fade-in">{link.label}</span>
                          )}
                          {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-ink text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                              {link.label}
                            </div>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick action */}
          <div className={cn("border-t border-warm-100 p-3 flex-shrink-0 dark:border-white/10", isCollapsed && "px-2")}>
            <Link
              to="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-warm-50 transition-colors dark:hover:bg-white/10",
                isCollapsed && "justify-center"
              )}
              title="Lihat Website"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              {!isCollapsed && <span>Lihat Website</span>}
            </Link>
          </div>

          {/* User section */}
          <div className={cn(
            "border-t border-warm-100 p-3 bg-warm-50/50 flex-shrink-0 dark:border-white/10 dark:bg-white/5",
            isCollapsed && "px-2"
          )}>
            <div className={cn(
              "flex items-center gap-3 mb-3",
              isCollapsed && "justify-center"
            )}>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest to-ocean flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-forest rounded-full border-2 border-white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate dark:text-white">{user?.name}</p>
                  <p className="text-xs text-text-muted truncate">{user?.email}</p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-sunset hover:bg-sunset/10 rounded-xl transition-colors",
                isCollapsed && "px-2"
              )}
              title="Keluar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              {!isCollapsed && <span>Keluar</span>}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className={cn(
          "min-h-screen transition-all duration-300 ease-smooth",
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        )}>
          {/* Desktop header with breadcrumb */}
          <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-warm-100 bg-white/60 backdrop-blur-xl sticky top-0 z-30 dark:bg-ink/60 dark:border-white/10">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/admin" className="text-text-muted hover:text-text-primary transition-colors dark:text-gray-400 dark:hover:text-white">Admin</Link>
              <svg className="w-4 h-4 text-text-disabled dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-medium text-text-primary dark:text-white">{getCurrentPageTitle()}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-text-muted hover:text-text-primary hover:bg-warm-100 rounded-xl transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
            </div>
          </header>
          
          <div className="pt-16 lg:pt-6 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
