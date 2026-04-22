import { computed } from 'vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';

const CLOUD_NAME = 'dsxdphuim';
const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

function buildImageUrl(publicId: string, width: number) {
  return cld
    .image(publicId)
    .resize(scale().width(width))
    .format('auto')
    .quality('auto')
    .toURL();
}

export function useCloudinary() {
  const logoUrl = computed(() => buildImageUrl('logo_crop_qoc5ff', 100));

  return {
    CLOUD_NAME,
    cld,
    buildImageUrl,
    logoUrl,
  };
}
