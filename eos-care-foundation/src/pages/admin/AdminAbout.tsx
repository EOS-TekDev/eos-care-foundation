import { useAdminAbout, useDeleteAbout, useCreateAbout, useUpdateAbout } from '../../hooks/useAbout';
import { useCrudState } from '../../hooks/useCrudState';
import { getImageUrl } from '../../lib/utils';
import type { About, AboutForm } from '../../lib/types';
import {
  type Column,
  CrudPageLayout,
  ActionButtons,
  FormField,
  FormInput,
  FormTextarea,
  FormFileInput,
} from '../../components/admin';

export function AdminAbout() {
  const crud = useCrudState<About, AboutForm>({
    useList: useAdminAbout,
    useCreate: useCreateAbout,
    useUpdate: useUpdateAbout,
    useDelete: useDeleteAbout,
    getDefaultFormData: (items) => {
      const maxOrder = items?.reduce((max, item) => Math.max(max, item.order), 0) || 0;
      return { title: '', content: '', order: maxOrder + 1 };
    },
    mapItemToFormData: (item) => ({
      title: item.title,
      content: item.content,
      order: item.order,
    }),
    searchFilter: (item, query) =>
      item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query),
    deleteConfirmMessage: 'Yakin ingin menghapus section ini?',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    const submitData: AboutForm = {
      title: crud.formData.title || '',
      content: crud.formData.content || '',
      order: crud.formData.order || 0,
      image: crud.imageFile || undefined,
    };
    await crud.handleSubmit(e, submitData);
  };

  const columns: Column<About>[] = [
    {
      key: 'section',
      header: 'Section',
      render: (item) => (
        <div className="flex items-center gap-4">
          {item.image ? (
            <img
              src={getImageUrl(item.image)}
              alt=""
              className="w-16 h-12 object-cover rounded-lg border border-warm-100"
            />
          ) : (
            <div className="w-16 h-12 bg-warm-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
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
      key: 'order',
      header: 'Urutan',
      render: (item) => (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-warm-100 text-sm font-semibold text-ink dark:text-white dark:bg-white/10">
          {item.order}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Aksi',
      className: 'text-right',
      render: (item) => (
        <ActionButtons
          onEdit={() => crud.handleEdit(item)}
          onDelete={() => crud.handleDelete(item.id)}
        />
      ),
    },
  ];

  const AboutIcon = (
    <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );

  return (
    <CrudPageLayout
      title="Kelola About"
      subtitle="Atur konten halaman tentang kami"
      addLabel="Tambah Section"
      emptyTitle="Belum ada section"
      emptyDescription="Tambahkan konten untuk halaman About"
      emptyIcon={AboutIcon}
      searchPlaceholder="Cari section..."
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
      formId="about-form"
      formTitle="Tambah Section"
      formTitleEdit="Edit Section"
      formSubtitle="Tambah section baru"
      formSubtitleEdit="Perbarui informasi section"
      formSize="lg"
      submitLabel="Tambah Section"
      submitLabelEdit="Simpan Perubahan"
    >
      <form id="about-form" onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Judul Section" required>
          <FormInput
            type="text"
            value={crud.formData.title || ''}
            onChange={(e) => crud.updateField('title', e.target.value)}
            placeholder="Judul section"
            required
          />
        </FormField>

        <FormField label="Konten" required>
          <FormTextarea
            value={crud.formData.content || ''}
            onChange={(e) => crud.updateField('content', e.target.value)}
            rows={6}
            placeholder="Tulis konten section..."
            required
          />
        </FormField>

        <FormField label="Urutan (Order)" hint="Angka kecil tampil lebih dulu">
          <FormInput
            type="number"
            value={crud.formData.order || 0}
            onChange={(e) => crud.updateField('order', parseInt(e.target.value))}
            min={0}
          />
        </FormField>

        <FormField
          label="Gambar"
          hint={crud.editingItem?.image && !crud.imageFile ? `Gambar saat ini: ${crud.editingItem.image}` : 'Opsional'}
        >
          <FormFileInput accept="image/*" onChange={(e) => crud.setImageFile(e.target.files?.[0] || null)} />
        </FormField>
      </form>
    </CrudPageLayout>
  );
}
