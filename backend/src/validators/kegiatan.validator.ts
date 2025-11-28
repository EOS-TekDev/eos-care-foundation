import { z } from 'zod';
import { titleField, dateField, booleanField, makeUpdateSchema } from './base.validator';

export const kegiatanCategoryEnum = z.enum(['SOSIAL', 'PENDIDIKAN', 'PELATIHAN']);

export const createKegiatanSchema = z.object({
  title: titleField,
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: kegiatanCategoryEnum,
  date: dateField,
  isActive: booleanField(true),
  showDonationButton: booleanField(false),
  donasiId: z.coerce.number().int().positive().nullable().optional(),
});

export const updateKegiatanSchema = makeUpdateSchema(createKegiatanSchema);

export type CreateKegiatanInput = z.infer<typeof createKegiatanSchema>;
export type UpdateKegiatanInput = z.infer<typeof updateKegiatanSchema>;
