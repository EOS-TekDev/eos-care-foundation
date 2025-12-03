import { z } from 'zod';

export const createBeritaCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Komentar tidak boleh kosong')
    .max(2000, 'Komentar terlalu panjang'),
  parentId: z
    .preprocess((val) => {
      if (val === undefined || val === null || val === '') return undefined;
      if (typeof val === 'number') return val;
      const parsed = parseInt(String(val), 10);
      return Number.isNaN(parsed) ? undefined : parsed;
    }, z.number().int().positive().optional())
    .optional(),
});

export const updateBeritaCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Komentar tidak boleh kosong')
    .max(2000, 'Komentar terlalu panjang'),
});

export type CreateBeritaCommentInput = z.infer<typeof createBeritaCommentSchema>;
export type UpdateBeritaCommentInput = z.infer<typeof updateBeritaCommentSchema>;
