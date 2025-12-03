import { z } from 'zod';
import { makeUpdateSchema } from './base.validator';

// HomeHero schemas
export const createHomeHeroSchema = z.object({
  badge: z.string().min(1).max(100),
  headline: z.string().min(1).max(500),
  subheadline: z.string().min(1).max(1000),
  ctaPrimary: z.string().min(1).max(50),
  ctaSecondary: z.string().min(1).max(50),
  cardTitle: z.string().min(1).max(100),
  cardDesc: z.string().min(1).max(500),
  cardBadge: z.string().min(1).max(50),
  volunteerCount: z.string().min(1).max(50),
  todayAmount: z.string().min(1).max(50),
  isActive: z.boolean().optional(),
});

export const updateHomeHeroSchema = makeUpdateSchema(createHomeHeroSchema);

export type CreateHomeHeroInput = z.infer<typeof createHomeHeroSchema>;
export type UpdateHomeHeroInput = z.infer<typeof updateHomeHeroSchema>;

// HomeService schemas
export const createHomeServiceSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  icon: z.string().min(1).max(50),
  color: z.string().min(1).max(100),
  stats: z.string().max(50).optional(),
  statsLabel: z.string().max(100).optional(),
  isFeatured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export const updateHomeServiceSchema = makeUpdateSchema(createHomeServiceSchema);

export type CreateHomeServiceInput = z.infer<typeof createHomeServiceSchema>;
export type UpdateHomeServiceInput = z.infer<typeof updateHomeServiceSchema>;

// HomeCta schemas
export const createHomeCtaSchema = z.object({
  trustBadges: z.string().min(1), // JSON string array
  headline: z.string().min(1).max(200),
  subheadline: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  minDonation: z.string().min(1).max(50),
  ctaPrimary: z.string().min(1).max(50),
  ctaSecondary: z.string().min(1).max(50),
  cardTitle: z.string().min(1).max(100),
  cardProgress: z.number().int().min(0).max(100).optional(),
  testimonial: z.string().max(500).optional(),
  testimonialAuthor: z.string().max(100).optional(),
  isActive: z.boolean().optional(),
});

export const updateHomeCtaSchema = makeUpdateSchema(createHomeCtaSchema);

export type CreateHomeCtaInput = z.infer<typeof createHomeCtaSchema>;
export type UpdateHomeCtaInput = z.infer<typeof updateHomeCtaSchema>;
