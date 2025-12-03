import { useState, useMemo } from 'react';
import { useAdminKegiatan, useDeleteKegiatan, useCreateKegiatan, useUpdateKegiatan } from '../../hooks/useKegiatan';
import { useActiveDonasi } from '../../hooks/useDonasi';
import { useCrudState } from '../../hooks/useCrudState';
import { formatDate, getImageUrl, cn } from '../../lib/utils';
import { KegiatanCategory } from '../../lib/types';
import type { Kegiatan, KegiatanForm } from '../../lib/types';
import {
  type Column,
  CrudPageLayout,
  ActionButtons,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormFileInput,
  FormCheckbox,
} from '../../components/admin';
import { Icons } from '../../components/ui/Icons';

const categoryColors: Record<string, { bg: string; text: string }> = {
  [KegiatanCategory.SOSIAL]: { bg: 'bg-ocean/10', text: 'text-ocean' },
  [KegiatanCategory.PENDIDIKAN]: { bg: 'bg-forest/10', text: 'text-forest' },
  [KegiatanCategory.PELATIHAN]: { bg: 'bg-terracotta/10', text: 'text-terracotta' },
};

export function AdminKegiatan() {
  const activeDonasi = useActiveDonasi();
  const [categoryFilter, setCategoryFilter] = useState<KegiatanCategory | 'ALL'>('ALL');

  const crud = useCrudState<Kegiatan, KegiatanForm>({
    useList: useAdminKegiatan,
    useCreate: useCreateKegiatan,
    useUpdate: useUpdateKegiatan,
    useDelete: useDeleteKegiatan,
    getDefaultFormData: () => ({
      title: '',
      description: '',
      category: KegiatanCategory.SOSIAL,
      date: new Date().toISOString().split('T')[0],
      isActive: true,
      showDonationButton: false,
      donasiId: '',
    }),
    mapItemToFormData: (item) => ({
      title: item.title,
      description: item.description,
      category: item.category,
      date: new Date(item.date).toISOString().split('T')[0],
      isActive: item.isActive,
      showDonationButton: item.showDonationButton,
      donasiId: item.donasiId || '',
    }),
    searchFilter: (item, query) =>
      item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
    deleteConfirmMessage: 'Yakin ingin menghapus kegiatan ini?',
  });

  // Apply category filter on top of search filter
  const filteredData = useMemo(() => {
    if (categoryFilter === 'ALL') return crud.filteredData;
    return crud.filteredData.filter((item) => item.category === categoryFilter);
  }, [crud.filteredData, categoryFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    const submitData: KegiatanForm = {
      title: crud.formData.title || '',
      description: crud.formData.description || '',
      category: crud.formData.category || KegiatanCategory.SOSIAL,
      date: crud.formData.date || new Date().toISOString(),
      isActive: crud.formData.isActive ?? true,
      showDonationButton: crud.formData.showDonationButton || false,
      donasiId: crud.formData.donasiId || undefined,
      image: crud.imageFile || undefined,
    };
    await crud.handleSubmit(e, submitData);
  };

  const columns: Column<Kegiatan>[] = [
    {
      key: 'kegiatan',
      header: 'Kegiatan',
      render: (item) => (
        <div className="flex items-center gap-4">
          {item.image ? (
            <img src={getImageUrl(item.image)} alt="" className="w-16 h-12 object-cover rounded-lg border border-warm-100" />
          ) : (
            <div className="w-16 h-12 bg-warm-100 rounded-lg flex items-center justify-center">
              <Icons.calendar className="w-5 h-5 text-text-muted" strokeWidth={1.5} />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-ink truncate max-w-xs dark:text-white">{item.title}</p>
            <p className="text-sm text-text-muted truncate max-w-xs dark:text-gray-400">{item.description.substring(0, 40)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Kategori',
      render: (item) => (
        <span className={cn(
          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
          categoryColors[item.category]?.bg || 'bg-warm-100',
          categoryColors[item.category]?.text || 'text-text-muted'
        )}>
          {item.category}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
          item.isActive ? 'bg-forest/10 text-forest' : 'bg-terracotta/10 text-terracotta'
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full', item.isActive ? 'bg-forest' : 'bg-terracotta')} />
          {item.isActive ? 'Aktif' : 'Nonaktif'}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Tanggal',
      render: (item) => <span className="text-sm text-text-muted">{formatDate(item.date)}</span>,
    },
    {
      key: 'actions',
      header: 'Aksi',
      className: 'text-right',
      render: (item) => (
        <ActionButtons onEdit={() => crud.handleEdit(item)} onDelete={() => crud.handleDelete(item.id)} />
      ),
    },
  ];

  const categoryFilterSlot = (
    <div className="flex flex-wrap gap-2">
      {[
        { value: 'ALL' as const, label: 'Semua', color: 'gray' },
        { value: KegiatanCategory.SOSIAL, label: 'Sosial', color: 'ocean' },
        { value: KegiatanCategory.PENDIDIKAN, label: 'Pendidikan', color: 'forest' },
        { value: KegiatanCategory.PELATIHAN, label: 'Pelatihan', color: 'terracotta' },
      ].map((cat) => (
        <button
          key={cat.value}
          onClick={() => setCategoryFilter(cat.value)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            categoryFilter === cat.value
              ? cat.color === 'gray' ? 'bg-gray-900 text-white'
              : cat.color === 'ocean' ? 'bg-ocean text-white'
              : cat.color === 'forest' ? 'bg-forest text-white'
              : 'bg-terracotta text-white'
              : 'bg-warm-100 text-text-secondary hover:bg-warm-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20'
          )}
        >
          {cat.label}
          {categoryFilter === cat.value && <span className="ml-2 text-xs opacity-75">({filteredData.length})</span>}
        </button>
      ))}
    </div>
  );

  return (
    <CrudPageLayout
      title="Kelola Kegiatan"
      subtitle="Atur jadwal dan informasi kegiatan"
      addLabel="Tambah Kegiatan"
      emptyTitle="Belum ada kegiatan"
      emptyDescription="Mulai dengan membuat kegiatan pertama"
      emptyIcon={<Icons.calendar className="w-8 h-8 text-text-muted" />}
      searchPlaceholder="Cari kegiatan..."
      columns={columns}
      filteredData={filteredData}
      isLoading={crud.isLoading}
      meta={crud.meta}
      page={crud.page}
      setPage={crud.setPage}
      isFormOpen={crud.isFormOpen}
      editingItem={crud.editingItem}
      handleCreate={crud.handleCreate}
      handleCloseForm={crud.handleCloseForm}
      handleSearch={crud.handleSearch}
      filterSlot={categoryFilterSlot}
      formId="kegiatan-form"
      formTitle="Tambah Kegiatan"
      formTitleEdit="Edit Kegiatan"
      formSubtitle="Buat kegiatan baru"
      formSubtitleEdit="Perbarui informasi kegiatan"
      submitLabel="Tambah Kegiatan"
      submitLabelEdit="Simpan Perubahan"
    >
      <form id="kegiatan-form" onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Judul" required>
          <FormInput
            type="text"
            value={crud.formData.title || ''}
            onChange={(e) => crud.updateField('title', e.target.value)}
            placeholder="Nama kegiatan"
            required
          />
        </FormField>

        <FormField label="Deskripsi" required>
          <FormTextarea
            value={crud.formData.description || ''}
            onChange={(e) => crud.updateField('description', e.target.value)}
            rows={4}
            placeholder="Deskripsi kegiatan..."
            required
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Kategori" required>
            <FormSelect
              value={crud.formData.category || KegiatanCategory.SOSIAL}
              onChange={(e) => crud.updateField('category', e.target.value as KegiatanCategory)}
            >
              <option value={KegiatanCategory.SOSIAL}>Sosial</option>
              <option value={KegiatanCategory.PENDIDIKAN}>Pendidikan</option>
              <option value={KegiatanCategory.PELATIHAN}>Pelatihan</option>
            </FormSelect>
          </FormField>
          <FormField label="Tanggal" required>
            <FormInput
              type="date"
              value={crud.formData.date || ''}
              onChange={(e) => crud.updateField('date', e.target.value)}
              required
            />
          </FormField>
        </div>

        <FormField label="Gambar" hint={crud.editingItem?.image && !crud.imageFile ? `Gambar saat ini: ${crud.editingItem.image}` : undefined}>
          <FormFileInput accept="image/*" onChange={(e) => crud.setImageFile(e.target.files?.[0] || null)} />
        </FormField>

        <div className="flex flex-wrap gap-6 pt-2">
          <FormCheckbox
            label="Aktif"
            checked={crud.formData.isActive || false}
            onChange={(e) => crud.updateField('isActive', e.target.checked)}
          />
          <FormCheckbox
            label="Tampilkan Tombol Donasi"
            checked={crud.formData.showDonationButton || false}
            onChange={(e) => crud.updateField('showDonationButton', e.target.checked)}
          />
        </div>

        {crud.formData.showDonationButton && (
          <FormField label="Program Donasi">
            <FormSelect
              value={crud.formData.donasiId || ''}
              onChange={(e) => crud.updateField('donasiId', e.target.value)}
            >
              <option value="">Pilih Program Donasi</option>
              {activeDonasi.data?.map((d) => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </FormSelect>
          </FormField>
        )}
      </form>
    </CrudPageLayout>
  );
}
