# AGENTS.md - EOS Foundation Backend

## Project Snapshot

- **Type**: Simple Express TypeScript API (single project)
- **Stack**: Express 5, TypeScript, Prisma 7, MySQL, JWT, Zod
- **Purpose**: Backend for EOS Care Foundation - Auth, Berita, About, Kegiatan CRUD
- **Sub-guides**: See [`src/AGENTS.md`](src/AGENTS.md) for detailed code patterns

---

## Setup Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database (requires MySQL running)
npm run db:push

# Seed admin user
npm run db:seed

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Universal Conventions

### Code Style
- **TypeScript**: Strict mode enabled
- **Imports**: Use relative paths within `src/`
- **Async handlers**: All controller functions return `Promise<void>`
- **Error handling**: Use `sendError()` from `src/utils/response.ts`

### Commit Format
```
type(scope): description

Examples:
feat(auth): add Google OAuth support
fix(berita): resolve pagination offset bug
refactor(middleware): extract role guard logic
```

### Branch Strategy
- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes

---

## Security & Secrets

- **NEVER** commit `.env` file (use `.env.example` as template)
- JWT secrets must be strong in production
- Google OAuth credentials are optional (for SSO)
- Uploaded files stored in `uploads/` - configure proper permissions

---

## JIT Index

### Directory Map
| Path | Purpose | Guide |
|------|---------|-------|
| `src/` | Application source | [src/AGENTS.md](src/AGENTS.md) |
| `src/controllers/` | Request handlers | See patterns in guide |
| `src/middlewares/` | Auth, roles, errors | See patterns in guide |
| `src/validators/` | Zod schemas | See patterns in guide |
| `prisma/` | Database schema | [prisma/AGENTS.md](prisma/AGENTS.md) |

### Quick Find Commands
```bash
# Find a controller function
rg -n "export const" src/controllers/

# Find a route definition
rg -n "router\.(get|post|put|delete)" src/routes/

# Find a Zod schema
rg -n "export const.*Schema" src/validators/

# Find middleware usage
rg -n "authenticate|isAdmin" src/routes/

# Find Prisma model usage
rg -n "prisma\." src/controllers/
```

---

## API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login, return JWT |
| GET | `/me` | Get current user |
| PUT | `/profile` | Update profile |
| GET | `/google` | Google OAuth init |
| GET | `/google/callback` | Google OAuth callback |

### Admin (`/api/admin/*`) - Requires ADMIN role
| Resource | Endpoints |
|----------|-----------|
| Berita | GET, POST `/berita` · GET, PUT, DELETE `/berita/:id` |
| About | GET, POST `/about` · GET, PUT, DELETE `/about/:id` |
| Kegiatan | GET, POST `/kegiatan` · GET, PUT, DELETE `/kegiatan/:id` |

### Public (`/api/public`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/berita` | Published news |
| GET | `/berita/:id` | Single news item |
| GET | `/about` | About sections |
| GET | `/kegiatan` | Active activities |

---

## Definition of Done

Before creating a PR:
```bash
npx tsc --noEmit && npm run build
```

- [ ] TypeScript compiles without errors
- [ ] Build succeeds
- [ ] New endpoints documented in this file or PR description
- [ ] No secrets committed
