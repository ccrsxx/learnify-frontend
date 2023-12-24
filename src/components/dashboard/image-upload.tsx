import { AnimatePresence, motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { Button } from '../ui/button';
import { Collapse } from '../ui/collapse';
import { ImagePreview } from '../modal/image-preview';
import type { ChangeEvent, ClipboardEvent } from 'react';
import type { MotionProps } from 'framer-motion';
import type { ImageData } from '@/lib/types/file';

type ImageUploadProps = {
  loading: boolean;
  selectedImage: ImageData | null;
  onImageUpload: (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ) => void;
  removeImage: () => void;
};

export function ImageUpload({
  loading,
  selectedImage,
  onImageUpload,
  removeImage
}: ImageUploadProps): JSX.Element {
  return (
    <div className='col-span-full grid gap-4'>
      <Collapse className='mx-auto' open={!!selectedImage}>
        <AnimatePresence>
          {selectedImage && (
            <motion.div className='relative' {...variants}>
              <ImagePreview
                className='h-60 w-60 rounded-medium object-cover'
                width={240}
                height={240}
                src={selectedImage.src}
                alt={selectedImage.alt}
              />
              <Button
                className='smooth-tab absolute right-2 top-2 rounded-full bg-black/10 p-1
                           backdrop-blur-sm transition hover:bg-black/20'
                disabled={loading}
                onClick={removeImage}
              >
                <MdClose className='text-2xl text-white' />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Collapse>
      <input
        hidden
        accept='image/*'
        id='image'
        type='file'
        onChange={onImageUpload}
      />
      <Button
        className='custom-button block w-full cursor-pointer rounded-medium bg-primary-blue-300
                   px-4 py-2 text-center text-white transition hover:brightness-90 
                   disabled:pointer-events-none'
        disabled={loading}
      >
        <label className='cursor-pointer' htmlFor='image'>
          Upload Gambar
        </label>
      </Button>
    </div>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, scale: 0.5 },
  transition: { type: 'spring', duration: 0.5 }
};
