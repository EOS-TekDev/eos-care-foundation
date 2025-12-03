import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';

export function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-eos-gradient text-text-primary dark:bg-ink dark:text-white transition-colors">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-24" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
