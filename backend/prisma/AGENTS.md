# AGENTS.md - Prisma Database Guide

## Identity

- **ORM**: Prisma 7
- **Database**: MySQL (Laragon)
- **Connection**: Via `prisma.config.ts` (NOT in schema.prisma)

---

## Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema to database (dev)
npm run db:push

# Create migration (production)
npm run db:migrate

# Seed database with admin user
npm run db:seed

# Open Prisma Studio (visual DB editor)
npm run db:studio
```

---

## Schema Structure

```prisma
# Models defined in schema.prisma:
- User (users table) - Auth, roles
- Berita (berita table) - News/articles
- About (about table) - About sections
- Kegiatan (kegiatan table) - Activities

# Enums:
- Role: ADMIN, USER
- KegiatanCategory: SOSIAL, PENDIDIKAN, PELATIHAN
```

---

## Key Files

| File | Purpose |
|------|---------|
| `schema.prisma` | Model definitions |
| `seed.ts` | Initial data seeding |
| `../prisma.config.ts` | Database connection config |

---

## Adding New Models

1. Add model to `schema.prisma`:
```prisma
model NewModel {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("new_models")
}
```

2. Regenerate and push:
```bash
npm run db:generate
npm run db:push
```

3. Import in controller:
```typescript
import prisma from '../config/database';
// Use: prisma.newModel.findMany()
```

---

## Default Seed Data

Running `npm run db:seed` creates:

**Admin User:**
- Email: `admin@eoscare.org`
- Password: `admin123`
- Role: `ADMIN`

**About Sections:**
- Visi (order: 1)
- Misi (order: 2)

---

## Gotchas

- **Prisma 7**: URL config moved to `prisma.config.ts`, not `datasource.url`
- **MySQL in Laragon**: Default connection `mysql://root:@localhost:3306/eos_foundation`
- **@@map**: Use snake_case table names with `@@map("table_name")`
- **Relations**: Always specify `onDelete` behavior (e.g., `onDelete: Cascade`)
- **Text fields**: Use `@db.Text` for long content fields
