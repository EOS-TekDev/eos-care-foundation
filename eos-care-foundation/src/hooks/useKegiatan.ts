import { createResourceHooks } from '../lib/createResourceHooks';
import type { Kegiatan, KegiatanForm } from '../lib/types';

const kegiatanHooks = createResourceHooks<Kegiatan, KegiatanForm>({
  resource: 'kegiatan',
  buildFormData: (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('date', data.date);
    formData.append('isActive', String(data.isActive));
    formData.append('showDonationButton', String(data.showDonationButton));
    if (data.donasiId) formData.append('donasiId', data.donasiId);
    if (data.image) formData.append('image', data.image);
    return formData;
  },
});

export const usePublicKegiatan = kegiatanHooks.usePublicList;
export const usePublicKegiatanDetail = kegiatanHooks.usePublicDetail;
export const useAdminKegiatan = kegiatanHooks.useAdminList;
export const useAdminKegiatanDetail = kegiatanHooks.useAdminDetail;
export const useCreateKegiatan = kegiatanHooks.useCreate;
export const useUpdateKegiatan = kegiatanHooks.useUpdate;
export const useDeleteKegiatan = kegiatanHooks.useDelete;
