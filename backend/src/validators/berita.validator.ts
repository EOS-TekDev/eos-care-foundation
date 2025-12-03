import { z } from 'zod';
import { titleField, contentField, booleanField, booleanFieldWithDefault } from './base.validator';

export const createBeritaSchema = z.object({
  title: titleField,
  content: contentField,
  isPublished: booleanFieldWithDefault(false),
  showDonationButton: booleanFieldWithDefault(false),
  donasiId: z.coerce.number().int().positive().nullable().optional(),
});

export const updateBeritaSchema = z.object({
  title: titleField.optional(),
  content: contentField.optional(),
  isPublished: booleanField().optional(),
  showDonationButton: booleanField().optional(),
  donasiId: z.coerce.number().int().positive().nullable().optional(),
});

export type CreateBeritaInput = z.infer<typeof createBeritaSchema>;
export type UpdateBeritaInput = z.infer<typeof updateBeritaSchema>;
