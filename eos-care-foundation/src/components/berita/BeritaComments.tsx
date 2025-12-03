import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  useBeritaComments,
  useCreateBeritaComment,
  useUpdateBeritaComment,
  useDeleteBeritaComment,
} from '../../hooks/useBeritaComments';
import { formatDateTime, getImageUrl } from '../../lib/utils';
import type { BeritaComment } from '../../lib/types';

type CommentNode = BeritaComment & { children: CommentNode[] };

function buildCommentTree(comments: BeritaComment[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, children: [] });
  });

  map.forEach((node) => {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

interface BeritaCommentsProps {
  beritaId: string;
}

export function BeritaComments({ beritaId }: BeritaCommentsProps) {
  const { data: comments = [], isLoading, isError, error, refetch } = useBeritaComments(beritaId);
  const createComment = useCreateBeritaComment();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [content, setContent] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    createComment.mutate(
      { beritaId, content: trimmed },
      {
        onSuccess: () => {
          setContent('');
        },
      },
    );
  };

  const tree = buildCommentTree(comments);

  return (
    <section aria-labelledby="berita-comments-heading">
      <div className="flex items-baseline justify-between gap-2 mb-4">
        <h2
          id="berita-comments-heading"
          className="text-xl md:text-2xl font-display font-semibold text-text-primary"
        >
          Komentar
        </h2>
        {!isLoading && comments.length > 0 && (
          <span className="text-sm text-text-muted">{comments.length} komentar</span>
        )}
      </div>

      {isError && (
        <div className="mb-4 rounded-lg bg-status-urgent/5 text-status-urgent text-sm px-4 py-3 flex items-center justify-between">
          <span>{(error as Error)?.message || 'Gagal memuat komentar.'}</span>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-xs font-medium underline underline-offset-2"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* New comment form */}
      <div className="mb-8">
        {authLoading ? (
          <div className="skeleton h-20 w-full rounded-xl" />
        ) : isAuthenticated ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="new-comment" className="label">
              Tambahkan komentar
            </label>
            <textarea
              id="new-comment"
              rows={3}
              className="input resize-none"
              placeholder="Tulis komentar Anda di sini..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={createComment.isPending}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createComment.isPending || !content.trim()}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {createComment.isPending ? 'Mengirim...' : 'Kirim komentar'}
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-text-secondary">
            <span>Silakan </span>
            <Link to="/auth/login" className="font-medium text-primary hover:text-primary-hover">
              masuk
            </Link>
            <span> untuk berkomentar.</span>
          </div>
        )}
      </div>

      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="skeleton h-9 w-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-1/4" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="skeleton h-9 w-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-1/3" />
              <div className="skeleton h-4 w-3/5" />
            </div>
          </div>
        </div>
      ) : tree.length === 0 ? (
        <p className="text-sm text-text-muted">Belum ada komentar. Jadilah yang pertama!</p>
      ) : (
        <div className="space-y-6">
          {tree.map((node) => (
            <CommentItem
              key={node.id}
              node={node}
              beritaId={beritaId}
              canReply={isAuthenticated}
            />
          ))}
        </div>
      )}
    </section>
  );
}

interface CommentItemProps {
  node: CommentNode;
  beritaId: string;
  canReply: boolean;
}

function CommentItem({ node, beritaId, canReply }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState('');
   const [isEditing, setIsEditing] = useState(false);
   const [editContent, setEditContent] = useState(node.content);
   const { user } = useAuth();
  const createComment = useCreateBeritaComment();
   const updateComment = useUpdateBeritaComment();
   const deleteComment = useDeleteBeritaComment();

   const canManage = !!user && user.id === node.user.id;

  const handleReplySubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = reply.trim();
    if (!trimmed) return;

    createComment.mutate(
      { beritaId, content: trimmed, parentId: node.id },
      {
        onSuccess: () => {
          setReply('');
          setIsReplying(false);
        },
      },
    );
  };

  const avatar = node.user.photo ? (
    <img
      src={getImageUrl(node.user.photo)}
      alt={node.user.name}
      className="w-9 h-9 rounded-full object-cover"
    />
  ) : (
    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
      {node.user.name.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        {avatar}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-medium text-sm text-text-primary">{node.user.name}</span>
            <span className="text-xs text-text-muted">
              {formatDateTime(node.createdAt)}
            </span>
          </div>
          {isEditing ? (
            <form onSubmit={(event: FormEvent) => {
              event.preventDefault();
              const trimmed = editContent.trim();
              if (!trimmed) return;
              updateComment.mutate(
                { id: node.id, beritaId, content: trimmed },
                {
                  onSuccess: () => {
                    setIsEditing(false);
                  },
                },
              );
            }} className="space-y-2">
              <textarea
                rows={2}
                className="input resize-none"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                disabled={updateComment.isPending}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(node.content);
                  }}
                  className="btn-secondary text-xs px-3 py-1"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={updateComment.isPending || !editContent.trim()}
                  className="btn-primary text-xs px-3 py-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {updateComment.isPending ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-text-secondary whitespace-pre-wrap">{node.content}</p>
          )}
          {canReply && (
            <button
              type="button"
              onClick={() => setIsReplying((prev) => !prev)}
              className="mt-1 text-xs font-medium text-primary hover:text-primary-hover"
            >
              {isReplying ? 'Batal' : 'Balas'}
            </button>
          )}
          {canManage && (
            <div className="mt-1 flex gap-3 text-xs text-primary">
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className="hover:text-primary-hover"
              >
                {isEditing ? 'Batal edit' : 'Edit'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!window.confirm('Yakin ingin menghapus komentar ini?')) return;
                  deleteComment.mutate({ id: node.id, beritaId });
                }}
                className="text-status-urgent hover:text-status-urgent/80"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      {isReplying && canReply && (
        <form onSubmit={handleReplySubmit} className="ml-12 space-y-2">
          <textarea
            rows={2}
            className="input resize-none"
            placeholder={`Balas ${node.user.name}...`}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            disabled={createComment.isPending}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsReplying(false);
                setReply('');
              }}
              className="btn-secondary text-xs px-3 py-1"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createComment.isPending || !reply.trim()}
              className="btn-primary text-xs px-3 py-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {createComment.isPending ? 'Mengirim...' : 'Kirim balasan'}
            </button>
          </div>
        </form>
      )}

      {node.children.length > 0 && (
        <div className="mt-3 ml-6 pl-4 border-l border-gray-100 space-y-4">
          {node.children.map((child) => (
            <CommentItem
              key={child.id}
              node={child}
              beritaId={beritaId}
              canReply={canReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
