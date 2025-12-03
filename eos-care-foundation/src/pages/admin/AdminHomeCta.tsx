import { useMemo } from 'react';
import {
  useAdminHomeCta,
  useCreateHomeCta,
  useUpdateHomeCta,
  useDeleteHomeCta,
  type HomeCta,
  type HomeCtaForm,
} from '../../hooks/useHome';
import { useCrudState } from '../../hooks/useCrudState';
import { useFormTabs } from '../../hooks/useFormTabs';
import { ConfigPageLayout } from '../../components/admin/ConfigPageLayout';
import { FormField, FormInput, FormTextarea, FormCheckbox } from '../../components/ui/Form';
import { Icons } from '../../components/ui/Icons';

const defaultFormData: HomeCtaForm = {
  trustBadges: 'Terverifikasi oleh Kemenkumham • Diawasi oleh Dinsos',
  headline: 'Wujudkan Kebaikan\nSetiap Hari',
  subheadline: 'Mulai perjalanan kebaikanmu hari ini dengan langkah kecil yang membawa dampak besar.',
  description: 'Donasi Anda disalurkan 100% untuk program yang Anda pilih tanpa potongan biaya operasional.',
  minDonation: 'Mulai dari Rp 10.000',
  ctaPrimary: 'Donasi Sekarang',
  ctaSecondary: 'Pelajari Lebih Lanjut',
  cardTitle: 'Target Bulan Ini',
  cardProgress: 75,
  testimonial: 'Terima kasih telah menjadi jembatan kebaikan bagi mereka yang membutuhkan.',
  testimonialAuthor: 'Ahmad, Donatur Rutin',
  isActive: true,
};

const TABS = [
  { id: 'content', label: 'Konten Utama' },
  { id: 'card', label: 'Card & Progress' },
  { id: 'cta', label: 'Tombol & Footer' },
];

