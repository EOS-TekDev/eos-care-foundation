import { useAdminTeam, useDeleteTeam, useCreateTeam, useUpdateTeam } from '../../hooks/useTeam';
import { useCrudState } from '../../hooks/useCrudState';
import { getImageUrl, cn } from '../../lib/utils';
import type { TeamMember, TeamMemberForm } from '../../lib/types';
import {
  type Column,
  CrudPageLayout,
  ActionButtons,
  FormField,
  FormInput,
  FormFileInput,
  FormCheckbox,
} from '../../components/admin';
import { Icons } from '../../components/ui/Icons';

export function AdminTeam() {
  const crud = useCrudState<TeamMember, TeamMemberForm>({
    useList: useAdminTeam,
    useCreate: useCreateTeam,
    useUpdate: useUpdateTeam,
    useDelete: useDeleteTeam,
    getDefaultFormData: (items) => {
      const maxOrder = items?.reduce((max, item) => Math.max(max, item.order), 0) || 0;
      return { name: '', role: '', order: maxOrder + 1, isActive: true };
    },
    mapItemToFormData: (item) => ({
      name: item.name,
      role: item.role,
      order: item.order,
      isActive: item.isActive,
    }),
    searchFilter: (item, query) =>
      item.name.toLowerCase().includes(query) || item.role.toLowerCase().includes(query),
    deleteConfirmMessage: 'Yakin ingin menghapus anggota tim ini?',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    const submitData: TeamMemberForm = {
      name: crud.formData.name || '',
      role: crud.formData.role || '',
      order: crud.formData.order || 0,
      isActive: crud.formData.isActive ?? true,
      photo: crud.imageFile || undefined,
    };
    await crud.handleSubmit(e, submitData);
  };

  const columns: Column<TeamMember>[] = [
    {
      key: 'member',
      header: 'Anggota',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.photo ? (
            <img
              src={getImageUrl(item.photo)}
              alt=""
              className="w-10 h-10 object-cover rounded-full border border-warm-100"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-forest/20 to-ocean/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-forest">{item.name.charAt(0)}</span>
            </div>
          )}
          <span className="font-medium text-ink dark:text-white">{item.name}</span>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Jabatan',
      render: (item) => <span className="text-text-secondary">{item.role}</span>,
    },
    {
      key: 'order',
      header: 'Urutan',
      className: 'text-center',
      render: (item) => (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-warm-100 text-sm font-semibold text-ink dark:text-white dark:bg-white/10">
          {item.order}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      className: 'text-center',
      render: (item) => (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
            item.isActive ? 'bg-forest/10 text-forest' : 'bg-warm-200 text-text-muted'
          )}
        >
          <span className={cn('w-1.5 h-1.5 rounded-full', item.isActive ? 'bg-forest' : 'bg-text-muted')} />
          {item.isActive ? 'Aktif' : 'Nonaktif'}
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

  return (
    <CrudPageLayout
      title="Kelola Tim"
      subtitle="Atur anggota tim yang ditampilkan di halaman About"
      addLabel="Tambah Anggota"
      emptyTitle="Belum ada anggota tim"
      emptyDescription="Tambahkan anggota tim untuk ditampilkan di halaman About"
      emptyIcon={<Icons.users className="w-8 h-8 text-text-muted" />}
      searchPlaceholder="Cari anggota..."
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
      formId="team-form"
      formTitle="Tambah Anggota Tim"
      formTitleEdit="Edit Anggota Tim"
      formSubtitle="Tambah anggota tim baru"
      formSubtitleEdit="Perbarui informasi anggota"
      formSize="md"
      submitLabel="Tambah Anggota"
      submitLabelEdit="Simpan Perubahan"
    >
      <form id="team-form" onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Nama" required>
          <FormInput
            type="text"
            value={crud.formData.name || ''}
            onChange={(e) => crud.updateField('name', e.target.value)}
            placeholder="Nama lengkap"
            required
          />
        </FormField>

        <FormField label="Jabatan/Role" required>
          <FormInput
            type="text"
            value={crud.formData.role || ''}
            onChange={(e) => crud.updateField('role', e.target.value)}
            placeholder="Contoh: Head Developer, Program Manager"
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

        <FormField label="Foto" hint={crud.editingItem?.photo && !crud.imageFile ? 'Foto saat ini tersimpan' : 'Opsional'}>
          {crud.editingItem?.photo && !crud.imageFile && (
            <div className="mb-2 flex items-center gap-2">
              <img src={getImageUrl(crud.editingItem.photo)} alt="" className="w-10 h-10 rounded-full object-cover border border-warm-100" />
              <p className="text-xs text-text-muted">Foto saat ini</p>
            </div>
          )}
          <FormFileInput accept="image/*" onChange={(e) => crud.setImageFile(e.target.files?.[0] || null)} />
        </FormField>

        <div className="pt-2">
          <FormCheckbox
            label="Aktif (tampil di halaman About)"
            checked={crud.formData.isActive || false}
            onChange={(e) => crud.updateField('isActive', e.target.checked)}
          />
        </div>
      </form>
    </CrudPageLayout>
  );
}
