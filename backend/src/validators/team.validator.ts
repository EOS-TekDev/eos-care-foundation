import { z } from 'zod';
import { orderField, orderFieldWithDefault, booleanField, booleanFieldWithDefault } from './base.validator';

export const createTeamSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  order: orderFieldWithDefault,
  isActive: booleanFieldWithDefault(true),
});

export const updateTeamSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  role: z.string().min(2, 'Role must be at least 2 characters').optional(),
  order: orderField.optional(),
  isActive: booleanField().optional(),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
