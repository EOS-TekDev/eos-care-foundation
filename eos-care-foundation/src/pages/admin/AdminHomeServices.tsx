import { useMemo } from 'react';
import {
  useAdminHomeServices,
  useCreateHomeService,
  useUpdateHomeService,
  useDeleteHomeService,
  type HomeService,
  type HomeServiceForm,
} from '../../hooks/useHome';
import { useCrudState } from '../../hooks/useCrudState';
import { useFormTabs } from '../../hooks/useFormTabs';
import { ConfigPageLayout } from '../../components/admin/ConfigPageLayout';
import { FormField, FormInput, FormTextarea, FormSelect, FormCheckbox } from '../../components/ui/Form';
import { Icons } from '../../components/ui/Icons';

const defaultFormData: HomeServiceForm = {
  title: '',
  description: '',
  icon: 'heart',
  color: 'forest',
  stats: '',
  statsLabel: '',
  isFeatured: false,
  order: 0,
  isActive: true,
};

const TABS = [
  { id: 'content', label: 'Info Layanan' },
  { id: 'appearance', label: 'Tampilan' },
  { id: 'stats', label: 'Statistik' },
];

const ICONS = [
  { value: 'heart', label: 'Heart (Kesehatan)' },
  { value: 'book', label: 'Book (Pendidikan)' },
  { value: 'users', label: 'Users (Sosial)' },
  { value: 'home', label: 'Home (Infrastruktur)' },
  { value: 'leaf', label: 'Leaf (Lingkungan)' },
];

const COLORS = [
  { value: 'forest', label: 'Forest (Hijau)' },
  { value: 'ocean', label: 'Ocean (Biru)' },
  { value: 'sunset', label: 'Sunset (Merah)' },
  { value: 'purple', label: 'Royal (Ungu)' },
];

