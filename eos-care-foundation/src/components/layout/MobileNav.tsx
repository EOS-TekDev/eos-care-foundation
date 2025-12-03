import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { MobileSidebar } from './MobileSidebar';

const navItems = [
  { 
    to: '/', 
    label: 'Beranda', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    )
  },
  { 
    to: '/berita', 
    label: 'Berita', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    )
  },
  { to: '/donasi', isCenter: true },
  { 
    to: '/kegiatan', 
    label: 'Kegiatan', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    )
  },
  { 
    label: 'Menu', 
    isMenu: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    )
  },
];

export function MobileNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Spacer to prevent content from being hidden behind nav */}
      <div className="h-20 md:hidden" />
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Glass background with gradient border */}
        <div className="relative mx-3 mb-3">
          {/* Gradient border effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-rose via-gradient-iris to-gradient-mint rounded-2xl opacity-50" />
          
          {/* Main nav container */}
          <div className="relative bg-white/85 backdrop-blur-xl rounded-2xl shadow-strong border border-white/50 px-2 py-2 dark:bg-ink/90 dark:border-white/20">
            <div className="flex items-center justify-around">
              {navItems.map((item, index) =>
                item.isCenter ? (
                  // Floating Donate Button - Enhanced
                  <Link 
                    key={index} 
                    to={item.to!} 
                    className="relative -mt-8 group"
                  >
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 bg-cta/30 rounded-full blur-xl scale-150 animate-pulse" />
                    
                    {/* Button */}
                    <div className={cn(
                      "relative w-16 h-16 rounded-full bg-gradient-to-br from-cta to-cta-hover flex items-center justify-center",
                      "shadow-strong transition-all duration-300",
                      "group-hover:scale-110 group-hover:shadow-[0_8px_32px_rgba(255,107,53,0.4)]",
                      "group-active:scale-95"
                    )}>
                      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </div>
                    
                    {/* Label below */}
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-cta whitespace-nowrap">
                      Donasi
                    </span>
                  </Link>
                ) : item.isMenu ? (
                  // Menu button
                  <button
                    key={index}
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 transition-colors"
                  >
                    <div className="text-text-muted">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-medium text-text-muted">{item.label}</span>
                  </button>
                ) : (
                  // Regular nav item
                  <NavLink
                    key={index}
                    to={item.to!}
                    end={item.to === '/'}
                    className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 relative"
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active indicator pill */}
                        {isActive && (
                          <div className="absolute inset-x-1 top-1 bottom-1 bg-primary/10 rounded-xl -z-10" />
                        )}
                        <div className={cn(
                          "transition-colors",
                          isActive ? "text-primary" : "text-text-muted"
                        )}>
                          {item.icon}
                        </div>
                        <span className={cn(
                          "text-[10px] font-medium transition-colors",
                          isActive ? "text-primary" : "text-text-muted"
                        )}>
                          {item.label}
                        </span>
                        {/* Active dot */}
                        {isActive && (
                          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                        )}
                      </>
                    )}
                  </NavLink>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
