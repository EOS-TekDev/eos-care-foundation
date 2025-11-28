import { z } from 'zod';
import { orderField, booleanField, makeUpdateSchema } from './base.validator';

export const createTeamSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  order: orderField,
  isActive: booleanField(true),
});

export const updateTeamSchema = makeUpdateSchema(createTeamSchema);

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
