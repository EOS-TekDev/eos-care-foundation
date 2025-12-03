import { z } from 'zod';
import { titleField, dateField, booleanField, booleanFieldWithDefault } from './base.validator';

export const createDonasiSchema = z.object({
  title: titleField,
  description: z.string().min(10, 'Description must be at least 10 characters'),
  targetAmount: z.coerce.number().positive('Target amount must be positive'),
  deadline: dateField,
  isActive: booleanFieldWithDefault(true),
});

export const updateDonasiSchema = z.object({
  title: titleField.optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  targetAmount: z.coerce.number().positive('Target amount must be positive').optional(),
  deadline: dateField,
  isActive: booleanField().optional(),
});

export const createTransactionSchema = z.object({
  donorName: z.string().min(2, 'Donor name must be at least 2 characters'),
  donorEmail: z.string().email().optional().nullable(),
  amount: z.coerce.number().positive('Amount must be positive'),
  message: z.string().optional().nullable(),
});

export type CreateDonasiInput = z.infer<typeof createDonasiSchema>;
export type UpdateDonasiInput = z.infer<typeof updateDonasiSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
