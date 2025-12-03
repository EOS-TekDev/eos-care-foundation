import { createCrudHandlers } from '../services/crud.factory';
import {
  createAboutSchema,
  updateAboutSchema,
} from '../validators/about.validator';

const crud = createCrudHandlers({
  model: 'about',
  resourceName: 'About section',
  createSchema: createAboutSchema,
  updateSchema: updateAboutSchema,
  defaultOrderBy: { order: 'asc' },
  supportsImage: true,
});

export const { getAll, getById, create, update, remove } = crud;
