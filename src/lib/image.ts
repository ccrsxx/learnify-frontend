import type { ImageData } from './types/file';

const IMAGE_EXTENSIONS = [
  'apng',
  'avif',
  'gif',
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'svg',
  'webp'
] as const;

type ImageExtensions = (typeof IMAGE_EXTENSIONS)[number];

function isValidImageExtension(
  extension: string
): extension is ImageExtensions {
  return IMAGE_EXTENSIONS.includes(
    extension.split('.').pop()?.toLowerCase() as ImageExtensions
  );
}

/**
 * Returns true if the image is valid. Has to be a valid extension and less than 20MB.
 */
export function isValidImage(name: string, bytes: number): boolean {
  return isValidImageExtension(name) && bytes < 20 * Math.pow(1024, 2);
}

type ImagesData = {
  imagesPreviewData: ImageData[];
  selectedImagesData: File[];
};

export function getImagesData(
  files: FileList | null,
  currentFiles?: number
): ImagesData | null {
  if (!files || !files.length) return null;

  const singleEditingMode = currentFiles === undefined;

  const selectedImagesData =
    singleEditingMode ||
    !(currentFiles === 4 || files.length > 4 - currentFiles)
      ? Array.from(files).filter(({ name, size }) => isValidImage(name, size))
      : null;

  if (!selectedImagesData || !selectedImagesData.length) return null;

  const imagesPreviewData = selectedImagesData.map((image) => ({
    src: URL.createObjectURL(image),
    alt: image.name
  }));

  return { imagesPreviewData, selectedImagesData };
}
