import { useHomeContent } from '../../hooks/useHome';
import { HeroSection, StatsSection, ServicesSection, CTASection } from '../../components/home';

function DecorativeBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-gradient-rose/40 to-gradient-lavender/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gradient-to-tr from-gradient-azure/40 to-gradient-mint/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-bl from-gradient-periwinkle/30 to-gradient-iris/20 rounded-full blur-3xl" />
    </div>
  );
}

export function HomePage() {
  const { data: homeContent, isLoading } = useHomeContent();

  return (
    <div className="overflow-hidden">
      <DecorativeBlobs />
      <HeroSection content={homeContent?.hero} />
      <StatsSection stats={homeContent?.stats} isLoading={isLoading} />
      <ServicesSection services={homeContent?.services} />
      <CTASection content={homeContent?.cta} />
    </div>
  );
}
