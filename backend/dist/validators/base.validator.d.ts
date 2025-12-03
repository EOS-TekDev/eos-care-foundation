import { z } from 'zod';
export declare const titleField: z.ZodString;
export declare const contentField: z.ZodString;
export declare const orderField: z.ZodCoercedNumber<unknown>;
export declare const orderFieldWithDefault: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
export declare const booleanField: () => z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>;
export declare const booleanFieldWithDefault: (defaultValue?: boolean) => z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>>;
export declare const dateField: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
export declare const makeUpdateSchema: <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => z.ZodObject<{ [k in keyof T]: z.ZodOptional<T[k]>; }, z.core.$strip>;
//# sourceMappingURL=base.validator.d.ts.map