export function AdminHomeServices() {
  const crud = useCrudState<HomeService, HomeServiceForm>({
    useList: useAdminHomeServices,
    useCreate: useCreateHomeService,
    useUpdate: useUpdateHomeService,
    useDelete: useDeleteHomeService,
    getDefaultFormData: (items) => {
      const maxOrder = items?.reduce((max, item) => Math.max(max, item.order), 0) || 0;
      return { ...defaultFormData, order: maxOrder + 1 };
    },
    mapItemToFormData: (item) => ({ ...item }),
    deleteConfirmMessage: 'Yakin ingin menghapus layanan ini?',
  });

  const { activeTab, TabNavigation, setActiveTab } = useFormTabs(TABS);

  // Reset tab on create/edit
  const handleCreateWithTabReset = () => {
    setActiveTab('content');
    crud.handleCreate();
  };

  const handleEditWithTabReset = (item: HomeService) => {
    setActiveTab('content');
    crud.handleEdit(item);
  };

  // Active items (all active services are shown)
  const activeServices = useMemo(() => crud.items.filter((s) => s.isActive), [crud.items]);

  const handleSubmit = async (e: React.FormEvent) => {
    const submitData = { ...defaultFormData, ...crud.formData } as HomeServiceForm;
    await crud.handleSubmit(e, submitData);
  };

  return (
    <ConfigPageLayout
      title="Layanan Kami"
      subtitle="Kelola daftar layanan yang ditampilkan di homepage"
      addLabel="Tambah Layanan"
      emptyTitle="Belum ada layanan"
      emptyDescription="Tambahkan layanan pertama Anda"
      emptyIcon={<Icons.menu className="w-8 h-8 text-text-muted" />}
      
      items={crud.items}
      activeItem={activeServices[0] || null} // Just for layout consistency
      isLoading={crud.isLoading}
      
      isFormOpen={crud.isFormOpen}
      editingItem={crud.editingItem}
      handleCreate={handleCreateWithTabReset}
      handleCloseForm={crud.handleCloseForm}
      handleEdit={handleEditWithTabReset}
      handleDelete={crud.handleDelete}
      
      formId="service-form"
      formTitle="Tambah Layanan"
      formTitleEdit="Edit Layanan"
      formSubtitle="Tambahkan layanan baru ke homepage"
      formSubtitleEdit="Perbarui informasi layanan"
      submitLabel="Tambah Layanan"
      submitLabelEdit="Simpan Perubahan"
      
      renderActivePreview={() => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service) => (
            <div key={service.id} className="relative p-6 bg-white rounded-2xl border border-warm-100 shadow-sm dark:bg-white/5 dark:border-white/10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${service.color}/10 text-${service.color}`}>
                {/* Icon placeholder since we can't dynamic render from string easily without map */}
                <span className="capitalize">{service.icon}</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-ink mb-2 dark:text-white">{service.title}</h3>
              <p className="text-text-muted text-sm mb-4 dark:text-gray-400">{service.description}</p>
              {service.stats && (
                <div className="pt-4 border-t border-warm-50 dark:border-white/5">
                  <p className={`text-2xl font-bold text-${service.color}`}>{service.stats}</p>
                  <p className="text-xs text-text-muted uppercase tracking-wider dark:text-gray-500">{service.statsLabel}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      renderConfigCard={(item) => ({
        title: item.title,
        description: item.description,
        badge: item.isFeatured ? 'Featured' : undefined,
        content: (
          <div className="flex items-center justify-between text-xs text-text-muted mt-2">
            <span className="capitalize">Icon: {item.icon}</span>
            <span className="capitalize">Color: {item.color}</span>
            <span>Order: {item.order}</span>
          </div>
        ),
      })}
    >
      <form id="service-form" onSubmit={handleSubmit}>
        <TabNavigation />

        <div className="space-y-5 min-h-[300px]">
          {activeTab === 'content' && (
            <div className="space-y-5 animate-fade-in">
              <FormField label="Nama Layanan" required>
                <FormInput
                  value={crud.formData.title || ''}
                  onChange={(e) => crud.updateField('title', e.target.value)}
                  placeholder="Contoh: Bantuan Kesehatan"
                />
              </FormField>
              <FormField label="Deskripsi Singkat" required>
                <FormTextarea
                  value={crud.formData.description || ''}
                  onChange={(e) => crud.updateField('description', e.target.value)}
                  rows={3}
                  placeholder="Jelaskan layanan ini secara singkat..."
                />
              </FormField>
              <FormField label="Urutan (Order)">
                <FormInput
                  type="number"
                  value={crud.formData.order || 0}
                  onChange={(e) => crud.updateField('order', parseInt(e.target.value))}
                  min={0}
                />
              </FormField>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Icon" required>
                  <FormSelect
                    value={crud.formData.icon || 'heart'}
                    onChange={(e) => crud.updateField('icon', e.target.value)}
                  >
                    {ICONS.map((icon) => (
                      <option key={icon.value} value={icon.value}>{icon.label}</option>
                    ))}
                  </FormSelect>
                </FormField>
                <FormField label="Warna Tema" required>
                  <FormSelect
                    value={crud.formData.color || 'forest'}
                    onChange={(e) => crud.updateField('color', e.target.value)}
                  >
                    {COLORS.map((color) => (
                      <option key={color.value} value={color.value}>{color.label}</option>
                    ))}
                  </FormSelect>
                </FormField>
              </div>
              
              <div className="pt-4 space-y-3">
                <FormCheckbox
                  label="Tampilkan di Homepage"
                  checked={crud.formData.isActive || false}
                  onChange={(e) => crud.updateField('isActive', e.target.checked)}
                />
                <FormCheckbox
                  label="Tandai sebagai Featured (Unggulan)"
                  checked={crud.formData.isFeatured || false}
                  onChange={(e) => crud.updateField('isFeatured', e.target.checked)}
                />
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Angka Statistik" hint="Contoh: 1.500+">
                  <FormInput
                    value={crud.formData.stats || ''}
                    onChange={(e) => crud.updateField('stats', e.target.value)}
                  />
                </FormField>
                <FormField label="Label Statistik" hint="Contoh: Pasien Terbantu">
                  <FormInput
                    value={crud.formData.statsLabel || ''}
                    onChange={(e) => crud.updateField('statsLabel', e.target.value)}
                  />
                </FormField>
              </div>
              <p className="text-sm text-text-muted bg-warm-50 p-3 rounded-lg border border-warm-100 dark:bg-white/5 dark:border-white/10 dark:text-gray-400">
                Statistik bersifat opsional. Jika diisi, akan muncul di bagian bawah kartu layanan.
              </p>
            </div>
          )}
        </div>
      </form>
    </ConfigPageLayout>
  );
}
