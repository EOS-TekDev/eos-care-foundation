import { useMemo } from 'react';
import {
  useAdminHomeHero,
  useCreateHomeHero,
  useUpdateHomeHero,
  useDeleteHomeHero,
  type HomeHero,
  type HomeHeroForm,
} from '../../hooks/useHome';
import { useCrudState } from '../../hooks/useCrudState';
import { useFormTabs } from '../../hooks/useFormTabs';
import { ConfigPageLayout } from '../../components/admin/ConfigPageLayout';
import { FormField, FormInput, FormTextarea, FormCheckbox } from '../../components/ui/Form';
import { Icons } from '../../components/ui/Icons';

const defaultFormData: HomeHeroForm = {
  badge: 'Yayasan Sosial Terpercaya',
  headline: 'Bersama\nMembangun\nHarapan',
  subheadline: 'Bergabunglah dalam misi kemanusiaan untuk menghadirkan perubahan nyata bagi mereka yang membutuhkan.',
  ctaPrimary: 'Donasi Sekarang',
  ctaSecondary: 'Lihat Kegiatan',
  cardTitle: 'Bantuan Bencana',
  cardDesc: 'Respon cepat untuk korban bencana alam di seluruh Indonesia',
  cardBadge: 'Aktif Membantu',
  volunteerCount: '+500 relawan',
  todayAmount: 'Rp 2.5M',
  isActive: true,
};

const TABS = [
  { id: 'content', label: 'Konten Utama' },
  { id: 'card', label: 'Floating Card' },
  { id: 'cta', label: 'Tombol CTA' },
];

