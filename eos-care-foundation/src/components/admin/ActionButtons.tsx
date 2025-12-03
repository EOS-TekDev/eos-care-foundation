import { Icons } from '../ui/Icons';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  editTitle?: string;
  deleteTitle?: string;
}

export function ActionButtons({ 
  onEdit, 
  onDelete, 
  editTitle = 'Edit',
  deleteTitle = 'Hapus'
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={onEdit}
        className="p-2 text-text-muted hover:text-forest hover:bg-forest/10 rounded-lg transition-colors"
        title={editTitle}
      >
        <Icons.edit className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-text-muted hover:text-sunset hover:bg-sunset/10 rounded-lg transition-colors"
        title={deleteTitle}
      >
        <Icons.delete className="w-4 h-4" />
      </button>
    </div>
  );
}
