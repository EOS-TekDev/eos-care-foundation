import { z } from 'zod';
export declare const createTeamSchema: z.ZodObject<{
    name: z.ZodString;
    role: z.ZodString;
    order: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>>;
}, z.core.$strip>;
export declare const updateTeamSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    isActive: z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>;
}, z.core.$strip>;
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
//# sourceMappingURL=team.validator.d.ts.map