export function AdminHomeHero() {
  const crud = useCrudState<HomeHero, HomeHeroForm>({
    useList: useAdminHomeHero,
    useCreate: useCreateHomeHero,
    useUpdate: useUpdateHomeHero,
    useDelete: useDeleteHomeHero,
    getDefaultFormData: () => defaultFormData,
    mapItemToFormData: (item) => ({ ...item }),
    deleteConfirmMessage: 'Yakin ingin menghapus konfigurasi ini?',
  });

  const { activeTab, TabNavigation, setActiveTab } = useFormTabs(TABS);

  // Reset tab on create/edit
  const handleCreateWithTabReset = () => {
    setActiveTab('content');
    crud.handleCreate();
  };

  const handleEditWithTabReset = (item: HomeHero) => {
    setActiveTab('content');
    crud.handleEdit(item);
  };

  // Active item logic
  const activeItem = useMemo(() => crud.items.find((h) => h.isActive) || null, [crud.items]);

  const handleSubmit = async (e: React.FormEvent) => {
    const submitData = { ...defaultFormData, ...crud.formData } as HomeHeroForm;
    await crud.handleSubmit(e, submitData);
  };

  return (
    <ConfigPageLayout
      title="Hero Homepage"
      subtitle="Kelola konten utama halaman beranda"
      addLabel="Tambah Konfigurasi"
      emptyTitle="Belum ada konfigurasi"
      emptyDescription="Buat konfigurasi hero section pertama Anda"
      emptyIcon={<Icons.image className="w-8 h-8 text-text-muted" />}
      
      items={crud.items}
      activeItem={activeItem}
      isLoading={crud.isLoading}
      
      isFormOpen={crud.isFormOpen}
      editingItem={crud.editingItem}
      handleCreate={handleCreateWithTabReset}
      handleCloseForm={crud.handleCloseForm}
      handleEdit={handleEditWithTabReset}
      handleDelete={crud.handleDelete}
      
      formId="hero-form"
      formTitle="Tambah Konfigurasi Hero"
      formTitleEdit="Edit Konfigurasi Hero"
      formSubtitle="Buat tampilan hero section baru"
      formSubtitleEdit="Perbarui konten hero section"
      submitLabel="Simpan Konfigurasi"
      submitLabelEdit="Simpan Perubahan"
      
      renderActivePreview={(activeHero) => (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Content Preview */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-warm-100 text-sm text-text-secondary dark:bg-white/10 dark:border-white/20 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-forest" />
              {activeHero.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink leading-tight whitespace-pre-line dark:text-white">
              {activeHero.headline}
            </h2>
            <p className="text-text-secondary dark:text-gray-400">{activeHero.subheadline}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-4 py-2 bg-cta text-white font-medium rounded-xl text-sm">
                {activeHero.ctaPrimary}
              </span>
              <span className="px-4 py-2 bg-white border border-warm-200 text-text-primary font-medium rounded-xl text-sm dark:bg-white/10 dark:border-white/20 dark:text-white">
                {activeHero.ctaSecondary}
              </span>
            </div>
          </div>

          {/* Floating Card Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-forest/5 rounded-3xl transform rotate-3" />
            <div className="relative bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-strong dark:bg-white/10 dark:border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-ocean/10 flex items-center justify-center text-2xl">
                  🌊
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-ink dark:text-white">{activeHero.cardTitle}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-forest/10 text-forest text-[10px] font-medium uppercase tracking-wider">
                      {activeHero.cardBadge}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed dark:text-gray-400">
                    {activeHero.cardDesc}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-warm-100 dark:border-white/10">
                <div>
                  <p className="text-xs text-text-muted mb-0.5 dark:text-gray-500">Relawan</p>
                  <p className="font-semibold text-ink dark:text-white">{activeHero.volunteerCount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted mb-0.5 dark:text-gray-500">Terkumpul Hari Ini</p>
                  <p className="font-semibold text-forest">{activeHero.todayAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      renderConfigCard={(item) => ({
        title: item.headline.split('\n')[0],
        description: item.subheadline,
        badge: item.badge,
        content: (
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-text-muted mb-1">Buttons</p>
              <p className="font-medium text-ink truncate dark:text-white">
                {item.ctaPrimary}, {item.ctaSecondary}
              </p>
            </div>
            <div>
              <p className="text-text-muted mb-1">Card</p>
              <p className="font-medium text-ink truncate dark:text-white">{item.cardTitle}</p>
            </div>
          </div>
        ),
      })}
    >
      <form id="hero-form" onSubmit={handleSubmit}>
        <TabNavigation />

        <div className="space-y-5 min-h-[300px]">
          {activeTab === 'content' && (
            <div className="space-y-5 animate-fade-in">
              <FormField label="Badge Atas" required>
                <FormInput
                  value={crud.formData.badge || ''}
                  onChange={(e) => crud.updateField('badge', e.target.value)}
                  placeholder="Contoh: Yayasan Sosial Terpercaya"
                />
              </FormField>
              <FormField label="Headline Utama" required hint="Gunakan Enter untuk baris baru">
                <FormTextarea
                  value={crud.formData.headline || ''}
                  onChange={(e) => crud.updateField('headline', e.target.value)}
                  rows={3}
                  placeholder="Contoh: Bersama Membangun Harapan"
                />
              </FormField>
              <FormField label="Subheadline" required>
                <FormTextarea
                  value={crud.formData.subheadline || ''}
                  onChange={(e) => crud.updateField('subheadline', e.target.value)}
                  rows={3}
                  placeholder="Deskripsi singkat di bawah headline"
                />
              </FormField>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Judul Card" required>
                  <FormInput
                    value={crud.formData.cardTitle || ''}
                    onChange={(e) => crud.updateField('cardTitle', e.target.value)}
                  />
                </FormField>
                <FormField label="Badge Card" required>
                  <FormInput
                    value={crud.formData.cardBadge || ''}
                    onChange={(e) => crud.updateField('cardBadge', e.target.value)}
                  />
                </FormField>
              </div>
              <FormField label="Deskripsi Card" required>
                <FormTextarea
                  value={crud.formData.cardDesc || ''}
                  onChange={(e) => crud.updateField('cardDesc', e.target.value)}
                  rows={3}
                />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Info Relawan" required>
                  <FormInput
                    value={crud.formData.volunteerCount || ''}
                    onChange={(e) => crud.updateField('volunteerCount', e.target.value)}
                  />
                </FormField>
                <FormField label="Info Donasi" required>
                  <FormInput
                    value={crud.formData.todayAmount || ''}
                    onChange={(e) => crud.updateField('todayAmount', e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          )}

          {activeTab === 'cta' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Tombol Utama" required>
                  <FormInput
                    value={crud.formData.ctaPrimary || ''}
                    onChange={(e) => crud.updateField('ctaPrimary', e.target.value)}
                  />
                </FormField>
                <FormField label="Tombol Sekunder" required>
                  <FormInput
                    value={crud.formData.ctaSecondary || ''}
                    onChange={(e) => crud.updateField('ctaSecondary', e.target.value)}
                  />
                </FormField>
              </div>
              
              <div className="pt-4 border-t border-warm-100 dark:border-white/10">
                <FormCheckbox
                  label="Aktifkan Konfigurasi Ini"
                  checked={crud.formData.isActive || false}
                  onChange={(e) => crud.updateField('isActive', e.target.checked)}
                />
                <p className="text-xs text-text-muted mt-1 ml-8">
                  Jika diaktifkan, konfigurasi lain akan otomatis dinonaktifkan.
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </ConfigPageLayout>
  );
}
