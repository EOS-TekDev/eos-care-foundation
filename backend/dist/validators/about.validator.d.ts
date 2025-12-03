import { z } from 'zod';
export declare const createAboutSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    order: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export declare const updateAboutSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreateAboutInput = z.infer<typeof createAboutSchema>;
export type UpdateAboutInput = z.infer<typeof updateAboutSchema>;
//# sourceMappingURL=about.validator.d.ts.map