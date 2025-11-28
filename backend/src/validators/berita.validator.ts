import { z } from 'zod';
import { titleField, contentField, booleanField, makeUpdateSchema } from './base.validator';

export const createBeritaSchema = z.object({
  title: titleField,
  content: contentField,
  isPublished: booleanField(false),
  showDonationButton: booleanField(false),
  donasiId: z.coerce.number().int().positive().nullable().optional(),
});

export const updateBeritaSchema = makeUpdateSchema(createBeritaSchema);

export type CreateBeritaInput = z.infer<typeof createBeritaSchema>;
export type UpdateBeritaInput = z.infer<typeof updateBeritaSchema>;
