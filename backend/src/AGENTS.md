# AGENTS.md - Source Code Guide

## Package Identity

- **Purpose**: Express TypeScript API source code
- **Framework**: Express 5 with TypeScript strict mode
- **ORM**: Prisma 7 with MySQL

---

## Directory Structure

```
src/
├── app.ts              # Entry point - Express setup
├── config/             # Database & auth configuration
├── controllers/        # Route handlers (one per resource)
├── middlewares/        # Request processing (auth, validation, errors)
├── routes/             # API route definitions
├── services/           # Reusable business logic
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
└── validators/         # Zod validation schemas
```

---

## Patterns & Conventions

### Controllers
- **Location**: `src/controllers/{resource}.controller.ts`
- **Pattern**: Export async functions, use `Request`/`Response` types
- ✅ **DO**: Follow pattern in `src/controllers/berita.controller.ts`
- ❌ **DON'T**: Use `AuthRequest` type directly (use `(req as any).user`)

```typescript
// ✅ Correct pattern
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await prisma.resource.findMany();
    sendResponse(res, 200, 'Retrieved', data);
  } catch {
    sendError(res, 500, 'Failed to get');
  }
};
```

### Validators (Zod)
- **Location**: `src/validators/{resource}.validator.ts`
- **Pattern**: Export schema + inferred type
- ✅ **DO**: Follow pattern in `src/validators/auth.validator.ts`

```typescript
// ✅ Correct pattern
export const createSchema = z.object({
  title: z.string().min(3, 'Title required'),
  content: z.string().min(10, 'Content required'),
});
export type CreateInput = z.infer<typeof createSchema>;
```

### Routes
- **Location**: `src/routes/{scope}.routes.ts`
- **Admin routes**: Apply `authenticate, isAdmin` middleware
- ✅ **DO**: Follow pattern in `src/routes/admin.routes.ts`

```typescript
// ✅ Admin route pattern
router.use(authenticate, isAdmin);
router.get('/resource', controller.getAll);
router.post('/resource', upload.single('image'), controller.create);
```

### Responses
- **Always use**: `sendResponse()` and `sendError()` from `src/utils/response.ts`
- ❌ **DON'T**: Use `res.json()` directly

```typescript
// ✅ Correct
sendResponse(res, 200, 'Success', data);
sendError(res, 404, 'Not found');

// ❌ Wrong
res.json({ success: true, data });
```

### Pagination
- **Use**: `getPagination()` and `getMeta()` from `src/services/base.service.ts`
- ✅ **DO**: Follow pattern in `src/controllers/berita.controller.ts`

---

## Touch Points / Key Files

| Purpose | File |
|---------|------|
| Express setup | `src/app.ts` |
| Database client | `src/config/database.ts` |
| Auth middleware | `src/middlewares/auth.middleware.ts` |
| Role guard | `src/middlewares/role.middleware.ts` |
| Response helpers | `src/utils/response.ts` |
| JWT helpers | `src/utils/jwt.ts` |
| File upload | `src/utils/upload.ts` |
| Type definitions | `src/types/index.ts` |

---

## JIT Index Hints

```bash
# Find controller by resource
rg -n "export const (getAll|getById|create|update|remove)" src/controllers/

# Find route by HTTP method
rg -n "router\.(get|post|put|delete)" src/routes/

# Find Zod validation schema
rg -n "z\.object" src/validators/

# Find middleware function
rg -n "export const" src/middlewares/

# Find where a middleware is used
rg -n "authenticate|isAdmin|validate" src/routes/

# Find Prisma queries
rg -n "prisma\.(user|berita|about|kegiatan)" src/
```

---

## Adding New Resources

To add a new CRUD resource (e.g., `Donasi`):

1. **Schema**: Add model to `prisma/schema.prisma`
2. **Regenerate**: `npm run db:generate && npm run db:push`
3. **Validator**: Create `src/validators/donasi.validator.ts`
4. **Controller**: Create `src/controllers/donasi.controller.ts`
5. **Routes**: Add to `src/routes/admin.routes.ts` (admin) or create new route file
6. **Register**: Import routes in `src/routes/index.ts`

Copy patterns from existing files:
- Validator: `src/validators/berita.validator.ts`
- Controller: `src/controllers/berita.controller.ts`
- Routes: `src/routes/admin.routes.ts`

---

## Common Gotchas

1. **User in request**: Access via `(req as any).user` not `req.user`
2. **Prisma 7 config**: Database URL in `prisma.config.ts`, NOT in schema
3. **Zod v4**: Use `.issues` not `.errors` for error messages
4. **Image uploads**: Use `upload.single('image')` middleware before controller
5. **JWT expiry**: Cast to `jwt.SignOptions['expiresIn']` for type safety

---

## Pre-PR Checks

```bash
# Type check
npx tsc --noEmit

# Build
npm run build

# Test dev server starts (Ctrl+C to stop)
npm run dev
```