export function AdminHomeCta() {
  const crud = useCrudState<HomeCta, HomeCtaForm>({
    useList: useAdminHomeCta,
    useCreate: useCreateHomeCta,
    useUpdate: useUpdateHomeCta,
    useDelete: useDeleteHomeCta,
    getDefaultFormData: () => defaultFormData,
    mapItemToFormData: (item) => ({
      ...item,
      testimonial: item.testimonial || undefined,
      testimonialAuthor: item.testimonialAuthor || undefined,
    }),
    deleteConfirmMessage: 'Yakin ingin menghapus konfigurasi CTA ini?',
  });

  const { activeTab, TabNavigation, setActiveTab } = useFormTabs(TABS);

  // Reset tab on create/edit
  const handleCreateWithTabReset = () => {
    setActiveTab('content');
    crud.handleCreate();
  };

  const handleEditWithTabReset = (item: HomeCta) => {
    setActiveTab('content');
    crud.handleEdit(item);
  };

  const activeItem = useMemo(() => crud.items.find((i) => i.isActive) || null, [crud.items]);

  const handleSubmit = async (e: React.FormEvent) => {
    const submitData = { ...defaultFormData, ...crud.formData } as HomeCtaForm;
    await crud.handleSubmit(e, submitData);
  };

  return (
    <ConfigPageLayout
      title="CTA Section"
      subtitle="Kelola bagian Call to Action di bagian bawah homepage"
      addLabel="Tambah Konfigurasi"
      emptyTitle="Belum ada konfigurasi CTA"
      emptyDescription="Buat konfigurasi CTA pertama Anda"
      emptyIcon={<Icons.settings className="w-8 h-8 text-text-muted" />}
      
      items={crud.items}
      activeItem={activeItem}
      isLoading={crud.isLoading}
      
      isFormOpen={crud.isFormOpen}
      editingItem={crud.editingItem}
      handleCreate={handleCreateWithTabReset}
      handleCloseForm={crud.handleCloseForm}
      handleEdit={handleEditWithTabReset}
      handleDelete={crud.handleDelete}
      
      formId="cta-form"
      formTitle="Tambah Konfigurasi CTA"
      formTitleEdit="Edit Konfigurasi CTA"
      formSubtitle="Buat tampilan CTA baru"
      formSubtitleEdit="Perbarui konten CTA section"
      submitLabel="Simpan Konfigurasi"
      submitLabelEdit="Simpan Perubahan"
      
      renderActivePreview={(activeCta) => (
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-xs font-medium text-forest">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
              {activeCta.trustBadges}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink leading-tight whitespace-pre-line dark:text-white">
              {activeCta.headline}
            </h2>
            <p className="text-text-secondary leading-relaxed dark:text-gray-400">
              {activeCta.subheadline}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2.5 bg-forest text-white font-medium rounded-xl shadow-soft">
                {activeCta.ctaPrimary}
              </span>
              <span className="px-5 py-2.5 bg-white border border-warm-200 text-text-primary font-medium rounded-xl dark:bg-white/10 dark:border-white/20 dark:text-white">
                {activeCta.ctaSecondary}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-warm-100 shadow-lg dark:bg-white/10 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-ink dark:text-white">{activeCta.cardTitle}</h3>
              <span className="text-2xl font-bold text-forest">{activeCta.cardProgress}%</span>
            </div>
            <div className="h-3 bg-warm-100 rounded-full overflow-hidden mb-6 dark:bg-white/20">
              <div 
                className="h-full bg-forest rounded-full relative overflow-hidden"
                style={{ width: `${activeCta.cardProgress}%` }}
              />
            </div>
            {activeCta.testimonial && (
              <div className="bg-warm-50 p-4 rounded-2xl border border-warm-100 dark:bg-white/5 dark:border-white/10">
                <p className="text-sm text-text-secondary italic mb-2 dark:text-gray-400">"{activeCta.testimonial}"</p>
                <p className="text-xs font-medium text-ink dark:text-white">— {activeCta.testimonialAuthor}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      renderConfigCard={(item) => ({
        title: item.headline.split('\n')[0],
        description: item.subheadline,
        badge: item.isActive ? 'Active' : undefined,
        content: (
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-text-muted mb-1">Primary Button</p>
              <p className="font-medium text-ink truncate dark:text-white">{item.ctaPrimary}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1">Card Progress</p>
              <p className="font-medium text-forest">{item.cardProgress}%</p>
            </div>
          </div>
        ),
      })}
    >
      <form id="cta-form" onSubmit={handleSubmit}>
        <TabNavigation />

        <div className="space-y-5 min-h-[300px]">
          {activeTab === 'content' && (
            <div className="space-y-5 animate-fade-in">
              <FormField label="Trust Badges" required>
                <FormInput
                  value={crud.formData.trustBadges || ''}
                  onChange={(e) => crud.updateField('trustBadges', e.target.value)}
                  placeholder="Contoh: Terverifikasi oleh Kemenkumham..."
                />
              </FormField>
              <FormField label="Headline Utama" required hint="Gunakan Enter untuk baris baru">
                <FormTextarea
                  value={crud.formData.headline || ''}
                  onChange={(e) => crud.updateField('headline', e.target.value)}
                  rows={3}
                />
              </FormField>
              <FormField label="Subheadline" required>
                <FormTextarea
                  value={crud.formData.subheadline || ''}
                  onChange={(e) => crud.updateField('subheadline', e.target.value)}
                  rows={3}
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
                <FormField label="Progress (%)" required>
                  <div className="relative">
                    <FormInput
                      type="number"
                      value={crud.formData.cardProgress || 0}
                      onChange={(e) => crud.updateField('cardProgress', parseInt(e.target.value))}
                      min={0}
                      max={100}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">%</span>
                  </div>
                </FormField>
              </div>
              <FormField label="Testimonial" required>
                <FormTextarea
                  value={crud.formData.testimonial || ''}
                  onChange={(e) => crud.updateField('testimonial', e.target.value)}
                  rows={2}
                />
              </FormField>
              <FormField label="Penulis Testimonial" required>
                <FormInput
                  value={crud.formData.testimonialAuthor || ''}
                  onChange={(e) => crud.updateField('testimonialAuthor', e.target.value)}
                />
              </FormField>
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
              
              <FormField label="Deskripsi Footer" required>
                <FormInput
                  value={crud.formData.description || ''}
                  onChange={(e) => crud.updateField('description', e.target.value)}
                />
              </FormField>
              
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
