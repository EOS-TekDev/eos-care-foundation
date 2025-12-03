import { createResourceHooks } from '../lib/createResourceHooks';
import type { Berita, BeritaForm } from '../lib/types';

const beritaHooks = createResourceHooks<Berita, BeritaForm>({
  resource: 'berita',
  buildFormData: (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('isPublished', String(data.isPublished));
    formData.append('showDonationButton', String(data.showDonationButton));
    if (data.donasiId) formData.append('donasiId', data.donasiId);
    if (data.image) formData.append('image', data.image);
    return formData;
  },
});

export const usePublicBerita = beritaHooks.usePublicList;
export const usePublicBeritaDetail = beritaHooks.usePublicDetail;
export const useAdminBerita = beritaHooks.useAdminList;
export const useAdminBeritaDetail = beritaHooks.useAdminDetail;
export const useCreateBerita = beritaHooks.useCreate;
export const useUpdateBerita = beritaHooks.useUpdate;
export const useDeleteBerita = beritaHooks.useDelete;
