import { z } from 'zod';
export declare const createBeritaCommentSchema: z.ZodObject<{
    content: z.ZodString;
    parentId: z.ZodOptional<z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodOptional<z.ZodNumber>>>;
}, z.core.$strip>;
export declare const updateBeritaCommentSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
export type CreateBeritaCommentInput = z.infer<typeof createBeritaCommentSchema>;
export type UpdateBeritaCommentInput = z.infer<typeof updateBeritaCommentSchema>;
//# sourceMappingURL=berita-comment.validator.d.ts.map