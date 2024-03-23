import { fileTypeFromBuffer } from 'file-type';

const SUPPORTED_FILE_EXTENSIONS = ['bmp', 'jpeg', 'png', 'webp'];
const SUPPORTED_MIME_TYPES = ['image/bmp', 'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/jxl'];

export async function isSupportedImage(image: File): Promise<boolean> {
  const fileExtension = image.name.split('.').pop()?.toLowerCase() ?? '';
  if (SUPPORTED_FILE_EXTENSIONS.includes(fileExtension)) {
    return true;
  }

  const fileType = await fileTypeFromBuffer(await image.arrayBuffer());
  if (SUPPORTED_MIME_TYPES.includes(fileType?.mime ?? '')) {
    return true;
  }

  return false;
}
