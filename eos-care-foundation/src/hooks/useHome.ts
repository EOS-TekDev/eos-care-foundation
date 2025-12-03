import { useQuery } from '@tanstack/react-query';
import { createResourceHooks } from '../lib/createResourceHooks';
import api from '../lib/api';

export interface HomeStats {
  familiesHelped: number;
  totalKegiatan: number;
  totalFunds: number;
}

export interface HomeHero {
  id: number;
  badge: string;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cardTitle: string;
  cardDesc: string;
  cardBadge: string;
  volunteerCount: string;
  todayAmount: string;
  isActive: boolean;
}

export interface HomeService {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  stats: string | null;
  statsLabel: string | null;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
}

export interface HomeCta {
  id: number;
  trustBadges: string;
  headline: string;
  subheadline: string;
  description: string;
  minDonation: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cardTitle: string;
  cardProgress: number;
  testimonial: string | null;
  testimonialAuthor: string | null;
  isActive: boolean;
}

export interface HomeContent {
  hero: HomeHero | null;
  services: HomeService[];
  cta: HomeCta | null;
  stats: HomeStats;
}

// Public hooks for fetching home page data
export function useHomeStats() {
  return useQuery<HomeStats>({
    queryKey: ['home-stats'],
    queryFn: async () => {
      const response = await api.get('/public/home-stats');
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useHomeContent() {
  return useQuery<HomeContent>({
    queryKey: ['home-content'],
    queryFn: async () => {
      const response = await api.get('/public/home-content');
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Form types
export interface HomeHeroForm {
  badge: string;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cardTitle: string;
  cardDesc: string;
  cardBadge: string;
  volunteerCount: string;
  todayAmount: string;
  isActive: boolean;
}

export interface HomeServiceForm {
  title: string;
  description: string;
  icon: string;
  color: string;
  stats?: string | null;
  statsLabel?: string | null;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
}

export interface HomeCtaForm {
  trustBadges: string;
  headline: string;
  subheadline: string;
  description: string;
  minDonation: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cardTitle: string;
  cardProgress: number;
  testimonial: string;
  testimonialAuthor: string;
  isActive: boolean;
}

// Admin hooks using factory pattern
const homeHeroHooks = createResourceHooks<HomeHero, HomeHeroForm>({
  resource: 'home-hero',
  adminOnly: true,
  extraQueryKeys: ['home-content'],
  buildJsonData: (data) => ({ ...data }),
});

const homeServiceHooks = createResourceHooks<HomeService, HomeServiceForm>({
  resource: 'home-services',
  adminOnly: true,
  extraQueryKeys: ['home-content'],
  buildJsonData: (data) => ({ ...data }),
});

const homeCtaHooks = createResourceHooks<HomeCta, HomeCtaForm>({
  resource: 'home-cta',
  adminOnly: true,
  extraQueryKeys: ['home-content'],
  buildJsonData: (data) => ({ ...data }),
});

// Export admin hooks for Home Hero
export const useAdminHomeHero = homeHeroHooks.useAdminList;
export const useCreateHomeHero = homeHeroHooks.useCreate;
export const useUpdateHomeHero = homeHeroHooks.useUpdate;
export const useDeleteHomeHero = homeHeroHooks.useDelete;

// Export admin hooks for Home Services
export const useAdminHomeServices = homeServiceHooks.useAdminList;
export const useCreateHomeService = homeServiceHooks.useCreate;
export const useUpdateHomeService = homeServiceHooks.useUpdate;
export const useDeleteHomeService = homeServiceHooks.useDelete;

// Export admin hooks for Home CTA
export const useAdminHomeCta = homeCtaHooks.useAdminList;
export const useCreateHomeCta = homeCtaHooks.useCreate;
export const useUpdateHomeCta = homeCtaHooks.useUpdate;
export const useDeleteHomeCta = homeCtaHooks.useDelete;
