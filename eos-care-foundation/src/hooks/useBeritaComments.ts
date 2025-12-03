import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { ApiResponse, BeritaComment } from '../lib/types';

const commentsKey = (beritaId: string) => ['berita-comments', beritaId];

export function useBeritaComments(beritaId: string) {
  return useQuery({
    queryKey: commentsKey(beritaId),
    queryFn: async () => {
      const res = await api.get<ApiResponse<BeritaComment[]>>(`/public/berita/${beritaId}/comments`);
      return res.data.data ?? [];
    },
    enabled: !!beritaId,
  });
}

interface CreateCommentPayload {
  beritaId: string;
  content: string;
  parentId?: string;
}

export function useCreateBeritaComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ beritaId, ...payload }: CreateCommentPayload) => {
      const res = await api.post<ApiResponse<BeritaComment>>(
        `/public/berita/${beritaId}/comments`,
        payload,
      );
      return res.data.data!;
    },
    onSuccess: (_created, { beritaId }) => {
      queryClient.invalidateQueries({ queryKey: commentsKey(beritaId) });
    },
  });
}

interface UpdateCommentPayload {
  id: string;
  beritaId: string;
  content: string;
}

export function useUpdateBeritaComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, content }: UpdateCommentPayload) => {
      const res = await api.put<ApiResponse<BeritaComment>>(`/public/berita-comments/${id}`, {
        content,
      });
      return res.data.data!;
    },
    onSuccess: (_updated, { beritaId }) => {
      queryClient.invalidateQueries({ queryKey: commentsKey(beritaId) });
    },
  });
}

interface DeleteCommentPayload {
  id: string;
  beritaId: string;
}

export function useDeleteBeritaComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteCommentPayload) => {
      await api.delete<ApiResponse<null>>(`/public/berita-comments/${id}`);
    },
    onSuccess: (_data, { beritaId }) => {
      queryClient.invalidateQueries({ queryKey: commentsKey(beritaId) });
    },
  });
}
