import { z } from 'zod';
export declare const createDonasiSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    targetAmount: z.ZodCoercedNumber<unknown>;
    deadline: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>>;
}, z.core.$strip>;
export declare const updateDonasiSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    targetAmount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    deadline: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>;
}, z.core.$strip>;
export declare const createTransactionSchema: z.ZodObject<{
    donorName: z.ZodString;
    donorEmail: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    amount: z.ZodCoercedNumber<unknown>;
    message: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateDonasiInput = z.infer<typeof createDonasiSchema>;
export type UpdateDonasiInput = z.infer<typeof updateDonasiSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
//# sourceMappingURL=donasi.validator.d.ts.map