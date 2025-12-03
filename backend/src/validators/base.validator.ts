import { z } from 'zod';

// Reusable field schemas
export const titleField = z.string().min(3, 'Title must be at least 3 characters');
export const contentField = z.string().min(10, 'Content must be at least 10 characters');

// Coerce common boolean representations but keep undefined/null untouched
const coerceBoolean = (val: unknown) => {
  if (val === undefined || val === null || val === '') return undefined;
  if (val === true || val === 'true' || val === 1 || val === '1') return true;
  if (val === false || val === 'false' || val === 0 || val === '0') return false;
  return val;
};

// Number/order helpers
export const orderField = z.coerce.number().int();
export const orderFieldWithDefault = orderField.optional().default(0);

// Boolean helpers (string "true"/true accepted)
export const booleanField = () =>
  z.preprocess(
    coerceBoolean,
    z.boolean()
  );
export const booleanFieldWithDefault = (defaultValue = false) =>
  booleanField().optional().default(defaultValue);

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

// Helper to create update schema from create schema (only use when create schema has no defaults)
export const makeUpdateSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => schema.partial();
