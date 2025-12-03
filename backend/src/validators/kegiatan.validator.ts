import { z } from 'zod';
import { titleField, dateField, booleanField, booleanFieldWithDefault } from './base.validator';

export const kegiatanCategoryEnum = z.enum(['SOSIAL', 'PENDIDIKAN', 'PELATIHAN']);

export const createKegiatanSchema = z.object({
  title: titleField,
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: kegiatanCategoryEnum,
  date: dateField,
  isActive: booleanFieldWithDefault(true),
  showDonationButton: booleanFieldWithDefault(false),
  donasiId: z.coerce.number().int().positive().nullable().optional(),
});

export const updateKegiatanSchema = z.object({
  title: titleField.optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  category: kegiatanCategoryEnum.optional(),
  date: dateField,
  isActive: booleanField().optional(),
  showDonationButton: booleanField().optional(),
  donasiId: z.coerce.number().int().positive().nullable().optional(),
});

export type CreateKegiatanInput = z.infer<typeof createKegiatanSchema>;
export type UpdateKegiatanInput = z.infer<typeof updateKegiatanSchema>;
