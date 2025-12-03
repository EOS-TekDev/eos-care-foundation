import { useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { cn, getImageUrl } from '../../lib/utils';

const profileSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSetupPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const state = location.state as { message?: string } | null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
    },
  });

  useEffect(() => {
    if (user?.name) {
      setValue('name', user.name);
    }
  }, [user?.name, setValue]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      await updateProfile({ name: data.name, photo: selectedFile });
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const avatarSrc = previewUrl || (user?.photo ? getImageUrl(user.photo) : null);
  const initial = user?.name?.charAt(0).toUpperCase() ?? '?';

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-warm-50/60 to-white">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-text-primary mb-2">
            Lengkapi Profil Anda
          </h1>
          <p className="text-text-secondary max-w-md mx-auto">
            Satu langkah lagi untuk mulai berkontribusi dalam berbagai program kebaikan.
          </p>
        </div>

        {state?.message && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            {state.message}
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] border border-warm-100/80 px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start mb-6">
            <div className="relative">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={user?.name ?? 'Avatar'}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-cta/70 shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cta/10 text-cta flex items-center justify-center text-3xl font-display border border-cta/30">
                  {initial}
                </div>
              )}

              <label
                className="absolute -bottom-2 -right-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-md border border-gray-100 text-[11px] font-medium text-text-secondary cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <svg
                  className="w-3.5 h-3.5 text-text-muted"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 7.5l1.5-1.5h7.5l1.5 1.5M9 16.5h6M5.25 19.5h13.5a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5H5.25A1.5 1.5 0 003.75 9v9a1.5 1.5 0 001.5 1.5z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Ubah foto
              </label>
            </div>

            <div className="flex-1 text-sm text-text-secondary space-y-1.5">
              <p className="font-medium text-text-primary">Tips foto profil</p>
              <p>- Gunakan foto yang jelas dan terang.</p>
              <p>- Disarankan rasio 1:1 (persegi).</p>
              <p>- Maksimal ukuran file 2MB untuk pengalaman terbaik.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Nama lengkap</label>
              <input
                type="text"
                {...register('name')}
                placeholder="Nama lengkap Anda"
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-white border text-text-primary placeholder:text-text-muted text-sm transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-cta/20 focus:border-cta',
                  errors.name ? 'border-status-urgent' : 'border-gray-200'
                )}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-status-urgent flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'relative w-full py-3 rounded-xl font-semibold text-white text-sm tracking-wide transition-all duration-200',
                'bg-gradient-to-r from-cta to-cta-hover',
                'hover:shadow-lg hover:shadow-cta/25 hover:scale-[1.01]',
                'focus:outline-none focus:ring-2 focus:ring-cta/50 focus:ring-offset-2 focus:ring-offset-warm-50',
                'disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none'
              )}
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan & Lanjutkan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
