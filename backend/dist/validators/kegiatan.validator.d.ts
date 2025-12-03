import { z } from 'zod';
export declare const kegiatanCategoryEnum: z.ZodEnum<{
    SOSIAL: "SOSIAL";
    PENDIDIKAN: "PENDIDIKAN";
    PELATIHAN: "PELATIHAN";
}>;
export declare const createKegiatanSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<{
        SOSIAL: "SOSIAL";
        PENDIDIKAN: "PENDIDIKAN";
        PELATIHAN: "PELATIHAN";
    }>;
    date: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>>;
    showDonationButton: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>>;
    donasiId: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export declare const updateKegiatanSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<{
        SOSIAL: "SOSIAL";
        PENDIDIKAN: "PENDIDIKAN";
        PELATIHAN: "PELATIHAN";
    }>>;
    date: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>;
    showDonationButton: z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodBoolean>>;
    donasiId: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export type CreateKegiatanInput = z.infer<typeof createKegiatanSchema>;
export type UpdateKegiatanInput = z.infer<typeof updateKegiatanSchema>;
//# sourceMappingURL=kegiatan.validator.d.ts.map