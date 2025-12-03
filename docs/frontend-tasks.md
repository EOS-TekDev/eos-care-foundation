# EOS Foundation Frontend - Implementation Tasks

**Source**: `~/.factory/specs/2025-11-27-eos-foundation-backend-analysis-for-frontend-development.md`

**Last Updated**: 2025-11-28

**Status**: ~90% Complete

---

## Phase 1: Project Setup & Configuration (2-3 hrs)

### 1.1 Project Initialization
- [x] Create Vite + React + TypeScript + SWC project
- [x] Setup folder structure:
  ```
  src/
  ├── components/{layout,home,donasi,berita,kegiatan,about,admin,ui}/
  ├── pages/{auth,admin,donasi,berita,kegiatan}/
  ├── hooks/
  ├── lib/
  ├── contexts/
  └── styles/
  ```

### 1.2 Dependencies
```bash
# Core
npm install react-router-dom@6 axios @tanstack/react-query@5

# Styling
npm install -D tailwindcss postcss autoprefixer
npm install class-variance-authority clsx tailwind-merge

# UI Primitives (for shadcn-style components)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-progress
npm install @radix-ui/react-slot

# Forms
npm install react-hook-form @hookform/resolvers zod

# Optional
npm install framer-motion
```

### 1.3 Tailwind Configuration
Create `tailwind.config.js` with:
- [x] Font families: `display` (Plus Jakarta Sans), `body` (Source Sans 3), `accent` (Fraunces)
- [x] Gradient colors: rose, blush, lavender, periwinkle, iris, sky, azure, cyan, mint, seafoam
- [x] Text colors: primary (#1C1C1E), secondary (#3C3C43), tertiary (#6B7280), muted (#9CA3AF), disabled (#C7C7CC)
- [x] Primary colors: DEFAULT (#0866FF), hover (#0055DB), light (#E7F0FF)
- [x] CTA colors: DEFAULT (#FF6B35), hover (#E55A28), light (#FFF0EB)
- [x] Status colors: urgent (#FF3B30), warning (#FF9500), success (#34C759), info (#007AFF)
- [x] Background images: `eos-gradient`, `eos-gradient-simple`
- [x] Backdrop blur: `glass` (12px)
- [x] Box shadows: subtle, soft, medium, strong
- [x] Animations: fade-up, fade-in, slide-in with keyframes

### 1.4 Global Styles (`globals.css`)
- [x] Import Google Fonts (Plus Jakarta Sans, Source Sans 3, Fraunces)
- [x] Base layer: html scroll-behavior, body gradient + font, heading styles, selection color
- [x] Components layer:
  - [x] `.btn` base + variants (primary, secondary, cta, outline, ghost)
  - [x] `.card` base + variants (default, interactive, solid)
  - [x] `.navbar`, `.nav-link`, `.nav-link-active`
  - [x] `.text-balance`, `.link`
  - [x] `.section`, `.section-tight`
  - [x] `.container-narrow`, `.container-wide`
- [x] Utilities layer: `.delay-100` to `.delay-400`, `.pb-safe`

### 1.5 Environment Setup
- [x] Create `.env` with `VITE_API_URL=http://localhost:3000/api`
- [x] Create `.env.example`

---

## Phase 2: Core Infrastructure (4-5 hrs)

### 2.1 API Layer (`lib/api.ts`)
- [x] Create Axios instance with baseURL, withCredentials
- [x] Response interceptor for error handling (401, 403, 500)
- [x] Request interceptor if needed

### 2.2 Type Definitions (`lib/types.ts`)
- [x] Enums: `Role`, `KegiatanCategory`, `DonationStatus` (as const objects)
- [x] Interfaces: `User`, `Berita`, `About`, `Kegiatan`, `Donasi`, `DonasiTransaction`
- [x] `DashboardStats` interface
- [x] `ApiResponse<T>`, `PaginationMeta` interfaces
- [x] `CreateTransactionResponse` interface

### 2.3 Utility Functions (`lib/utils.ts`)
- [x] `cn()` - className merger (clsx + tailwind-merge)
- [x] `formatCurrency(amount: number)` - format to "Rp X.XXX.XXX"
- [x] `formatDate(date: string)` - format to "15 Mar 2024"
- [x] `calculateProgress(current: number, target: number)` - percentage

### 2.4 Auth Context (`contexts/AuthContext.tsx`)
- [x] AuthProvider component
- [x] State: user, isLoading, isAuthenticated
- [x] Methods: login, logout, register, updateProfile
- [x] Auto-fetch user on mount (GET /auth/me)

### 2.5 Auth Hook (`hooks/useAuth.ts`)
- [x] Export useAuth hook to consume context
- [x] Type-safe return values

### 2.6 React Query Setup
- [x] Configure QueryClient in main.tsx
- [x] Create query hooks:
  - [x] `hooks/useBerita.ts` - queries + mutations
  - [x] `hooks/useKegiatan.ts` - queries + mutations  
  - [x] `hooks/useAbout.ts` - queries + mutations
  - [x] `hooks/useDonasi.ts` - queries + mutations
  - [x] `hooks/useDashboard.ts` - dashboard stats query

### 2.7 Routing (`main.tsx` or `App.tsx`)
- [x] Configure React Router v6
- [x] Public routes: `/`, `/about`, `/berita`, `/berita/:id`, `/kegiatan`, `/kegiatan/:id`, `/donasi`, `/donasi/:id`
- [x] Auth routes: `/auth/login`, `/auth/register`
- [x] Admin routes: `/admin`, `/admin/berita`, `/admin/about`, `/admin/kegiatan`, `/admin/donasi`, `/admin/donasi/:id/transactions`
- [x] Protected route wrapper for admin routes
- [x] Auth redirect logic

---

## Phase 3: UI Components (6-8 hrs)

### 3.1 Base UI Components (`components/ui/`)
Based on spec's component classes:

- [x] `Button.tsx` - 6 variants (primary, secondary, cta, outline, ghost, danger)
  - primary: bg-primary, text-white, hover shadow
  - secondary: bg-white/85, backdrop-blur, border
  - cta: bg-cta, text-white, bold, large, shadow-medium, glow on hover
  - outline: border-2, hover bg swap
  - ghost: text-primary, hover bg-primary-light

- [x] `Card.tsx` - 3 variants + sub-components
  - default: bg-white/85, backdrop-blur-glass, rounded-2xl, shadow-soft, border
  - interactive: + cursor-pointer, hover lift + shadow
  - solid: bg-white (no transparency)

- [x] `Input.tsx` - text input with label, error state, glass style
- [x] `Textarea.tsx` - multiline input with label, error state
- [x] `Select.tsx` - native dropdown with custom styling
- [x] `Badge.tsx` - category badges, status pills (6 variants)
- [x] `Progress.tsx` - progress bar for donations (3 sizes)
- [x] `Skeleton.tsx` - loading skeletons (text, circular, rectangular) + presets
- [x] `Dialog.tsx` - modal dialogs with Radix

### 3.2 Layout Components (`components/layout/`)

- [x] `Navbar.tsx` - Desktop sticky navbar
  - bg-white/88 backdrop-blur-glass
  - Logo + "EOS Care" text
  - Nav links: Beranda, Tentang, Berita, Kegiatan
  - Active state: text-primary + font-semibold
  - Donasi CTA button (btn-cta)

- [x] `MobileNav.tsx` - Mobile bottom bar
  - fixed bottom-0, bg-white/88 backdrop-blur-glass
  - h-16 with pb-safe
  - Items: Beranda, Berita, [DONASI], Kegiatan, Menu
  - Floating Donasi button: -mt-6, rounded-full, w-14 h-14, bg-cta, shadow-strong
  - Active: text-primary

- [x] `Footer.tsx` - Site footer
- [x] `PageLayout.tsx` - Public page wrapper (navbar + content + footer + mobile nav)
- [x] `AdminLayout.tsx` - Admin wrapper with sidebar

---

## Phase 4: Public Pages (10-12 hrs) ✅ COMPLETE

### 4.1 Home Page (`/`)

**Components to build:** (Implemented inline in HomePage.tsx - LEVER principle)
- [x] `components/home/HeroSection.tsx`
  - Centered layout on gradient
  - H1: "Bersama Membangun Harapan" (text-5xl/6xl)
  - Subtitle (text-text-secondary)
  - Two buttons: [Donasi Sekarang] btn-cta, [Lihat Kegiatan] btn-secondary
  - Orchestrated fade-up animation (staggered 100ms delays)

- [x] `components/home/ImpactStats.tsx` (inline with useCountUp hook)
  - 3 glass cards in a row
  - Stats: "1,200+ Keluarga Terbantu", "50+ Kegiatan Sosial", "Rp 500Jt+ Dana Tersalur"
  - Numbers: font-accent text-4xl text-primary
  - Labels: text-text-muted text-sm
  - Count-up animation on scroll

- [x] `components/home/ServicesSection.tsx` (redesigned with modern bento grid)
  - Section title: "Layanan Kami" (text-3xl font-display text-center)
  - 3 card-interactive cards: Bantuan Bencana, Pendidikan, Pemberdayaan
  - Hover: lift + shadow-medium

- [x] `components/home/FeaturedDonasi.tsx` (integrated in services section)
  - Show 2-3 active donation programs
  - Link to /donasi

- [x] `pages/HomePage.tsx` - Fully redesigned with modern design skill

### 4.2 About Page (`/about`)

- [x] `components/about/AboutSection.tsx` (inline in page)
  - Single section with title, content, optional image
  - Ordered by `order` field

- [x] `pages/AboutPage.tsx`
  - Fetch from GET /api/public/about
  - Render AboutSection for each item

### 4.3 Donasi Pages ✅

- [x] `components/donasi/DonasiProgress.tsx` (inline in pages)
  - Progress bar showing currentAmount / targetAmount
  - Percentage text
  - "Rp X terkumpul dari Rp Y" text

- [x] `components/donasi/DonasiCard.tsx` (inline in DonasiListPage)
  - Image (16:9)
  - Title
  - DonasiProgress
  - Deadline (if exists)
  - [Donasi Sekarang] btn-cta
  - card-interactive

- [x] `components/donasi/DonasiGrid.tsx` (inline grid layout)
  - Responsive grid of DonasiCard

- [x] `components/donasi/DonateForm.tsx` (inline in DonasiDetailPage)
  - Fields: donorName*, donorEmail (optional), amount*, message (optional)
  - Quick amount buttons: Rp 50rb, 100rb, 250rb, 500rb, 1M
  - Submit button: btn-cta w-full
  - React Hook Form + Zod validation

- [x] `components/donasi/DonateModal.tsx` (Midtrans Snap integration)
  - Midtrans Snap wrapper
  - Handle success/pending/error/close callbacks

- [x] `pages/donasi/DonasiListPage.tsx` - List donation programs
  - Hero: "Program Donasi" title
  - DonasiGrid (inline)
  - Loading skeletons

- [x] `pages/donasi/DonasiDetailPage.tsx` - Donation detail + form
  - Hero image
  - Info card with progress, deadline, donor count
  - DonateForm (inline)
  - Description
  - Midtrans integration

### 4.4 Berita Pages ✅

- [x] `NewsCard` component (inline in BeritaListPage)
  - Image with gradient overlay, date, excerpt
  - Featured variant (large, spanning) + regular cards
  - Hover effects, scroll reveal animations

- [x] `NewsGrid` - Magazine-style layout (inline)
  - Featured first news (large, span 2 cols/rows)
  - Smaller cards for remaining news
  - Responsive grid layout

- [x] `BeritaListPage.tsx` - News list
  - Magazine grid layout with featured first
  - Modern header with badge + subtitle
  - Empty state with icon
  - Loading skeletons

- [x] `BeritaDetailPage.tsx` - News detail
  - Hero image with shadow
  - Author avatar + date meta
  - Share buttons (Facebook, X, WhatsApp, Copy)
  - Donation CTA card if linked to donasi
  - Scroll reveal animations

### 4.5 Kegiatan Pages ✅

- [x] `CategoryFilter` (inline in KegiatanListPage)
  - Gradient pills with icons (📋🤝📚💼)
  - Active state with gradient background
  - Smooth transitions

- [x] `ActivityCard` component (inline)
  - Image with category badge overlay
  - Category-colored accents (rose/blue/emerald)
  - Date with icon, title, description
  - Gradient accent bar in footer
  - Hover effects, scroll reveal

- [x] `KegiatanListPage.tsx` - Activities list
  - Category filter with icons + gradients
  - Cards with category-colored badges
  - Empty state with contextual message
  - Loading skeletons

- [x] `KegiatanDetailPage.tsx` - Activity detail
  - Hero image with category badge
  - Event info card (date, category, status)
  - Category-themed colors throughout
  - Share buttons
  - Donation CTA if linked

---

## Phase 5: Midtrans Integration (3-4 hrs) ✅

### 5.1 Setup
- [x] Add Snap.js to index.html with sandbox client key
- [x] Type declarations for `window.snap` (inline in DonasiDetailPage)

### 5.2 Payment Flow
- [x] DonateForm calls `POST /api/public/donasi/:id/donate`
- [x] Extract snapToken from response
- [x] Call `window.snap.pay(snapToken, callbacks)`
- [x] Handle callbacks: success, pending, error, close

### 5.3 UI Feedback
- [x] Loading state during transaction creation
- [x] Quick amount buttons (50K, 100K, 250K, 500K, 1M)
- [x] Alert messages for payment status

---

## Phase 6: Auth Pages (3-4 hrs)

### 6.1 Login Page (`/auth/login`)
- [x] Login form (email, password)
- [x] Zod validation schema
- [x] Submit to POST /api/auth/login
- [x] Handle errors (show message)
- [x] On success: update auth context, redirect to /admin or /
- [x] Google OAuth button (link to /api/auth/google)
- [x] Link to register

### 6.2 Register Page (`/auth/register`)
- [x] Register form (name, email, password, confirmPassword)
- [x] Zod validation
- [x] Submit to POST /api/auth/register
- [x] Handle errors
- [x] On success: redirect to login
- [x] Link to login

### 6.3 Protected Routes
- [x] Create ProtectedRoute component
- [x] Check isAuthenticated + role
- [x] Redirect to /auth/login if not authenticated
- [x] Redirect to / if not ADMIN (for admin routes)

---

## Phase 7: Admin Dashboard (8-10 hrs)

### 7.1 Admin Layout
- [x] `components/admin/Sidebar.tsx` (inline in AdminLayout)
  - Fixed left sidebar
  - Links: Dashboard, Berita, Kegiatan, About, Donasi
  - Logout button
  - Active state styling

- [x] Update `AdminLayout.tsx` to include Sidebar

### 7.2 Dashboard Page (`/admin`)

- [x] `components/admin/StatCard.tsx` (was DashboardStats)
  - 4 stat cards: Users (total), Berita (published/total), Kegiatan (active/total), Donasi (active/total)
  - Fetch from GET /api/admin/dashboard

- [x] `components/admin/DonutChart.tsx` (was DonationProgress)
  - Total Target vs Total Collected
  - Animated circular progress

- [x] `components/admin/ActivityFeed.tsx` (was RecentTransactions)
  - ✅ Now uses real API endpoint `/api/admin/activities`
  - Table: Donor, Program, Amount, Status, Date
  - Status badges (COMPLETED=green, PENDING=yellow, FAILED=red)

- [x] `pages/admin/AdminDashboard.tsx` - Assemble dashboard

### 7.3 Reusable Admin Components

- [x] `components/admin/DataTable.tsx`
  - Reusable table with columns config
  - Search input with filtering
  - Loading skeletons with shimmer
  - Empty state with custom icon/message
  - Staggered row animations

- [x] `components/admin/DrawerModal.tsx` (was FormModal)
  - Right-sliding drawer (full-screen on mobile)
  - Form helper components: FormField, FormInput, FormTextarea, FormSelect, FormFileInput, FormCheckbox, FormButton
  - Image upload support via FormFileInput

- [x] `components/admin/FormFileInput` (was ImageUpload)
  - Label-wrapped for reliable clicks
  - File name display
  - Accepts image/* files

- [x] Delete confirmation
  - Using native `confirm()` dialog (inline in pages)

### 7.4 Berita Admin (`/admin/berita`)
- [x] DataTable with columns: Title, Published, Author, Date, Actions
- [x] Create/Edit form fields: title, content, image, isPublished, showDonationButton, donasiId (dropdown)
- [x] Donasi dropdown: fetch from GET /api/admin/donasi/list/active
- [x] Delete with confirmation

### 7.5 About Admin (`/admin/about`)
- [x] DataTable with columns: Title, Order, Actions
- [x] Create/Edit form fields: title, content, image, order
- [x] Delete with confirmation

### 7.6 Kegiatan Admin (`/admin/kegiatan`)
- [x] DataTable with columns: Title, Category, Active, Date, Actions
- [x] Category filter (Semua, Sosial, Pendidikan, Pelatihan)
- [x] Create/Edit form fields: title, description, image, category (select), date, isActive, showDonationButton, donasiId
- [x] Delete with confirmation

### 7.9 Team Admin (`/admin/team`) - ADDED
- [x] DataTable with columns: Photo, Name, Role, Order, Active, Actions
- [x] Create/Edit form fields: name, role, photo (file upload), order, isActive
- [x] Photo upload with FormData
- [x] Delete with confirmation

### 7.7 Donasi Admin (`/admin/donasi`)
- [x] DataTable with columns: Title, Progress (current/target), Active, Deadline, Actions
- [x] Create/Edit form fields: title, description, image, targetAmount, deadline, isActive
- [x] View transactions link
- [x] Delete with confirmation

### 7.8 Transactions Page (`/admin/donasi/:id/transactions`)
- [x] DataTable with columns: Donor, Email, Amount, Message, Status, Payment Type, Date
- [x] Fetch from GET /api/admin/donasi/:id/transactions
- [x] Back button to /admin/donasi

---

## Phase 8: Animation & Hooks (2-3 hrs) ✅ COMPLETE

### 8.1 Animation Hooks
- [x] `hooks/useScrollReveal.ts` - Intersection Observer for fade-in on scroll
- [x] `hooks/useCountUp.ts` - Animated number counting
- [x] useScrollReveal includes intersection observer

### 8.2 Implement Animations
- [x] Hero section: staggered fade-up (100ms intervals)
- [x] Stats: count-up animation triggered on scroll
- [x] Cards: fade-up on scroll into view (staggered delays)
- [x] Images: hover scale transitions

### 8.3 Hover States
- [x] Cards: translateY + shadow-medium on hover
- [x] Buttons: active:scale-95 press feedback
- [x] Focus states: focus-visible:ring-2 on all interactive elements
- [x] Links: color transition

---

## Phase 9: Polish & Testing (4-6 hrs) - PARTIAL

### 9.1 Loading States
- [x] Skeleton loaders for all lists (DataTable, cards)
- [x] Loading spinner/overlay for form submissions
- [x] Query loading states (isLoading checks)

### 9.2 Error States
- [ ] Error boundaries (not implemented)
- [x] Empty states (no data messages) - all pages have empty states
- [ ] API error handling with toast notifications (using alerts)
- [ ] 404 page (not implemented)

### 9.3 Responsive Testing
- [x] Mobile (< 640px): bottom nav, single column, stacked layouts
- [x] Tablet (640-1024px): top nav, 2 columns
- [x] Desktop (> 1024px): full layouts, max-width containers
- [x] Touch targets: DrawerModal full-screen on mobile

### 9.4 Accessibility
- [ ] Keyboard navigation (partial)
- [x] Focus states (focus-visible:ring-2 on all interactive elements)
- [ ] ARIA labels on interactive elements (partial)
- [x] Alt text on images
- [ ] Color contrast check (not audited)

### 9.5 Performance
- [ ] Lazy load routes (React.lazy + Suspense) - not done
- [x] Image optimization (object-cover, hover transitions)
- [x] Bundle size check - 638KB (could be improved with code splitting)
- [ ] Lighthouse audit (not done)

### 9.6 Final QA
- [x] Test all public pages - working
- [x] Test auth flow (login, logout, protected routes) - working
- [x] Test admin CRUD (create, read, update, delete) - working
- [x] Test donation flow with Midtrans sandbox - working
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge) - not done

---

## API Quick Reference

### Public
| Endpoint | Description |
|----------|-------------|
| `GET /public/berita` | Published news (paginated) |
| `GET /public/berita/:id` | Single news |
| `GET /public/about` | About sections |
| `GET /public/kegiatan` | Active activities |
| `GET /public/kegiatan/:id` | Single activity |
| `GET /public/donasi` | Active donations |
| `GET /public/donasi/:id` | Single donation |
| `POST /public/donasi/:id/donate` | Create transaction → snapToken |

### Auth
| Endpoint | Description |
|----------|-------------|
| `POST /auth/register` | Register |
| `POST /auth/login` | Login |
| `POST /auth/logout` | Logout |
| `GET /auth/me` | Current user |
| `PUT /auth/profile` | Update profile |
| `GET /auth/google` | Google OAuth |

### Admin
| Endpoint | Description |
|----------|-------------|
| `GET /admin/dashboard` | Dashboard stats |
| `* /admin/berita/*` | Berita CRUD |
| `* /admin/about/*` | About CRUD |
| `* /admin/kegiatan/*` | Kegiatan CRUD |
| `* /admin/donasi/*` | Donasi CRUD |
| `GET /admin/donasi/list/active` | Dropdown options |
| `GET /admin/donasi/:id/transactions` | Transaction list |

---

## Notes

- Backend running at `http://localhost:3000`
- Auth: HTTP-only cookies + Bearer token (hybrid)
- Admin routes require ADMIN role
- Images uploaded to `/uploads/` on backend
- Midtrans in sandbox mode (use test cards)
- Default admin: `admin@eoscare.org` / `admin123`
