import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAdminDonasi, useDeleteDonasi, useCreateDonasi, useUpdateDonasi } from '../../hooks/useDonasi';
import { useCrudState } from '../../hooks/useCrudState';
import { formatCurrency, formatDate, calculateProgress, getImageUrl, cn } from '../../lib/utils';
import type { Donasi, DonasiForm } from '../../lib/types';
import {
  StatCard,
  DataTable,
  type Column,
  DrawerModal,
  ActionButtons,
  FormField,
  FormInput,
  FormTextarea,
  FormFileInput,
  FormCheckbox,
  FormButton,
} from '../../components/admin';
import { Icons } from '../../components/ui/Icons';

export function AdminDonasi() {
  const crud = useCrudState<Donasi, DonasiForm>({
    useList: useAdminDonasi,
    useCreate: useCreateDonasi,
    useUpdate: useUpdateDonasi,
    useDelete: useDeleteDonasi,
    getDefaultFormData: () => ({
      title: '',
      description: '',
      targetAmount: 0,
      deadline: '',
      isActive: true,
    }),
    mapItemToFormData: (item) => ({
      title: item.title,
      description: item.description,
      targetAmount: item.targetAmount,
      deadline: item.deadline ? new Date(item.deadline).toISOString().split('T')[0] : '',
      isActive: item.isActive,
    }),
    searchFilter: (item, query) =>
      item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
    deleteConfirmMessage: 'Yakin ingin menghapus program donasi ini?',
  });

  const stats = useMemo(() => {
    const totalTarget = crud.items.reduce((sum, d) => sum + d.targetAmount, 0);
    const totalCollected = crud.items.reduce((sum, d) => sum + d.currentAmount, 0);
    const overallProgress = totalTarget > 0 ? Math.round((totalCollected / totalTarget) * 100) : 0;
    return { totalTarget, totalCollected, overallProgress, programCount: crud.items.length };
  }, [crud.items]);

  const handleSubmit = async (e: React.FormEvent) => {
    const submitData: DonasiForm = {
      title: crud.formData.title || '',
      description: crud.formData.description || '',
      targetAmount: crud.formData.targetAmount || 0,
      deadline: crud.formData.deadline || undefined,
      isActive: crud.formData.isActive ?? true,
      image: crud.imageFile || undefined,
    };
    await crud.handleSubmit(e, submitData);
  };

  const columns: Column<Donasi>[] = [
    {
      key: 'program',
      header: 'Program',
      render: (item) => (
        <div className="flex items-center gap-4">
          {item.image ? (
            <img src={getImageUrl(item.image)} alt="" className="w-16 h-12 object-cover rounded-lg border border-warm-100" />
          ) : (
            <div className="w-16 h-12 bg-gradient-to-br from-forest/20 to-ocean/20 rounded-lg flex items-center justify-center">
              <Icons.heart className="w-5 h-5 text-forest" strokeWidth={1.5} />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-ink truncate max-w-xs dark:text-white">{item.title}</p>
            <p className="text-sm text-text-muted dark:text-gray-400">{item._count?.transactions || 0} donatur</p>
          </div>
        </div>
      ),
    },
    {
      key: 'progress',
      header: 'Progress',
      render: (item) => {
        const progress = calculateProgress(item.currentAmount, item.targetAmount);
        const isNearComplete = progress >= 80;
        const isComplete = progress >= 100;
        return (
          <div className="w-40">
            <div className="flex items-center justify-between mb-1.5">
              <span className={cn('text-xs font-semibold', isComplete ? 'text-forest' : isNearComplete ? 'text-terracotta' : 'text-text-muted')}>
                {progress}%
              </span>
            </div>
            <div className="h-2 bg-warm-100 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', isComplete ? 'bg-forest' : isNearComplete ? 'bg-terracotta' : 'bg-ocean')}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-text-muted mt-1.5">{formatCurrency(item.currentAmount)} / {formatCurrency(item.targetAmount)}</p>
          </div>
        );
      },
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
      key: 'deadline',
      header: 'Deadline',
      render: (item) => item.deadline
        ? <span className={cn('text-sm', new Date(item.deadline) < new Date() && 'text-sunset')}>{formatDate(item.deadline)}</span>
        : <span className="text-sm text-text-muted">Tidak ada</span>,
    },
    {
      key: 'actions',
      header: 'Aksi',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            to={`/admin/donasi/${item.id}/transactions`}
            className="p-2 text-text-muted hover:text-ocean hover:bg-ocean/10 rounded-lg transition-colors"
            title="Lihat Transaksi"
          >
            <Icons.currency className="w-4 h-4" />
          </Link>
          <ActionButtons onEdit={() => crud.handleEdit(item)} onDelete={() => crud.handleDelete(item.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink dark:text-white">Kelola Donasi</h1>
          <p className="text-text-secondary mt-1 dark:text-gray-300">Buat dan kelola program penggalangan dana</p>
        </div>
        <button
          onClick={crud.handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 active:scale-95 transition-all shadow-soft dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          <Icons.add className="w-5 h-5" />
          Tambah Program
        </button>
      </div>

      {/* Stats Summary */}
      {stats.programCount > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Terkumpul" value={formatCurrency(stats.totalCollected)} color="forest" icon={<Icons.currency className="w-5 h-5" />} />
          <StatCard label="Target Total" value={formatCurrency(stats.totalTarget)} color="ocean" icon={<Icons.heart className="w-5 h-5" />} />
          <StatCard label="Progress Keseluruhan" value={`${stats.overallProgress}%`} color="terracotta" icon={<Icons.check className="w-5 h-5" />} />
        </div>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={crud.filteredData}
        keyExtractor={(item) => item.id}
        isLoading={crud.isLoading}
        emptyIcon={<Icons.heart className="w-8 h-8 text-forest" />}
        emptyTitle="Belum ada program donasi"
        emptyDescription="Mulai dengan membuat program donasi pertama"
        onAdd={crud.handleCreate}
        addLabel="Tambah Program"
        searchPlaceholder="Cari program donasi..."
        onSearch={crud.handleSearch}
        pagination={crud.meta ? { page: crud.page, limit: crud.meta.limit, total: crud.meta.total, totalPages: crud.meta.totalPages, onPageChange: crud.setPage } : undefined}
      />

      {/* Drawer Form */}
      <DrawerModal
        isOpen={crud.isFormOpen}
        onClose={crud.handleCloseForm}
        title={crud.editingItem ? 'Edit Program Donasi' : 'Tambah Program Donasi'}
        subtitle={crud.editingItem ? 'Perbarui informasi program' : 'Buat program penggalangan dana baru'}
        size="lg"
        footer={
          <>
            <FormButton variant="secondary" type="button" onClick={crud.handleCloseForm}>Batal</FormButton>
            <FormButton type="submit" form="donasi-form">{crud.editingItem ? 'Simpan Perubahan' : 'Tambah Program'}</FormButton>
          </>
        }
      >
        <form id="donasi-form" onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Judul Program" required>
            <FormInput type="text" value={crud.formData.title || ''} onChange={(e) => crud.updateField('title', e.target.value)} placeholder="Contoh: Bantu Pendidikan Anak Yatim" required />
          </FormField>
          <FormField label="Deskripsi" required>
            <FormTextarea value={crud.formData.description || ''} onChange={(e) => crud.updateField('description', e.target.value)} rows={4} placeholder="Jelaskan tujuan dan manfaat program donasi ini..." required />
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Target (Rp)" required>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">Rp</span>
                <FormInput type="number" value={crud.formData.targetAmount || 0} onChange={(e) => crud.updateField('targetAmount', parseInt(e.target.value) || 0)} className="pl-12" min={0} required />
              </div>
            </FormField>
            <FormField label="Deadline" hint="Opsional">
              <FormInput type="date" value={crud.formData.deadline || ''} onChange={(e) => crud.updateField('deadline', e.target.value)} />
            </FormField>
          </div>
          <FormField label="Gambar" hint={crud.editingItem?.image && !crud.imageFile ? `Gambar saat ini: ${crud.editingItem.image}` : undefined}>
            <FormFileInput accept="image/*" onChange={(e) => crud.setImageFile(e.target.files?.[0] || null)} />
          </FormField>
          <div className="pt-2">
            <FormCheckbox label="Aktifkan Program" checked={crud.formData.isActive || false} onChange={(e) => crud.updateField('isActive', e.target.checked)} />
            <p className="text-xs text-text-muted mt-1 ml-8">Program aktif akan ditampilkan di halaman publik</p>
          </div>
        </form>
      </DrawerModal>
    </div>
  );
}
