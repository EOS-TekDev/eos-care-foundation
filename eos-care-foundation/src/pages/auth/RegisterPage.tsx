import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await registerUser(data);
      navigate('/profile/setup', {
        state: { message: 'Registrasi berhasil! Lengkapi profil Anda.' },
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registrasi gagal. Silakan coba lagi.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cta to-cta-hover flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              <span className="text-xl font-display font-bold text-text-primary">EOS Care</span>
            </Link>
          </div>

          {/* Form header */}
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-text-primary">Buat Akun</h2>
            <p className="text-text-secondary mt-2">
              Bergabunglah untuk memulai misi kebaikan
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-status-urgent/10 border border-status-urgent/20 mb-6">
              <svg className="w-5 h-5 text-status-urgent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-status-urgent">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Nama lengkap Anda"
                  className={cn(
                    "w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border text-text-primary placeholder:text-text-muted transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta",
                    errors.name ? "border-status-urgent" : "border-gray-200"
                  )}
                />
              </div>
              {errors.name && (
                <p className="text-status-urgent text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="nama@email.com"
                  className={cn(
                    "w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border text-text-primary placeholder:text-text-muted transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta",
                    errors.email ? "border-status-urgent" : "border-gray-200"
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-status-urgent text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password fields in grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    {...register('password')}
                    placeholder="••••••••"
                    className={cn(
                      "w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border text-text-primary placeholder:text-text-muted transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta",
                      errors.password ? "border-status-urgent" : "border-gray-200"
                    )}
                  />
                </div>
                {errors.password && (
                  <p className="text-status-urgent text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Konfirmasi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="••••••••"
                    className={cn(
                      "w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border text-text-primary placeholder:text-text-muted transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta",
                      errors.confirmPassword ? "border-status-urgent" : "border-gray-200"
                    )}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-status-urgent text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "relative w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200",
                "bg-gradient-to-r from-cta to-cta-hover",
                "hover:shadow-lg hover:shadow-cta/25 hover:scale-[1.01]",
                "focus:outline-none focus:ring-2 focus:ring-cta/50 focus:ring-offset-2",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </span>
              ) : (
                'Daftar Sekarang'
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center mt-8 text-text-secondary">
            Sudah punya akun?{' '}
            <Link to="/auth/login" className="font-semibold text-cta hover:text-cta-hover transition-colors">
              Masuk
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[45%] relative overflow-hidden">
        {/* Gradient background - using CTA orange */}
        <div className="absolute inset-0 bg-gradient-to-bl from-cta via-cta to-cta-hover" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circles" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circles)" />
          </svg>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-32 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <span className="text-2xl font-display font-bold text-white">EOS Care</span>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-display font-bold text-white leading-tight mb-6">
            Mulai Perjalanan<br />
            <span className="font-accent italic font-normal opacity-90">Kebaikan</span>
          </h1>
          
          <p className="text-white/70 text-lg max-w-md mb-12">
            Bergabunglah dengan ribuan donatur yang telah membantu sesama melalui platform kami.
          </p>

          {/* Features list */}
          <div className="space-y-4">
            {[
              'Donasi mudah dan aman',
              'Laporan transparan',
              'Pilihan program beragam',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
}
