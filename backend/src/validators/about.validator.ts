import { z } from 'zod';
import { titleField, contentField, orderField, makeUpdateSchema } from './base.validator';

export const createAboutSchema = z.object({
  title: titleField,
  content: contentField,
  order: orderField,
});

export const updateAboutSchema = makeUpdateSchema(createAboutSchema);

export type CreateAboutInput = z.infer<typeof createAboutSchema>;
export type UpdateAboutInput = z.infer<typeof updateAboutSchema>;
