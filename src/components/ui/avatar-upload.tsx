import { MdCameraAlt } from 'react-icons/md';
import { preventBubbling } from '@/lib/helper';
import { useAuth } from '@/lib/context/auth-context';
import { ImagePreview } from '@/components/modal/image-preview';
import { Button } from '@/components/ui/button';
import type { ChangeEvent, ClipboardEvent } from 'react';

type AvatarUploadProps = {
  loading: boolean;
  selectedImage: string | undefined;
  onImageUpload: (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ) => void;
};

export function AvatarUpload({
  loading,
  selectedImage,
  onImageUpload
}: AvatarUploadProps): JSX.Element {
  const { user } = useAuth();

  return (
    <>
      <input
        hidden
        id='image'
        type='file'
        accept='image/*'
        onChange={onImageUpload}
      />
      <ImagePreview
        wrapperClassName='relative h-40 w-40 mx-auto rounded-full'
        className='h-40 w-40 !rounded-full object-cover shadow-low hover:shadow-high'
        width={160}
        height={160}
        src={selectedImage ?? '/assets/user.png'}
        alt={user?.name as string}
      >
        <Button
          className='bg-black-25 group absolute left-1/2 top-1/2 -translate-x-1/2
                       -translate-y-1/2 overflow-hidden rounded-full bg-black/25 
                       hover:bg-black/50 focus-visible:bg-black/50'
          onClick={preventBubbling()}
          disabled={loading}
        >
          <label
            className='block cursor-pointer p-2 group-disabled:pointer-events-none'
            htmlFor='image'
          >
            <MdCameraAlt className='text-3xl' />
          </label>
        </Button>
      </ImagePreview>
    </>
  );
}
