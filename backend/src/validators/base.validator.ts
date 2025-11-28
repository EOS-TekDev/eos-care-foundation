import { z } from 'zod';

// Reusable field schemas
export const titleField = z.string().min(3, 'Title must be at least 3 characters');
export const contentField = z.string().min(10, 'Content must be at least 10 characters');
export const orderField = z.coerce.number().int().optional().default(0);
export const booleanField = (defaultValue = false) => 
  z.preprocess(
    (val) => val === 'true' || val === true,
    z.boolean()
  ).optional().default(defaultValue);
export const dateField = z.preprocess(
  (val) => {
    if (!val || val === '') return undefined;
    // If it's already a full ISO datetime, return as-is
    if (typeof val === 'string' && val.includes('T')) return val;
    // Convert YYYY-MM-DD to ISO datetime (start of day UTC)
    if (typeof val === 'string') return `${val}T00:00:00.000Z`;
    return val;
  },
  z.string().datetime().optional()
);

// Helper to create update schema from create schema
export const makeUpdateSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => schema.partial();
