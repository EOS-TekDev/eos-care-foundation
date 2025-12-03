import { useAdminBerita, useDeleteBerita, useCreateBerita, useUpdateBerita } from '../../hooks/useBerita';
import { useActiveDonasi } from '../../hooks/useDonasi';
import { useCrudState } from '../../hooks/useCrudState';
import { formatDate, getImageUrl, cn } from '../../lib/utils';
import type { Berita, BeritaForm } from '../../lib/types';
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

export function AdminBerita() {
  const activeDonasi = useActiveDonasi();

  const crud = useCrudState<Berita, BeritaForm>({
    useList: useAdminBerita,
    useCreate: useCreateBerita,
    useUpdate: useUpdateBerita,
    useDelete: useDeleteBerita,
    getDefaultFormData: () => ({
      title: '',
      content: '',
      isPublished: false,
      showDonationButton: false,
      donasiId: '',
    }),
    mapItemToFormData: (item) => ({
      title: item.title,
      content: item.content,
      isPublished: item.isPublished,
      showDonationButton: item.showDonationButton,
      donasiId: item.donasiId || '',
    }),
    searchFilter: (item, query) =>
      item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query),
    deleteConfirmMessage: 'Yakin ingin menghapus berita ini?',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    const submitData: BeritaForm = {
      title: crud.formData.title || '',
      content: crud.formData.content || '',
      isPublished: crud.formData.isPublished || false,
      showDonationButton: crud.formData.showDonationButton || false,
      donasiId: crud.formData.donasiId || undefined,
      image: crud.imageFile || undefined,
    };
    await crud.handleSubmit(e, submitData);
  };

  const columns: Column<Berita>[] = [
    {
      key: 'berita',
      header: 'Berita',
      render: (item) => (
        <div className="flex items-center gap-4">
          {item.image ? (
            <img src={getImageUrl(item.image)} alt="" className="w-16 h-12 object-cover rounded-lg border border-warm-100" />
          ) : (
            <div className="w-16 h-12 bg-warm-100 rounded-lg flex items-center justify-center">
              <Icons.image className="w-5 h-5 text-text-muted" strokeWidth={1.5} />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-ink truncate max-w-xs dark:text-white">{item.title}</p>
            <p className="text-sm text-text-muted truncate max-w-xs dark:text-gray-400">{item.content.substring(0, 50)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
          item.isPublished ? 'bg-forest/10 text-forest' : 'bg-terracotta/10 text-terracotta'
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full', item.isPublished ? 'bg-forest' : 'bg-terracotta')} />
          {item.isPublished ? 'Published' : 'Draft'}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Tanggal',
      render: (item) => <span className="text-sm text-text-muted">{formatDate(item.createdAt)}</span>,
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

  return (
    <CrudPageLayout
      title="Kelola Berita"
      subtitle="Buat dan kelola artikel berita"
      addLabel="Tambah Berita"
      emptyTitle="Belum ada berita"
      emptyDescription="Mulai dengan membuat berita pertama Anda"
      emptyIcon={<Icons.document className="w-8 h-8 text-text-muted" />}
      searchPlaceholder="Cari berita..."
      columns={columns}
      filteredData={crud.filteredData}
      isLoading={crud.isLoading}
      meta={crud.meta}
      page={crud.page}
      setPage={crud.setPage}
      isFormOpen={crud.isFormOpen}
      editingItem={crud.editingItem}
      handleCreate={crud.handleCreate}
      handleCloseForm={crud.handleCloseForm}
      handleSearch={crud.handleSearch}
      formId="berita-form"
      formTitle="Tambah Berita"
      formTitleEdit="Edit Berita"
      formSubtitle="Buat artikel berita baru"
      formSubtitleEdit="Perbarui informasi berita"
      submitLabel="Tambah Berita"
      submitLabelEdit="Simpan Perubahan"
    >
      <form id="berita-form" onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Judul" required>
          <FormInput
            type="text"
            value={crud.formData.title || ''}
            onChange={(e) => crud.updateField('title', e.target.value)}
            placeholder="Masukkan judul berita"
            required
          />
        </FormField>

        <FormField label="Konten" required>
          <FormTextarea
            value={crud.formData.content || ''}
            onChange={(e) => crud.updateField('content', e.target.value)}
            rows={6}
            placeholder="Tulis konten berita..."
            required
          />
        </FormField>

        <FormField label="Gambar" hint={crud.editingItem?.image && !crud.imageFile ? `Gambar saat ini: ${crud.editingItem.image}` : undefined}>
          <FormFileInput accept="image/*" onChange={(e) => crud.setImageFile(e.target.files?.[0] || null)} />
        </FormField>

        <div className="flex flex-wrap gap-6 pt-2">
          <FormCheckbox
            label="Publikasikan"
            checked={crud.formData.isPublished || false}
            onChange={(e) => crud.updateField('isPublished', e.target.checked)}
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
