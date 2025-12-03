import { useQuery } from '@tanstack/react-query';
import { createResourceHooks } from '../lib/createResourceHooks';
import api from '../lib/api';
import type { About, AboutForm, ApiResponse } from '../lib/types';

const aboutHooks = createResourceHooks<About, AboutForm>({
  resource: 'about',
  buildFormData: (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('order', String(data.order));
    if (data.image) formData.append('image', data.image);
    return formData;
  },
});

// Override: About public returns array, not paginated
export function usePublicAbout() {
  return useQuery({
    queryKey: ['public-about'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<About[]>>('/public/about');
      return response.data.data;
    },
  });
}

export const useAdminAbout = aboutHooks.useAdminList;
export const useAdminAboutDetail = aboutHooks.useAdminDetail;
export const useCreateAbout = aboutHooks.useCreate;
export const useUpdateAbout = aboutHooks.useUpdate;
export const useDeleteAbout = aboutHooks.useDelete;
