// Constants (as const objects for type safety)
export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;
export type Role = typeof Role[keyof typeof Role];

export const KegiatanCategory = {
  SOSIAL: 'SOSIAL',
  PENDIDIKAN: 'PENDIDIKAN',
  PELATIHAN: 'PELATIHAN',
} as const;
export type KegiatanCategory = typeof KegiatanCategory[keyof typeof KegiatanCategory];

export const DonationStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
} as const;
export type DonationStatus = typeof DonationStatus[keyof typeof DonationStatus];

// Core interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  photo?: string;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Berita {
  id: string;
  title: string;
  content: string;
  image?: string;
  isPublished: boolean;
  showDonationButton: boolean;
  donasiId?: string;
  donasi?: Donasi;
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

export interface BeritaComment {
  id: string;
  beritaId: string;
  userId: string;
  parentId?: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    photo?: string;
  };
}

export interface About {
  id: string;
  title: string;
  content: string;
  image?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Kegiatan {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: KegiatanCategory;
  date: string;
  isActive: boolean;
  showDonationButton: boolean;
  donasiId?: string;
  donasi?: Donasi;
  createdAt: string;
  updatedAt: string;
}

export interface Donasi {
  id: string;
  title: string;
  description: string;
  image?: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  transactions?: DonasiTransaction[];
  _count?: {
    transactions: number;
  };
}

export interface DonasiTransaction {
  id: string;
  donasiId: string;
  donasi?: Donasi;
  donorName: string;
  donorEmail?: string;
  amount: number;
  message?: string;
  status: DonationStatus;
  midtransOrderId?: string;
  midtransPaymentType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  users: {
    total: number;
    admins: number;
  };
  berita: {
    total: number;
    published: number;
  };
  kegiatan: {
    total: number;
    active: number;
  };
  donasi: {
    total: number;
    active: number;
    totalTarget: number;
    totalCollected: number;
  };
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

export interface CreateTransactionResponse {
  success: boolean;
  data: {
    transaction: DonasiTransaction;
    snapToken: string;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface DonateForm {
  donorName: string;
  donorEmail?: string;
  amount: number;
  message?: string;
}

export interface BeritaForm {
  title: string;
  content: string;
  image?: File;
  isPublished: boolean;
  showDonationButton: boolean;
  donasiId?: string;
}

export interface AboutForm {
  title: string;
  content: string;
  image?: File;
  order: number;
}

export interface KegiatanForm {
  title: string;
  description: string;
  image?: File;
  category: KegiatanCategory;
  date: string;
  isActive: boolean;
  showDonationButton: boolean;
  donasiId?: string;
}

export interface DonasiForm {
  title: string;
  description: string;
  image?: File;
  targetAmount: number;
  deadline?: string;
  isActive: boolean;
}

export interface TeamMemberForm {
  name: string;
  role: string;
  photo?: File;
  order: number;
  isActive: boolean;
}
