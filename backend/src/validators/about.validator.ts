import { z } from 'zod';
import { titleField, contentField, orderField, orderFieldWithDefault } from './base.validator';

export const createAboutSchema = z.object({
  title: titleField,
  content: contentField,
  order: orderFieldWithDefault,
});

export const updateAboutSchema = z.object({
  title: titleField.optional(),
  content: contentField.optional(),
  order: orderField.optional(),
});

export type CreateAboutInput = z.infer<typeof createAboutSchema>;
export type UpdateAboutInput = z.infer<typeof updateAboutSchema>;
